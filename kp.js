/*
 * kp.js - Knuth-Plass paragraph typesetter for DOM paragraphs.
 *
 * - Real total-fit line breaking (boxes / glue / penalties, demerits, fitness classes).
 * - Widths measured from live DOM with Range, so fonts, kerning, ligatures, <i>/<b> all count.
 * - Each line rendered as block span; spaces stretched/shrunk with word-spacing, then
 *   corrected after render so right edge sits flush.
 * - Drop cap handled explicitly: absolutely positioned, first N lines indented,
 *   first line uppercase widths measured so breaking sees the real width.
 * - Hyphenation: soft hyphens (&shy;) honoured. Plug a real hyphenator with
 *   KPTypeset.config.hyphenate = word => ['syl','la','bles'].
 */
(function (global) {
  'use strict';

  const CFG = {
    selector: '.content p',
    linePenalty: 10,
    hyphenPenalty: 50,
    dashPenalty: 10,
    doubleHyphenDemerits: 3000,
    fitnessDemerits: 10000,
    orphanPenalty: 300,          // discourage one-word last line
    spaceStretch: 1 / 2,         // of natural space
    spaceShrink: 1 / 3,
    tolerances: [1, 1.5, 2.5, 4, Infinity],  // max adjustment ratio per pass
    minLeft: 2,
    minRight: 3,
    hyphenate: null              // optional fn(word) -> array of syllables
  };

  const INF_STRETCH = 1e6;
  const SHY = '\u00AD';

  /* ------------------------------------------------------------------ *
   * Knuth-Plass core. Pure function, no DOM.
   *
   * items: {t:'b', w, wu}            box (wu = width when uppercase)
   *        {t:'g', w, y, z, nb?}     glue (stretch y, shrink z, nb = never break)
   *        {t:'p', w, pen, fl?}      penalty (w = width added if break taken)
   * lineWidth(i): available width of line i (0-based)
   * Returns [{pos, r}] break item indices, or null.
   * ------------------------------------------------------------------ */
  function breakLines(items, lineWidth, upperFirst) {
    const n = items.length;
    const W = new Float64Array(n + 1);
    const WU = new Float64Array(n + 1);
    const Y = new Float64Array(n + 1);
    const Z = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
      const it = items[i];
      W[i + 1] = W[i]; WU[i + 1] = WU[i]; Y[i + 1] = Y[i]; Z[i + 1] = Z[i];
      if (it.t === 'b') {
        W[i + 1] += it.w;
        WU[i + 1] += (it.wu != null ? it.wu : it.w);
      } else if (it.t === 'g') {
        W[i + 1] += it.w; WU[i + 1] += it.w;
        Y[i + 1] += it.y; Z[i + 1] += it.z;
      }
    }

    function run(tol, desperate) {
      let active = [{ pos: -1, line: 0, dem: 0, fit: 1, fl: false, prev: null, r: 0 }];

      for (let i = 0; i < n; i++) {
        const it = items[i];
        let pen = 0, extra = 0, fl = false;
        if (it.t === 'g') {
          if (it.nb || i === 0 || items[i - 1].t !== 'b') continue;
        } else if (it.t === 'p') {
          if (it.pen === Infinity) continue;
          pen = it.pen; extra = it.w; fl = !!it.fl;
        } else {
          continue;
        }
        const forced = pen === -Infinity;

        const best = [null, null, null, null];
        const keep = [];
        let overfull = null;

        for (let k = 0; k < active.length; k++) {
          const a = active[k];
          let s = a.pos + 1;
          while (s < i && items[s].t === 'g') s++;           // drop glue after a break

          const cw = (upperFirst && a.pos === -1) ? WU : W;
          const width = cw[i] - cw[s] + extra;
          const stretch = Y[i] - Y[s];
          const shrink = Z[i] - Z[s];
          const avail = lineWidth(a.line);

          let r;
          if (width < avail) r = stretch > 0 ? (avail - width) / stretch : Infinity;
          else if (width > avail) r = shrink > 0 ? (avail - width) / shrink : -Infinity;
          else r = 0;

          if (r < -1) {                                       // too full: deactivate
            if (!overfull || r > overfull.r) overfull = { a: a, r: r };
            continue;
          }
          if (!forced) keep.push(a);
          if (r > tol) continue;                              // too loose for this pass

          const bad = 100 * Math.pow(Math.min(Math.abs(r), 50), 3);
          let d = CFG.linePenalty + bad;
          d *= d;
          if (pen > 0) d += pen * pen;
          else if (pen > -Infinity) d -= pen * pen;
          if (fl && a.fl) d += CFG.doubleHyphenDemerits;
          const fit = r < -0.5 ? 0 : r <= 0.5 ? 1 : r <= 1 ? 2 : 3;
          if (Math.abs(fit - a.fit) > 1) d += CFG.fitnessDemerits;
          d += a.dem;
          if (!best[fit] || d < best[fit].d) best[fit] = { d: d, a: a, r: r };
        }

        const fresh = [];
        for (let f = 0; f < 4; f++) {
          if (best[f]) {
            fresh.push({ pos: i, line: best[f].a.line + 1, dem: best[f].d, fit: f, fl: fl, prev: best[f].a, r: best[f].r });
          }
        }
        // last resort: unbreakable overlong word. Accept overfull line.
        if (!fresh.length && !keep.length && desperate && overfull) {
          fresh.push({ pos: i, line: overfull.a.line + 1, dem: overfull.a.dem + 1e12, fit: 0, fl: fl, prev: overfull.a, r: -1 });
        }

        active = forced ? fresh : keep.concat(fresh);
        if (!active.length) return null;
      }

      let bestNode = null;
      for (const a of active) {
        if (a.pos === n - 1 && (!bestNode || a.dem < bestNode.dem)) bestNode = a;
      }
      if (!bestNode) return null;

      const out = [];
      for (let a = bestNode; a && a.pos >= 0; a = a.prev) out.push({ pos: a.pos, r: a.r });
      return out.reverse();
    }

    const t = CFG.tolerances;
    for (let p = 0; p < t.length; p++) {
      const res = run(t[p], p === t.length - 1);
      if (res) return res;
    }
    return null;
  }

  /* ------------------------------------------------------------------ *
   * DOM side
   * ------------------------------------------------------------------ */
  const originals = new WeakMap();
  const rng = document.createRange();

  function measure(node, s, e) {
    rng.setStart(node, s);
    rng.setEnd(node, e);
    return rng.getBoundingClientRect().width;
  }

  function probe(el, text) {
    const s = document.createElement('span');
    s.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
    s.textContent = text;
    el.appendChild(s);
    const w = s.getBoundingClientRect().width;
    el.removeChild(s);
    return w;
  }

  // Flatten paragraph into text segments + <br> markers, each with its ancestor element path.
  function collect(node, path, out) {
    for (const ch of node.childNodes) {
      if (ch.nodeType === 3) {
        out.push({ node: ch, path: path });
      } else if (ch.nodeType === 1) {
        if (ch.classList.contains('tl-dropcap')) continue;
        if (ch.tagName === 'BR') out.push({ br: true, path: path });
        else collect(ch, path.concat(ch), out);
      }
    }
  }

  function breakpointsFor(word) {
    const bps = [];
    const hasShy = word.indexOf(SHY) >= 0;
    for (let k = 0; k < word.length; k++) {
      const ch = word[k];
      if (ch === SHY) {
        bps.push({ end: k, next: k + 1, kind: 'hyph' });
      } else if ((ch === '-' || ch === '\u2013' || ch === '\u2014') && k > 0 && k < word.length - 1) {
        bps.push({ end: k + 1, next: k + 1, kind: 'dash' });
      }
    }
    if (!hasShy && !bps.length && typeof CFG.hyphenate === 'function') {
      const m = /^([^\p{L}]*)(\p{L}+)([^\p{L}]*)$/u.exec(word);
      if (m && m[2].length >= CFG.minLeft + CFG.minRight) {
        const syl = CFG.hyphenate(m[2]);
        if (Array.isArray(syl) && syl.join('') === m[2]) {
          let off = m[1].length, left = 0;
          for (let k = 0; k < syl.length - 1; k++) {
            off += syl[k].length;
            left += syl[k].length;
            if (left >= CFG.minLeft && m[2].length - left >= CFG.minRight) {
              bps.push({ end: off, next: off, kind: 'hyph' });
            }
          }
        }
      }
    }
    return bps;
  }

  function buildItems(segs) {
    const items = [];
    const spaceCache = new Map();
    const hyphCache = new Map();
    const spaceW = el => {
      if (!spaceCache.has(el)) spaceCache.set(el, probe(el, 'a a') - probe(el, 'aa'));
      return spaceCache.get(el);
    };
    const hyphW = el => {
      if (!hyphCache.has(el)) hyphCache.set(el, probe(el, '-'));
      return hyphCache.get(el);
    };
    const last = () => items[items.length - 1];
    const isLinebreakEnd = it => it && it.t === 'p' && it.pen === -Infinity;

    for (const seg of segs) {
      if (seg.br) {
        if (!items.length || isLinebreakEnd(last())) continue;
        if (last().t === 'g') items.pop();
        items.push({ t: 'g', w: 0, y: INF_STRETCH, z: 0, nb: true, v: true });
        items.push({ t: 'p', w: 0, pen: -Infinity });
        continue;
      }

      const data = seg.node.data;
      const el = seg.node.parentElement;
      const re = /([ \t\n\r\f]+)|([^ \t\n\r\f]+)/g;
      let m;
      while ((m = re.exec(data))) {
        if (m[1]) {
          const l = last();
          if (!l || l.t === 'g' || isLinebreakEnd(l)) continue;
          const w = spaceW(el);
          items.push({ t: 'g', w: w, y: w * CFG.spaceStretch, z: w * CFG.spaceShrink, path: seg.path });
          continue;
        }

        const word = m[2], base = m.index;
        const bps = breakpointsFor(word);
        const pieces = [];
        let start = 0;
        for (const bp of bps) {
          if (bp.end > start) pieces.push({ s: start, e: bp.end, kind: bp.kind });
          else if (pieces.length) pieces[pieces.length - 1].kind = pieces[pieces.length - 1].kind || bp.kind;
          start = bp.next;
        }
        if (start < word.length) pieces.push({ s: start, e: word.length, kind: null });
        else if (pieces.length) pieces[pieces.length - 1].kind = null;
        if (!pieces.length) continue;

        pieces.forEach((pc, idx) => {
          items.push({ t: 'b', w: 0, wu: 0, node: seg.node, s: base + pc.s, e: base + pc.e, path: seg.path });
          if (idx < pieces.length - 1) {
            if (pc.kind === 'hyph') {
              items.push({ t: 'p', w: hyphW(el), pen: CFG.hyphenPenalty, fl: true, hyphen: true, path: seg.path });
            } else {
              items.push({ t: 'p', w: 0, pen: CFG.dashPenalty, fl: false, path: seg.path });
            }
          }
        });
      }
    }

    while (items.length && items[items.length - 1].t === 'g') items.pop();
    if (!items.some(i => i.t === 'b')) return null;

    // Discourage a lonely last word.
    let glues = 0, lastGlue = -1;
    items.forEach((it, i) => { if (it.t === 'g' && !it.v) { glues++; lastGlue = i; } });
    if (glues >= 2 && !isLinebreakEnd(items[lastGlue - 1])) {
      items.splice(lastGlue, 0, { t: 'p', w: 0, pen: CFG.orphanPenalty });
    }

    items.push({ t: 'g', w: 0, y: INF_STRETCH, z: 0, nb: true, v: true });
    items.push({ t: 'p', w: 0, pen: -Infinity });
    return items;
  }

  function buildLine(items, s, b, hyphen) {
    const line = document.createElement('span');
    line.className = 'tl-line';
    let stack = [];
    let cur = line;

    function enter(path) {
      let k = 0;
      while (k < stack.length && k < path.length && stack[k].orig === path[k]) k++;
      stack.length = k;
      cur = k ? stack[k - 1].clone : line;
      for (; k < path.length; k++) {
        const c = path[k].cloneNode(false);
        c.removeAttribute('id');
        cur.appendChild(c);
        stack.push({ orig: path[k], clone: c });
        cur = c;
      }
    }
    function text(t, path) {
      enter(path);
      const lc = cur.lastChild;
      if (lc && lc.nodeType === 3) lc.data += t;
      else cur.appendChild(document.createTextNode(t));
    }

    let lastPath = [];
    for (let i = s; i < b; i++) {
      const it = items[i];
      if (it.t === 'b') {
        text(it.node.data.slice(it.s, it.e), it.path);
        lastPath = it.path;
      } else if (it.t === 'g' && !it.v) {
        text(' ', it.path);
      }
    }
    if (hyphen) text('-', hyphen.path || lastPath);
    return line;
  }

  function typesetParagraph(p) {
    // Restore pristine HTML if we typeset this one before, else remember current HTML.
    if (originals.has(p) && p.querySelector(':scope > .tl-line, :scope > .tl-dropcap')) {
      p.innerHTML = originals.get(p);
    } else {
      originals.set(p, p.innerHTML);
    }
    p.classList.remove('tl-done');
    p.style.minHeight = '';

    if (!p.textContent.trim()) return;
    if (p.querySelector('img,svg,canvas,video,iframe,input,select,textarea,table')) return;

    const cs = getComputedStyle(p);
    if (cs.textAlign !== 'justify') return;                    // only justified paragraphs

    const avail0 = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (!(avail0 > 0)) return;
    let lineH = parseFloat(cs.lineHeight);
    if (!(lineH > 0)) lineH = parseFloat(cs.fontSize) * 1.2;

    const saved = {
      ws: p.style.whiteSpace, ta: p.style.textAlign,
      wsp: p.style.wordSpacing, tt: p.style.textTransform
    };
    const bail = () => {
      p.innerHTML = originals.get(p);
      p.classList.remove('tl-done');
      p.style.minHeight = '';
    };

    p.classList.add('tl-done');                                // switches off ::first-letter fallback

    // ---- drop cap: pull first letter out into its own absolutely positioned span
    let cap = null, capW = 0, dropLines = 0;
    if (p.classList.contains('dropcap')) {
      const tw = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      let tn;
      while ((tn = tw.nextNode()) && !tn.data.trim());
      const m = tn && /^\s*([“"‘'(\[]*[\p{L}\p{N}])/u.exec(tn.data);
      if (m) {
        tn.data = tn.data.slice(m[0].length);
        cap = document.createElement('span');
        cap.className = 'tl-dropcap';
        cap.textContent = m[1];
        p.insertBefore(cap, p.firstChild);
        const r = cap.getBoundingClientRect();
        const cc = getComputedStyle(cap);
        capW = r.width + (parseFloat(cc.marginLeft) || 0) + (parseFloat(cc.marginRight) || 0);
        const capH = r.height + (parseFloat(cc.marginTop) || 0) + (parseFloat(cc.marginBottom) || 0);
        dropLines = 3;//Math.max(2, Math.ceil(capH / lineH - 0.15));
        // optional manual override in CSS: .tl-dropcap { --drop-lines: 3; }
        const ov = parseInt(cc.getPropertyValue('--drop-lines'), 10);
        if (ov > 0) dropLines = ov;
      }
    }

    let items, res;
    try {
      p.style.whiteSpace = 'nowrap';
      p.style.textAlign = 'left';
      p.style.wordSpacing = '0';

      const segs = [];
      collect(p, [], segs);
      items = buildItems(segs);
      if (!items) { p.style.whiteSpace = saved.ws; p.style.textAlign = saved.ta; p.style.wordSpacing = saved.wsp; return bail(); }

      for (const it of items) if (it.t === 'b') it.w = it.wu = measure(it.node, it.s, it.e);
      if (cap) {
        p.style.textTransform = 'uppercase';                   // first line is uppercase
        for (const it of items) if (it.t === 'b') it.wu = measure(it.node, it.s, it.e);
      }
    } finally {
      p.style.whiteSpace = saved.ws;
      p.style.textAlign = saved.ta;
      p.style.wordSpacing = saved.wsp;
      p.style.textTransform = saved.tt;
    }

    const lineWidth = i => avail0 - (i < dropLines ? capW : 0);
    res = breakLines(items, lineWidth, !!cap);
    if (!res) return bail();

    // ---- render lines
    while (p.lastChild) p.removeChild(p.lastChild);
    if (cap) p.appendChild(cap);

    const lines = [];
    let s = 0;
    res.forEach((br, idx) => {
      while (s < br.pos && items[s].t === 'g') s++;
      const brk = items[br.pos];
      const hyph = brk.t === 'p' && brk.hyphen ? brk : null;
      const forced = brk.t === 'p' && brk.pen === -Infinity;

      let natural = hyph ? hyph.w : 0, count = 0, shrinkSum = 0;
      for (let i = s; i < br.pos; i++) {
        const it = items[i];
        if (it.t === 'b') natural += (idx === 0 && cap) ? it.wu : it.w;
        else if (it.t === 'g' && !it.v) { natural += it.w; count++; shrinkSum += it.z; }
      }

      const el = buildLine(items, s, br.pos, hyph);
      if (idx === 0 && cap) el.classList.add('tl-upper');
      if (idx < dropLines && capW) el.style.marginLeft = capW + 'px';

      const avail = lineWidth(idx);
      let ws = 0;
      if (count) {
        const extra = avail - natural;
        ws = (forced && extra > 0) ? 0 : extra / count;
        ws = Math.max(ws, -shrinkSum / count);
        el.style.wordSpacing = ws + 'px';
      }
      lines.push({ el: el, count: count, forced: forced, ws: ws, shrinkSum: shrinkSum, avail: avail });
      p.appendChild(el);
      s = br.pos + 1;
    });

    // ---- correction pass: measure what browser really drew, nudge spacing so edges are flush
    const actual = lines.map(L => {
      rng.selectNodeContents(L.el);
      return rng.getBoundingClientRect().width;
    });
    lines.forEach((L, i) => {
      if (!L.count) return;
      const diff = L.avail - actual[i];
      if (L.forced && diff > 0) return;
      if (Math.abs(diff) < 0.01) return;
      const ws = Math.max(L.ws + diff / L.count, -L.shrinkSum / L.count);
      L.el.style.wordSpacing = ws + 'px';
    });

    if (cap) p.style.minHeight = (dropLines * lineH) + 'px';
  }

  function typesetAll(root) {
    (root || document).querySelectorAll(CFG.selector).forEach(p => {
      try {
        typesetParagraph(p);
      } catch (err) {
        console.error('typeset failed for paragraph', err);
        if (originals.has(p)) { p.innerHTML = originals.get(p); p.classList.remove('tl-done'); }
      }
    });
  }

  // Re-typeset when container width changes (window resize, scrollbar appears).
  let watching = false;
  function watch(containerSelector) {
    if (watching) return;
    const box = document.querySelector(containerSelector);
    if (!box || !global.ResizeObserver) return;
    watching = true;
    let lastW = box.clientWidth, queued = false;
    new ResizeObserver(() => {
      if (queued || Math.abs(box.clientWidth - lastW) < 0.5) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        lastW = box.clientWidth;
        typesetAll();
        lastW = box.clientWidth;
      });
    }).observe(box);
  }

  const api = { typesetAll: typesetAll, watch: watch, breakLines: breakLines, config: CFG };
  global.KPTypeset = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
