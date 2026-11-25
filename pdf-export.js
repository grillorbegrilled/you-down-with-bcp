/*
 * pdf-export.js - paginated PDF export for the typeset .content div.
 *
 * Click #savePdf -> content is split into pages the size of .content (width/height/padding
 * read from its computed CSS, 2.75in x 4.25in with 0.5in margins today). The paginated pages
 * are built as real DOM, every word is measured from that DOM, and a PDF is written directly
 * with pdf-lib: exact page size, embedded fonts, selectable text, one-click download.
 * Needs pdf-lib.min.js and fontkit.umd.min.js loaded first (see README lines in the reply).
 *
 * If direct PDF fails, it can fall back to the browser print dialog (CFG.fallbackToPrint).
 * That route honours @page size on desktop browsers but NOT in Firefox for Android.
 *
 * Pagination works on the lines kp.js already decided (.tl-line spans), so line breaks are
 * never re-flowed. Orphans/widows are enforced per paragraph. Headings are kept with the
 * text that follows. Drop-cap paragraphs never split inside the cap's lines.
 *
 * Non-kp blocks (headings, images, unjustified paragraphs) are treated as unbreakable.
 * Drawn: text (font, size, colour, text-transform, kerning-free ligature/feature support
 * via fontkit) and <img>. Not drawn: borders, backgrounds, rules.
 */
