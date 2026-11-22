/*
 * pdf-export.js - paginated PDF export for the typeset .content div.
 *
 * Click #savePdf -> content is split into pages the size of .content (width/height/padding
 * read from its computed CSS, so 2.75in x 4.25in with 0.5in margins today). Pages are built
 * as real DOM, then the browser prints them; choose "Save as PDF". Result is vector text
 * with the fonts embedded, laid out exactly as on screen.
 *
 * Pagination works on the lines kp.js already decided (.tl-line spans), so line breaks are
 * never re-flowed. Orphans/widows are enforced per paragraph. Headings are kept with the
 * text that follows. Drop-cap paragraphs never split inside the cap's lines.
 *
 * Non-kp blocks (headings, images, unjustified paragraphs) are treated as unbreakable.
 */
(function (global) {
  'use strict';

  const CFG = {
    contentSelector: '.content',
    buttonSelector: '#savePdf',
    orphans: 2,          // min lines of a paragraph left at the bottom of a page
    widows: 2,           // min lines of a paragraph carried to the top of the next page
    eps: 0.05,           // px tolerance for float noise
    titleFrom: '#nameOfTheDay'   // text used as the PDF file name (browser default), optional
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

  function collect(parent, path, out, ctx) {
    for (const el of parent.children) {
      if (/^(SCRIPT|STYLE|LINK|TEMPLATE|BR)$/.test(el.tagName)) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none') continue;

      if (el.classList.contains('tl-done')) { push(el, path, true, out, ctx); continue; }

      const kids = Array.from(el.children).filter(c => getComputedStyle(c).display !== 'none');
      const blockKids = kids.some(c => BLOCKISH.has(getComputedStyle(c).display));
      const ownText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.data.trim());
      if (BLOCKISH.has(cs.display) && blockKids && !ownText) {
        collect(el, path.concat(el), out, ctx);   // pure container: descend
      } else {
        push(el, path, false, out, ctx);
      }
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
  async function prepare() {
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
    atoms.forEach((a, i) => { a.gap = i ? Math.max(0, a.top - atoms[i - 1].bottom) : 0; });

    const plan = paginate(atoms, geom.innerH);
    const root = buildDOM(plan, geom);
    document.body.appendChild(root);
    flow.remove();
    return { root: root, plan: plan, geom: geom };
  }

  let busy = false;
  async function exportPDF() {
    if (busy) return;
    busy = true;
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

  document.addEventListener('DOMContentLoaded', () => {
    const b = document.querySelector(CFG.buttonSelector);
    if (b) b.addEventListener('click', exportPDF);
  });

  global.PagedPDF = { exportPDF: exportPDF, prepare: prepare, paginate: paginate, config: CFG };
})(window);