(function (global) {
  'use strict';

  const CFG = {
    contentSelector: '.content',
    buttonSelector: '#savePdf',
    breakSelector: '.pb',   // element that forces a new page (e.g. <div class="pb"></div>)
    orphans: 2,          // min lines of a paragraph left at the bottom of a page
    widows: 2,           // min lines of a paragraph carried to the top of the next page
    eps: 0.05,           // px tolerance for float noise
    titleFrom: '#nameOfTheDay',  // text used as the PDF title / file name, optional
    mode: 'pdf',                 // 'pdf' = direct download, 'print' = browser print dialog only
    fontMode: 'full',            // 'full' = embed whole fonts (woff is unwrapped to TTF first),
                                 // 'subset' = let pdf-lib subset them (smaller, but see notes)
    fallbackToPrint: true        // if direct PDF throws, offer the print dialog
  };

  const STYLE_ID = 'pf-style';
  const ROOT_ID = 'pf-root';
  const BLOCKISH = new Set(['block', 'list-item', 'flow-root']);
  const nextFrame = () => new Promise(r => requestAnimationFrame(r));
  const frames = async n => { for (let i = 0; i < n; i++) await nextFrame(); };

  /* ---------------------------------------------------------------- *
   * Measuring
   * ---------------------------------------------------------------- */

  function readGeometry(content) {
    const cs = getComputedStyle(content);
    const r = content.getBoundingClientRect();
    const pad = {
      t: parseFloat(cs.paddingTop) || 0, r: parseFloat(cs.paddingRight) || 0,
      b: parseFloat(cs.paddingBottom) || 0, l: parseFloat(cs.paddingLeft) || 0
    };
    return {
      w: r.width, h: r.height, pad: pad,
      innerW: r.width - pad.l - pad.r,
      innerH: r.height - pad.t - pad.b
    };
  }

  function stripIds(root) {
    const all = [root].concat(Array.from(root.querySelectorAll('[id],[name]')));
    all.forEach(e => { e.removeAttribute('id'); e.removeAttribute('name'); });
  }

  // Off-screen copy of the content at its exact inner width, no scroll, no padding.
  function makeFlow(content, geom) {
    const flow = document.createElement('div');
    flow.className = 'pf-flow';
    flow.style.cssText = 'position:absolute;left:-100000px;top:0;visibility:hidden;' +
      'width:' + geom.innerW + 'px;';
    for (const ch of content.childNodes) {
      const c = ch.cloneNode(true);
      if (c.nodeType === 1) stripIds(c);
      flow.appendChild(c);
    }
    document.body.appendChild(flow);
    return flow;
  }

  // Forced page break requested by an element? -> 'page' | 'left' | 'right' | null
  function breakKind(el, cs, side) {
    if (side === 'before') {
      if (el.classList.contains('page-break-right')) return 'right';
      if (el.classList.contains('page-break-left')) return 'left';
      if (el.classList.contains('page-break')) return 'page';
    }
    const v = ((side === 'before' ? (cs.breakBefore || cs.pageBreakBefore)
                                  : (cs.breakAfter || cs.pageBreakAfter)) || '').trim();
    if (v === 'page' || v === 'always') return 'page';
    if (v === 'left' || v === 'verso') return 'left';
    if (v === 'right' || v === 'recto') return 'right';
    return null;
  }

  function collect(parent, path, out, ctx) {
    for (const el of parent.children) {
      if (/^(SCRIPT|STYLE|LINK|TEMPLATE|BR)$/.test(el.tagName)) continue;
      if (el.matches(CFG.breakSelector)) {          // <div class="pb"></div>: forced page break
        out.push({ marker: true, kind: 'page' });   // (works even if .pb is display:none on screen)
        continue;
      }
      const cs = getComputedStyle(el);
      if (cs.display === 'none') continue;

      const before = breakKind(el, cs, 'before');
      if (before) out.push({ marker: true, kind: before });

      if (el.classList.contains('tl-done')) {
        push(el, path, true, out, ctx);
      } else {
        const kids = Array.from(el.children).filter(c => getComputedStyle(c).display !== 'none');
        const blockKids = kids.some(c => BLOCKISH.has(getComputedStyle(c).display));
        const ownText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.data.trim());
        if (BLOCKISH.has(cs.display) && blockKids && !ownText) {
          collect(el, path.concat(el), out, ctx);   // pure container: descend
        } else {
          push(el, path, false, out, ctx);
        }
      }

      const after = breakKind(el, cs, 'after');
      if (after) out.push({ marker: true, kind: after });
    }
  }

  function push(el, path, typeset, out, ctx) {
    const r = el.getBoundingClientRect();
    const a = {
      el: el, path: path,
      top: r.top - ctx.top, bottom: r.bottom - ctx.top,
      heading: /^H[1-6]$/.test(el.tagName),
      lines: null, dropLines: 0, gap: 0
    };
    if (a.bottom - a.top <= 0 && !el.textContent.trim() && !el.querySelector('img')) return;

    if (typeset) {
      a.lines = Array.from(el.children)
        .filter(c => c.classList.contains('tl-line'))
        .map(c => {
          const lr = c.getBoundingClientRect();
          return { el: c, top: lr.top - ctx.top, bottom: lr.bottom - ctx.top };
        });
      if (!a.lines.length) a.lines = null;
      else {
        // kp.js indents the first N lines by inline margin-left when there is a drop cap
        while (a.dropLines < a.lines.length && a.lines[a.dropLines].el.style.marginLeft) a.dropLines++;
      }
    }
    out.push(a);
  }

  /* ---------------------------------------------------------------- *
   * Pagination (pure: atoms + page height -> plan)
   * ---------------------------------------------------------------- */

  const height = a => a.bottom - a.top;

  // Height of lines [from, to) as laid out in the flow.
  function fragH(a, from, to) {
    const n = a.lines.length;
    const top = from === 0 ? a.top : a.lines[from].top;
    const bot = to === n ? a.bottom : a.lines[to - 1].bottom;
    return bot - top;
  }

  const minFirst = (a, from) => Math.max(CFG.orphans, from === 0 ? a.dropLines : 0);

  // Can the lines [from, n) be split with k = to - from on the first page?
  function validSplit(a, from, to) {
    const n = a.lines.length;
    return to < n && (to - from) >= minFirst(a, from) && (n - to) >= CFG.widows;
  }

  // Smallest piece of atom that may legally start on a page.
  function firstChunk(a) {
    if (!a.lines) return height(a);
    const n = a.lines.length;
    const to = minFirst(a, 0);
    return validSplit(a, 0, to) ? fragH(a, 0, to) : height(a);
  }

  // Heading at index i, page already holds content up to y: does the heading plus the
  // start of whatever follows fit? (chains of headings handled)
  function headingChainFits(atoms, i, y, H) {
    let yy = y;
    for (let j = i; j < atoms.length; j++) {
      const b = atoms[j];
      if (b.marker) return true;               // forced break follows: nothing to keep with
      const start = yy + b.gap;
      if (b.heading) {
        yy = start + height(b);
        if (yy > H + CFG.eps) return false;
        continue;
      }
      return start + firstChunk(b) <= H + CFG.eps;
    }
    return true;
  }

  function paginate(atoms, H) {
    const pages = [];
    let cur = [], y = 0;
    const newPage = () => { pages.push(cur); cur = []; y = 0; };
    const eps = CFG.eps;

    for (let i = 0; i < atoms.length; i++) {
      const a = atoms[i];
      if (a.marker) {
        // consecutive breaks collapse, like CSS: a break on an empty page does nothing,
        // except that left/right breaks may add one blank page to get the parity right
        if (cur.length) newPage();
        const next = pages.length + 1;                     // number of the page we start now
        if ((a.kind === 'right' && next % 2 === 0) || (a.kind === 'left' && next % 2 === 1)) pages.push([]);
        continue;
      }
      const n = a.lines ? a.lines.length : 1;
      let from = 0;

      if (a.heading && cur.length && !headingChainFits(atoms, i, y, H)) newPage();

      for (;;) {
        const gap = (cur.length && from === 0) ? a.gap : 0;
        const start = y + gap;
        const h = a.lines ? fragH(a, from, n) : height(a);
        if (start + h <= H + eps) {                      // fits whole (or whole remainder)
          cur.push({ a: a, from: from, to: n, gap: gap });
          y = start + h;
          break;
        }

        // does not fit: how many lines do?
        let fit = from;
        if (a.lines) {
          const base = from === 0 ? a.top : a.lines[from].top;
          while (fit < n && start + (a.lines[fit].bottom - base) <= H + eps) fit++;

          let to = fit;
          if (n - to < CFG.widows) to = n - CFG.widows;  // pull lines over so widows are met
          if (validSplit(a, from, to)) {
            cur.push({ a: a, from: from, to: to, gap: gap });
            newPage();
            from = to;
            continue;
          }
        }

        if (cur.length) { newPage(); continue; }         // retry on a fresh page

        // fresh page and constraints cannot be met: force something sensible
        if (a.lines && fit > from && fit < n) {
          cur.push({ a: a, from: from, to: fit, gap: 0 });
          newPage();
          from = fit;
          continue;
        }
        console.warn('pdf-export: block taller than a page, clipped', a.el);
        cur.push({ a: a, from: from, to: n, gap: 0 });
        y = H;
        break;
      }
    }
    if (cur.length || !pages.length) pages.push(cur);
    return pages;
  }

  /* ---------------------------------------------------------------- *
   * Building page DOM
   * ---------------------------------------------------------------- */

  function shellOf(el) {
    const c = el.cloneNode(false);
    stripIds(c);
    c.style.marginTop = '0';
    c.style.marginBottom = '0';
    return c;
  }

  function nodeFor(item) {
    const a = item.a;
    let node;
    if (a.lines) {
      const n = a.lines.length;
      node = a.el.cloneNode(false);
      stripIds(node);
      if (item.from === 0) {
        const cap = a.el.querySelector(':scope > .tl-dropcap');
        if (cap) node.appendChild(cap.cloneNode(true));
      }
      if (item.from !== 0 || item.to !== n) node.style.minHeight = '';
      for (let i = item.from; i < item.to; i++) node.appendChild(a.lines[i].el.cloneNode(true));
    } else {
      node = a.el.cloneNode(true);
      stripIds(node);
    }
    node.style.marginTop = item.gap + 'px';
    node.style.marginBottom = '0';
    return node;
  }

  function buildDOM(plan, geom) {
    const root = document.createElement('div');
    root.id = ROOT_ID;
    for (const items of plan) {
      const page = document.createElement('div');
      page.className = 'pf-page';
      page.style.width = geom.w + 'px';
      page.style.height = geom.h + 'px';
      page.style.padding = [geom.pad.t, geom.pad.r, geom.pad.b, geom.pad.l].map(v => v + 'px').join(' ');

      let stack = [];
      const parentFor = path => {
        let k = 0;
        while (k < stack.length && k < path.length && stack[k].orig === path[k]) k++;
        stack.length = k;
        let cur = k ? stack[k - 1].clone : page;
        for (; k < path.length; k++) {
          const c = shellOf(path[k]);
          cur.appendChild(c);
          stack.push({ orig: path[k], clone: c });
          cur = c;
        }
        return cur;
      };

      for (const item of items) parentFor(item.a.path).appendChild(nodeFor(item));
      root.appendChild(page);
    }
    return root;
  }

  /* ---------------------------------------------------------------- *
   * Driver
   * ---------------------------------------------------------------- */

  const inch = px => (Math.round(px / 96 * 10000) / 10000) + 'in';

  function injectStyle(geom) {
    removeStyle();
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
@page { size: ${inch(geom.w)} ${inch(geom.h)}; margin: 0; }
.pf-flow > :first-child { margin-top: 0; }
.pf-flow > :last-child { margin-bottom: 0; }
#${ROOT_ID} { display: none; }
.pf-page { position: relative; overflow: hidden; box-sizing: border-box; background: #fff; color: #000; }
@media print {
  html, body { height: auto !important; overflow: visible !important; margin: 0 !important;
               padding: 0 !important; background: #fff !important; }
  body > *:not(#${ROOT_ID}) { display: none !important; }
  #${ROOT_ID} { display: block !important; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .pf-page { break-after: page; page-break-after: always; break-inside: avoid; }
  .pf-page:last-child { break-after: auto; page-break-after: auto; }
}`;
    document.head.appendChild(s);
  }

  function removeStyle() { const s = document.getElementById(STYLE_ID); if (s) s.remove(); }
  function removeRoot() { const r = document.getElementById(ROOT_ID); if (r) r.remove(); }

  // Build the page DOM (attached to body, hidden on screen). Returns {root, plan, geom}.
  async function prepare(opts) {
    opts = opts || {};
    const content = document.querySelector(CFG.contentSelector);
    if (!content) throw new Error('pdf-export: no ' + CFG.contentSelector);
    await document.fonts.ready;
    removeRoot();

    const geom = readGeometry(content);
    injectStyle(geom);

    // A scrollbar would steal width, and kp.js would re-break lines narrower than the page.
    // Hide it, let kp.js settle, snapshot, restore.
    const prevOverflow = content.style.overflowY;
    content.style.overflowY = 'hidden';
    await frames(3);
    const flow = makeFlow(content, geom);
    content.style.overflowY = prevOverflow;

    await nextFrame();
    const ctx = { top: flow.getBoundingClientRect().top };
    const atoms = [];
    collect(flow, [], atoms, ctx);
    let prev = null;
    atoms.forEach(a => {
      if (a.marker) { prev = null; return; }
      a.gap = prev ? Math.max(0, a.top - prev.bottom) : 0;
      prev = a;
    });

    const plan = paginate(atoms, geom.innerH);
    const root = buildDOM(plan, geom);
    if (opts.measurable) {   // laid out but invisible, so words can be measured
      root.style.cssText = 'display:block;position:absolute;left:-100000px;top:0;' +
        'visibility:hidden;width:' + geom.w + 'px;';
    }
    document.body.appendChild(root);
    flow.remove();
    return { root: root, plan: plan, geom: geom };
  }

  /* ---------------------------------------------------------------- *
   * Direct PDF (pdf-lib + fontkit)
   * ---------------------------------------------------------------- */

  const PX2PT = 0.75;

  const normWeight = w => {
    w = String(w || '').trim().toLowerCase();
    if (w === 'normal' || !w) return 400;
    if (w === 'bold') return 700;
    return parseInt(w, 10) || 400;
  };
  const isItalic = s => /italic|oblique/i.test(s || '');

  async function inflate(u8) {
    const stream = new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  // WOFF 1 -> plain sfnt (TTF/OTF) so pdf-lib can embed the whole font as-is.
  async function woffToSfnt(u8) {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const tag = o => String.fromCharCode(u8[o], u8[o + 1], u8[o + 2], u8[o + 3]);
    if (tag(0) !== 'wOFF') throw new Error('not a WOFF 1 file');
    const flavor = dv.getUint32(4), n = dv.getUint16(12);
    const tables = [];
    for (let i = 0; i < n; i++) {
      const o = 44 + i * 20;
      const off = dv.getUint32(o + 4), comp = dv.getUint32(o + 8), orig = dv.getUint32(o + 12);
      let data = u8.subarray(off, off + comp);
      if (comp < orig) data = await inflate(data);
      if (data.length !== orig) throw new Error('bad table length in ' + tag(o));
      tables.push({ tag: u8.subarray(o, o + 4), sum: dv.getUint32(o + 16), data: data });
    }
    tables.sort((a, b) => (String.fromCharCode(...a.tag) < String.fromCharCode(...b.tag) ? -1 : 1));
    let size = 12 + 16 * n;
    tables.forEach(t => { t.off = size; size += (t.data.length + 3) & ~3; });
    const out = new Uint8Array(size), ov = new DataView(out.buffer);
    ov.setUint32(0, flavor); ov.setUint16(4, n);
    let sr = 1, es = 0;
    while (sr * 2 <= n) { sr *= 2; es++; }
    ov.setUint16(6, sr * 16); ov.setUint16(8, es); ov.setUint16(10, n * 16 - sr * 16);
    tables.forEach((t, i) => {
      const o = 12 + i * 16;
      out.set(t.tag, o); ov.setUint32(o + 4, t.sum);
      ov.setUint32(o + 8, t.off); ov.setUint32(o + 12, t.data.length);
      out.set(t.data, t.off);
    });
    return out;
  }

  // @font-face rules -> [{family, weight, italic, url}]
  function readFontFaces() {
    const faces = [];
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; }
      for (const rule of Array.from(rules)) {
        if (rule.type !== CSSRule.FONT_FACE_RULE) continue;
        const st = rule.style;
        const m = /url\(\s*["']?([^"')]+)["']?\s*\)/.exec(st.getPropertyValue('src'));
        if (!m) continue;
        faces.push({
          family: st.getPropertyValue('font-family').replace(/["']/g, '').trim().toLowerCase(),
          weight: normWeight(st.getPropertyValue('font-weight')),
          italic: isItalic(st.getPropertyValue('font-style')),
          url: new URL(m[1], sheet.href || document.baseURI).href
        });
      }
    }
    return faces;
  }

  // Best-matching face of each family in the CSS font stack, in stack order.
  function candidateFaces(cs, faces) {
    const fams = cs.fontFamily.split(',').map(f => f.trim().replace(/^["']|["']$/g, '').toLowerCase());
    const want = normWeight(cs.fontWeight), italic = isItalic(cs.fontStyle);
    const out = [];
    for (const f of fams) {
      const c = faces.filter(x => x.family === f);
      if (!c.length) continue;
      c.sort((x, y) =>
        ((x.italic !== italic) - (y.italic !== italic)) ||
        (Math.abs(x.weight - want) - Math.abs(y.weight - want)));
      out.push(c[0]);
    }
    return out;
  }

  // OpenType features the browser would apply, as {tag: bool} for fontkit
  function featuresOf(cs) {
    const feat = {};
    const vl = cs.fontVariantLigatures;
    if (vl && vl !== 'normal') {
      if (/\bnone\b/.test(vl)) { feat.liga = feat.clig = feat.dlig = feat.hlig = feat.calt = false; }
      else {
        const set = (re, tags) => {
          if (new RegExp('\\bno-' + re).test(vl)) tags.forEach(t => feat[t] = false);
          else if (new RegExp('\\b' + re).test(vl)) tags.forEach(t => feat[t] = true);
        };
        set('common-ligatures', ['liga', 'clig']);
        set('discretionary-ligatures', ['dlig']);
        set('historical-ligatures', ['hlig']);
        set('contextual', ['calt']);
      }
    }
    const ffs = cs.fontFeatureSettings;
    if (ffs && ffs !== 'normal') {
      for (const m of ffs.matchAll(/["'](\w{4})["']\s*(on|off|\d+)?/g)) {
        feat[m[1]] = !(m[2] === 'off' || m[2] === '0');
      }
    }
    return feat;
  }

  function parseColor(c) {
    const m = /rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/.exec(c);
    return m ? [m[1] / 255, m[2] / 255, m[3] / 255] : [0, 0, 0];
  }

  // pdf-lib writes a width table only for glyphs reachable through the font's cmap (i.e. that
  // have a Unicode value). Ligatures and other glyphs substituted by GSUB features (ch, Th,
  // st, oldstyle figures ...) are missing from it, so viewers advance by a default 1 em after
  // them. Record the glyphs we really lay out and add them to the width table, and to
  // ToUnicode so copy/paste of ligatures still gives the original letters.
  function patchFullEmbed(font) {
    const emb = font && font.embedder;
    if (!emb || emb.subset || !emb.font || !emb.glyphCache ||
        typeof emb.computeWidths !== 'function' || typeof emb.embedUnicodeCmap !== 'function') return font;
    const baseCache = emb.glyphCache;
    const seen = new Map();
    const encode = emb.encodeText.bind(emb);
    emb.encodeText = function (text) {
      for (const g of emb.font.layout(text, emb.fontFeatures).glyphs) if (!seen.has(g.id)) seen.set(g.id, g);
      return encode(text);
    };
    const merged = needCodePoints => {
      const m = new Map();
      baseCache.access().forEach(g => m.set(g.id, g));
      seen.forEach((g, id) => {
        if (!m.has(id) && (!needCodePoints || (g.codePoints && g.codePoints.length))) m.set(id, g);
      });
      return Array.from(m.values()).sort((a, b) => a.id - b.id);
    };
    const wrap = (name, needCodePoints) => {
      const orig = emb[name].bind(emb);
      emb[name] = function (...args) {
        emb.glyphCache = { access: () => merged(needCodePoints) };
        try { return orig(...args); } finally { emb.glyphCache = baseCache; }
      };
    };
    wrap('computeWidths', false);
    wrap('embedUnicodeCmap', true);
    return font;
  }

  async function renderPDF(root, geom) {
    const L = global.PDFLib;
    if (!L) throw new Error('pdf-lib.min.js is not loaded');
    if (!global.fontkit) throw new Error('fontkit.umd.min.js is not loaded');

    const pdf = await L.PDFDocument.create();
    pdf.registerFontkit(global.fontkit);
    const faces = readFontFaces();
    const fontCache = new Map();      // key -> Promise<PDFFont>
    const bytesCache = new Map();     // url -> Promise<Uint8Array>
    const warned = new Set();
    const warnOnce = msg => { if (!warned.has(msg)) { warned.add(msg); console.warn('pdf-export: ' + msg); } };

    const stdFont = cs => {
      const b = normWeight(cs.fontWeight) >= 600, i = isItalic(cs.fontStyle);
      const F = L.StandardFonts;
      return pdf.embedFont(b ? (i ? F.TimesRomanBoldItalic : F.TimesRomanBold)
                             : (i ? F.TimesRomanItalic : F.TimesRoman));
    };

    const stdSet = new WeakSet();

    // Raw font bytes + whether they can be embedded whole.
    function loadBytes(face) {
      if (!bytesCache.has(face.url)) {
        bytesCache.set(face.url, (async () => {
          const r = await fetch(face.url);
          if (!r.ok) throw new Error('HTTP ' + r.status);
          let bytes = new Uint8Array(await r.arrayBuffer());
          const sig = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
          let full = false;
          if (CFG.fontMode === 'full') {
            if (sig === 'wOFF' && typeof DecompressionStream === 'function') {
              try { bytes = await woffToSfnt(bytes); full = true; }
              catch (e) { warnOnce('woff unwrap failed for ' + face.url + ': ' + e.message); }
            } else if (sig === 'OTTO' || sig === 'true' || sig === '\0\x01\0\0') {
              full = true;                      // already a plain sfnt
            }                                   // wOF2 (and anything else): pdf-lib subsets
          }
          return { bytes: bytes, full: full };
        })());
      }
      return bytesCache.get(face.url);
    }

    async function embedFace(face, feat) {
      try {
        const f = await loadBytes(face);
        try { return patchFullEmbed(await pdf.embedFont(f.bytes, { subset: !f.full, features: feat })); }
        catch (e) {
          warnOnce('embed (subset=' + !f.full + ') failed for ' + face.url + ': ' + e.message);
          return patchFullEmbed(await pdf.embedFont(f.bytes, { subset: f.full, features: feat }));
        }
      } catch (e) {
        warnOnce('could not embed ' + face.url + ' (' + e.message + ')');
        return null;
      }
    }

    // Same order the browser tries: each family in the stack, then a standard font.
    async function fontFor(cs) {
      const feat = featuresOf(cs);
      for (const face of candidateFaces(cs, faces)) {
        const key = face.url + '|' + JSON.stringify(feat);
        if (!fontCache.has(key)) fontCache.set(key, embedFace(face, feat));
        const f = await fontCache.get(key);
        if (f) return f;
      }
      warnOnce('no usable @font-face for "' + cs.fontFamily + '", using Times');
      const k = 'std|' + (normWeight(cs.fontWeight) >= 600) + '|' + isItalic(cs.fontStyle);
      if (!fontCache.has(k)) fontCache.set(k, stdFont(cs).then(f => { stdSet.add(f); return f; }));
      return fontCache.get(k);
    }

    const csCache = new Map();
    const styleOf = el => { if (!csCache.has(el)) csCache.set(el, getComputedStyle(el)); return csCache.get(el); };
    const setCache = new Map();
    const rng = document.createRange();

    // Pieces of a word, one per visual line (normally just one).
    function pieces(tn, s, e) {
      rng.setStart(tn, s); rng.setEnd(tn, e);
      const rects = rng.getClientRects();
      if (rects.length <= 1) {
        const r = rects[0] || rng.getBoundingClientRect();
        return [{ s: s, e: e, left: r.left, top: r.top, w: r.width, h: r.height }];
      }
      const out = [];
      for (let k = s; k < e; k++) {          // wrapped word: group characters by line
        rng.setStart(tn, k); rng.setEnd(tn, k + 1);
        const r = rng.getBoundingClientRect();
        const last = out[out.length - 1];
        if (last && Math.abs(last.top - r.top) < 1) last.e = k + 1;
        else out.push({ s: k, e: k + 1, left: r.left, top: r.top, w: r.width, h: r.height });
      }
      return out;
    }

    // baseline distance below the top of a text rect, measured with a zero-size probe
    function baselineOffset(tn, rectTop) {
      const p = document.createElement('span');
      p.style.cssText = 'display:inline-block;width:0;height:0;margin:0;padding:0;border:0;';
      tn.parentNode.insertBefore(p, tn);
      const b = p.getBoundingClientRect().bottom;
      p.remove();
      return b - rectTop;
    }

    const wpt = geom.w * PX2PT, hpt = geom.h * PX2PT;

    for (const pageEl of Array.from(root.querySelectorAll('.pf-page'))) {
      const page = pdf.addPage([wpt, hpt]);
      const pr = pageEl.getBoundingClientRect();

      // ---- text
      const tw = document.createTreeWalker(pageEl, NodeFilter.SHOW_TEXT);
      const nodes = [];
      for (let n; (n = tw.nextNode());) if (n.data.trim() && n.parentElement) nodes.push(n);

      for (const tn of nodes) {
        const cs = styleOf(tn.parentElement);
        if (cs.visibility === 'hidden' && !tn.parentElement.closest('#' + ROOT_ID)) continue;
        const font = await fontFor(cs);
        const size = parseFloat(cs.fontSize) * PX2PT;
        const [cr, cg, cb] = parseColor(cs.color);
        const color = L.rgb(cr, cg, cb);
        const tt = cs.textTransform;
        // standard fonts throw on characters outside WinAnsi; custom fonts just draw .notdef
        const chars = stdSet.has(font) ? (setCache.get(font) || setCache.set(font, new Set(font.getCharacterSet())).get(font)) : null;

        let off = null;
        const re = /\S+/g;
        let m;
        while ((m = re.exec(tn.data))) {
          for (const pc of pieces(tn, m.index, m.index + m[0].length)) {
            if (!(pc.w > 0 || pc.h > 0)) continue;
            if (off === null) off = baselineOffset(tn, pc.top);
            let text = tn.data.slice(pc.s, pc.e).replace(/\u00AD/g, '');
            if (tt === 'uppercase') text = text.toUpperCase();
            else if (tt === 'lowercase') text = text.toLowerCase();
            if (chars) text = Array.from(text).map(c => chars.has(c.codePointAt(0)) ? c : '?').join('');
            if (!text) continue;
            page.drawText(text, {
              x: (pc.left - pr.left) * PX2PT,
              y: hpt - (pc.top + off - pr.top) * PX2PT,
              size: size, font: font, color: color
            });
          }
        }
      }

      // ---- images
      for (const img of Array.from(pageEl.querySelectorAll('img'))) {
        if (!img.getAttribute('src') || !img.naturalWidth) continue;
        try {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth; c.height = img.naturalHeight;
          c.getContext('2d').drawImage(img, 0, 0);
          const blob = await new Promise(r => c.toBlob(r, 'image/png'));
          const emb = await pdf.embedPng(await blob.arrayBuffer());
          const r = img.getBoundingClientRect();
          page.drawImage(emb, {
            x: (r.left - pr.left) * PX2PT, y: hpt - (r.bottom - pr.top) * PX2PT,
            width: r.width * PX2PT, height: r.height * PX2PT
          });
        } catch (e) { warnOnce('image skipped: ' + e.message); }
      }
    }
    return pdf;
  }

  function fileName() {
    const t = CFG.titleFrom && document.querySelector(CFG.titleFrom);
    const base = (t && t.textContent.trim()) || document.title || 'document';
    return base.replace(/[\\/:*?"<>|]+/g, '-').trim() + '.pdf';
  }

  function download(bytes, name) {
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  /* ---------------------------------------------------------------- *
   * Drivers
   * ---------------------------------------------------------------- */

  let busy = false;

  async function printRoute() {
    const oldTitle = document.title;
    try {
      await prepare();
      const t = CFG.titleFrom && document.querySelector(CFG.titleFrom);
      if (t && t.textContent.trim()) document.title = t.textContent.trim();
      const cleanup = () => { removeRoot(); removeStyle(); document.title = oldTitle; busy = false; };
      window.addEventListener('afterprint', cleanup, { once: true });
      window.print();
    } catch (err) {
      console.error(err);
      removeRoot(); removeStyle(); document.title = oldTitle; busy = false;
    }
  }

  async function exportPDF() {
    if (busy) return;
    busy = true;
    if (CFG.mode === 'print') return printRoute();
    try {
      const r = await prepare({ measurable: true });
      const pdf = await renderPDF(r.root, r.geom);
      pdf.setTitle(fileName().replace(/\.pdf$/, ''));
      download(await pdf.save(), fileName());
      removeRoot(); removeStyle(); busy = false;
    } catch (err) {
      console.error('pdf-export:', err);
      removeRoot(); removeStyle();
      if (CFG.fallbackToPrint &&
          confirm('Direct PDF failed: ' + err.message + '\n\nOpen the print dialog instead? ' +
                  '(Some browsers ignore the page size there.)')) {
        return printRoute();
      }
      busy = false;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const b = document.querySelector(CFG.buttonSelector);
    if (b) b.addEventListener('click', exportPDF);
  });

  global.PagedPDF = { exportPDF: exportPDF, prepare: prepare, renderPDF: renderPDF, woffToSfnt: woffToSfnt, patchFullEmbed: patchFullEmbed, paginate: paginate, config: CFG };
})(window);
