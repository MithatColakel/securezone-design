// Design review viewer: shows Claude Design canvases (canvas.json + *.dc.html) as pan / zoom canvases, one per
// canvas page (Screens and Paywalls; iPhone, iPad, Mac), opens each frame at full size, and keeps review comments
// (pins) in this browser until they are copied.
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const CARET = '<svg class="car" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>';
  const LEVELS = ['micro', 'thumb', 'full'];
  const MIN_Z = 0.01, MAX_Z = 4, FULL_KEEP = 36;

  const stage = $('#stage'), frame = $('#f-frame'), iframe = $('#f-iframe');
  let world = null;
  const st = { page: null, z: 0.1, tx: 0, ty: 0, sel: null, commenting: false, focus: null, fscale: 'fit', fs: 1 };
  const KEY = 'szdr:' + location.pathname + ':comments:v1';
  const isCanvas = () => !!st.page && st.page !== 'ds';
  const pageLabel = id => { const p = D.pageById.get(id); return p ? `${p.canvasName} · ${p.name}` : id; };
  let D, comments = loadComments(), pop = null;

  function loadComments() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
  function saveComments() { try { localStorage.setItem(KEY, JSON.stringify(comments)); } catch { toast('This browser does not keep comments. Copy them before you leave.'); } }

  fetch('viewer/data.json').then(r => r.json()).then(init).catch(err => {
    document.body.insertAdjacentHTML('beforeend', `<p style="position:fixed;top:60px;left:20px">Could not load the canvas: ${esc(err)}</p>`);
  });

  // ---------- setup ----------
  function init(data) {
    D = data;
    D.pageById = new Map(D.pages.map(p => [p.id, p]));
    D.allBoards = D.pages.flatMap(p => p.boards.map(b => Object.assign(b, { page: p.id })));
    D.byId = new Map(D.allBoards.map(b => [b.id, b]));
    D.boards = []; D.sections = [];
    D.cards = D.ds.groups.flatMap(g => g.cards.map(c => Object.assign(c, { key: 'ds:' + c.id })));
    D.cardById = new Map(D.cards.map(c => [c.id, c]));
    $('#src-commit').textContent = D.source.commit;
    $('#src-branch').textContent = D.source.branch;
    document.title = D.title + ' · design review';
    if (sessionStorage.getItem('szdr:banner') === 'off') $('#banner').hidden = true;
    buildNav(); for (const p of D.pages) buildWorld(p); buildDs(); bind();
    setPage(D.pages[0].id, false);
    renderComments(); renderPins();
    if (!route()) home();
    render();
  }

  function buildNav() {
    // One tab per canvas page, grouped by canvas (Screens, Paywalls), then the Design System page.
    const nav = $('#pages'); nav.textContent = '';
    const byCanvas = new Map();
    for (const p of D.pages) { if (!byCanvas.has(p.canvas)) byCanvas.set(p.canvas, []); byCanvas.get(p.canvas).push(p); }
    for (const list of byCanvas.values()) {
      const g = el('div', 'pgrp');
      g.append(el('span', 'pgl', list[0].canvasName));
      for (const p of list) {
        const b = el('button', null, p.name); b.dataset.page = p.id; b.setAttribute('role', 'tab'); b.title = pageLabel(p.id);
        g.append(b);
      }
      nav.append(g);
    }
    const dg = el('div', 'pgrp'), ds = el('button', null, 'Design system'); ds.dataset.page = 'ds'; ds.setAttribute('role', 'tab');
    dg.append(ds); nav.append(dg);
  }

  function buildWorld(p) {
    // Each canvas page has its own world (own coordinates) and its own section title layer.
    // Section titles live in a screen-space layer, so they stay readable at every zoom and never cover frame names.
    p.world = el('div', 'world'); p.world.hidden = true;
    p.secLayer = el('div', 'secs'); p.secLayer.hidden = true;
    stage.insertBefore(p.world, $('#status'));
    stage.insertBefore(p.secLayer, $('#status'));
    for (const s of p.sections) {
      const ys = p.boards.filter(b => b.section === s.title).map(b => b.y);
      s.rowTop = ys.length ? Math.min(...ys) : s.y + 120;
      s.el = el('div', null, s.title);
      p.secLayer.append(s.el);
    }
    for (const n of p.notes) {
      const e = el('div', 'note', n.text);
      e.style.left = n.x + 'px'; e.style.top = n.y + 'px'; e.style.width = n.w + 'px';
      p.world.append(e);
    }
    for (const b of p.boards) {
      const e = el('div', 'board');
      e.style.cssText = `left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;--bw:${b.w}`;
      b.label = el('div', 'blabel', b.title);
      b.pinsEl = el('div', 'pins');
      e.append(b.label, b.pinsEl);
      b.el = e; b.imgs = [];
      p.world.append(e);
    }
    p.imgs = false;
  }

  function addImg(b, lvl) {
    const img = new Image();
    img.decoding = 'async'; img.alt = ''; img.draggable = false;
    img.onload = () => img.classList.add('ready');
    img.src = `shots/${LEVELS[lvl]}/${b.id}.jpg`;
    b.el.insertBefore(img, b.label);
    b.imgs[lvl] = img;
  }

  // ---------- canvas transform ----------
  let raf = 0, idle = 0;
  function schedule() { if (!raf) raf = requestAnimationFrame(render); }
  function render() {
    raf = 0;
    world.style.transform = `translate(${st.tx}px,${st.ty}px) scale(${st.z})`;
    world.style.setProperty('--z', st.z);
    world.style.setProperty('--inv', 1 / st.z);
    world.classList.toggle('tiny', st.z < 0.055);
    const labels = st.z >= 0.055, fsz = labels ? clamp(56 * st.z, 16, 56) : clamp(56 * st.z, 10, 16), gap = labels ? 26 : 3;
    for (const s of D.sections) {
      s.el.style.fontSize = fsz + 'px';
      s.el.style.transform = `translate(${s.x * st.z + st.tx}px,${s.rowTop * st.z + st.ty - gap}px) translateY(-100%)`;
    }
    world.classList.add('moving');
    clearTimeout(idle); idle = setTimeout(() => world.classList.remove('moving'), 180);
    $('#zoom-val').textContent = Math.round(st.z * 100) + ' %';
    updateImages();
    if (pop) placePop();
  }

  const fullLru = new Map();
  function updateImages() {
    if (!isCanvas() || !D) return;
    const W = stage.clientWidth, H = stage.clientHeight, need = st.z * (window.devicePixelRatio || 1);
    const want = need <= 0.16 ? 0 : need <= 0.55 ? 1 : 2;
    const seen = new Set();
    for (const b of D.boards) {
      const x = b.x * st.z + st.tx, y = b.y * st.z + st.ty;
      if (x > W + 300 || y > H + 300 || x + b.w * st.z < -300 || y + b.h * st.z < -300) continue;
      seen.add(b);
      for (let l = 1; l <= want; l++) if (!b.imgs[l]) addImg(b, l);
      if (want === 2) { fullLru.delete(b); fullLru.set(b, 1); }
    }
    if (fullLru.size > FULL_KEEP) {
      for (const b of fullLru.keys()) {
        if (fullLru.size <= FULL_KEEP) break;
        if (seen.has(b)) continue;
        b.imgs[2].remove(); b.imgs[2] = null; fullLru.delete(b);
      }
    }
  }

  function stagePt(e) { const r = stage.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  function toWorld(sx, sy) { return [(sx - st.tx) / st.z, (sy - st.ty) / st.z]; }
  function boardAt(wx, wy) {
    for (let i = D.boards.length - 1; i >= 0; i--) {
      const b = D.boards[i];
      if (wx >= b.x && wx <= b.x + b.w && wy >= b.y && wy <= b.y + b.h) return b;
    }
    return null;
  }
  function zoomAt(sx, sy, nz) {
    nz = clamp(nz, MIN_Z, MAX_Z);
    const wx = (sx - st.tx) / st.z, wy = (sy - st.ty) / st.z;
    st.z = nz; st.tx = sx - wx * nz; st.ty = sy - wy * nz;
    schedule();
  }
  function zoomCenter(nz) { zoomAt(stage.clientWidth / 2, stage.clientHeight / 2, nz); }

  let anim = 0;
  function animateTo(z2, tx2, ty2, ms = 280) {
    cancelAnimationFrame(anim);
    const W = stage.clientWidth, H = stage.clientHeight, z1 = st.z, t0 = performance.now();
    const c1 = [(W / 2 - st.tx) / z1, (H / 2 - st.ty) / z1], c2 = [(W / 2 - tx2) / z2, (H / 2 - ty2) / z2];
    const stepf = now => {
      const t = Math.min(1, (now - t0) / ms), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      st.z = Math.exp(Math.log(z1) + (Math.log(z2) - Math.log(z1)) * e);
      st.tx = W / 2 - (c1[0] + (c2[0] - c1[0]) * e) * st.z;
      st.ty = H / 2 - (c1[1] + (c2[1] - c1[1]) * e) * st.z;
      render();
      if (t < 1) anim = requestAnimationFrame(stepf);
    };
    anim = requestAnimationFrame(stepf);
  }
  function fitRect(x, y, w, h, { pad = 56, max = 1, animate = true, align = 'center' } = {}) {
    const W = stage.clientWidth, H = stage.clientHeight - 44;
    const z = clamp(Math.min((W - 2 * pad) / w, (H - 2 * pad) / h), MIN_Z, max);
    const tx = align === 'top' ? pad - x * z : (W - w * z) / 2 - x * z;
    const ty = align === 'top' ? pad - y * z : (H - h * z) / 2 - y * z + 8;
    if (animate) animateTo(z, tx, ty); else { st.z = z; st.tx = tx; st.ty = ty; schedule(); }
  }
  function bounds(list) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const b of list) { x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h); }
    return [x0, y0, x1 - x0, y1 - y0];
  }
  function fitBoard(b, animate = true) { fitRect(b.x, b.y - 30, b.w, b.h + 30, { animate }); }
  function fitAll() { if (!D.boards.length) return; const [x, y, w, h] = bounds(D.boards); fitRect(x, y - 140, w, h + 140, { pad: 32 }); }
  function fitSection(name) { const [x, y, w, h] = bounds(D.boards.filter(b => b.section === name)); fitRect(x, y - 140, w, h + 140, { pad: 40 }); }
  function home() {
    const first = D.sections[0] ? D.boards.filter(b => b.section === D.sections[0].title) : [];
    let list = D.boards.filter(b => b.section === 'Index').concat(first);
    if (!list.length) list = D.boards;
    if (!list.length) return;
    const [x, y, w, h] = bounds(list);
    fitRect(x, y, w, h, { pad: 48, animate: false, align: 'top' });
  }
  function inView(b) {
    const W = stage.clientWidth, H = stage.clientHeight, x = b.x * st.z + st.tx, y = b.y * st.z + st.ty;
    return x >= 0 && y >= 0 && x + b.w * st.z <= W && y + b.h * st.z <= H && b.w * st.z > 120;
  }

  // ---------- selection, list, status ----------
  function select(id, { fit = false } = {}) {
    if (st.sel && D.byId.get(st.sel)) D.byId.get(st.sel).el.classList.remove('sel');
    st.sel = id || null;
    const b = st.sel && D.byId.get(st.sel);
    if (b) { b.el.classList.add('sel'); if (fit) fitBoard(b); }
    markList(); renderStatus(); setHash();
  }
  function step(d) {
    if (st.focus && st.focus.kind !== 'doc') {
      const arr = st.focus.kind === 'card' ? D.cards : D.boards;
      const n = arr[arr.indexOf(st.focus.item) + d];
      if (n) openFocus(n, st.focus.kind);
      return;
    }
    if (!isCanvas()) return;
    const i = st.sel ? D.boards.findIndex(b => b.id === st.sel) : -1;
    const n = D.boards[clamp(i + d, 0, D.boards.length - 1)];
    if (n) select(n.id, { fit: true });
  }
  function shortTitle(b) {
    const parts = b.title.split(' · ');
    if (parts.length < 2) return b.title;
    const last = b.section.split(' › ').pop().toLowerCase();
    return last.startsWith(parts[0].toLowerCase()) ? parts.slice(1).join(' · ') : b.title;
  }
  function countFor(key) { return comments.filter(c => c.target === key).length; }

  function buildList() {
    const list = $('#list'); list.textContent = '';
    const groups = new Map();
    if (isCanvas()) {
      for (const b of D.boards) { if (!groups.has(b.section)) groups.set(b.section, []); groups.get(b.section).push(b); }
    } else {
      groups.set('Guide', [{ id: 'guide', key: 'guide', title: 'Design system guide', doc: true }]);
      for (const g of D.ds.groups) groups.set(g.name, g.cards);
    }
    for (const [name, items] of groups) {
      const g = el('div', 'grp'); g.dataset.name = name;
      const h = el('button', 'grp-h'); h.innerHTML = CARET;
      h.append(el('span', 'gt', name === 'Index' ? 'Index board' : name), el('span', 'cnt', items.length));
      h.addEventListener('click', ev => {
        if (ev.target.closest('.car')) { g.classList.toggle('closed'); return; }
        g.classList.remove('closed');
        if (isCanvas()) fitSection(name);
        else { const sec = document.getElementById('dsg-' + name.replace(/\W+/g, '-')); sec && sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
      const body = el('div', 'grp-b');
      for (const it of items) {
        const key = isCanvas() ? it.id : it.key;
        const b = el('button', 'item'); b.dataset.key = key;
        b.title = isCanvas() ? `${it.title}\n${it.id}` : (it.subtitle || it.title);
        b.append(el('span', 'lbl', isCanvas() ? shortTitle(it) : it.title));
        const n = countFor(key); if (n) b.append(el('span', 'badge', n));
        b.dataset.search = `${it.title} ${it.id} ${name} ${it.subtitle || ''}`.toLowerCase();
        if (isCanvas()) {
          b.addEventListener('click', () => select(it.id, { fit: true }));
          b.addEventListener('dblclick', () => openFocus(it));
        } else {
          b.addEventListener('click', () => it.doc ? openDoc() : openFocus(it, 'card'));
        }
        body.append(b);
      }
      g.append(h, body); list.append(g);
    }
    $('#list-label').textContent = isCanvas() ? 'Frames' : 'Components';
    $('#n-list').textContent = isCanvas() ? D.boards.filter(b => b.section !== 'Index').length : D.cards.length;
    applySearch(); markList();
  }
  function applySearch() {
    const q = $('#search').value.trim().toLowerCase(), list = $('#list');
    list.classList.toggle('searching', !!q);
    for (const g of list.querySelectorAll('.grp')) {
      let any = false;
      for (const it of g.querySelectorAll('.item')) { const ok = !q || it.dataset.search.includes(q); it.hidden = !ok; any = any || ok; }
      g.hidden = !any;
    }
  }
  function markList() {
    const key = st.focus ? (st.focus.kind === 'card' ? st.focus.item.key : st.focus.kind === 'doc' ? 'guide' : st.focus.item.id) : st.sel;
    for (const it of $('#list').querySelectorAll('.item')) {
      const on = it.dataset.key === key;
      it.classList.toggle('sel', on);
      if (on) { it.closest('.grp').classList.remove('closed'); it.scrollIntoView({ block: 'nearest' }); }
    }
  }
  function renderStatus() {
    const s = $('#status'); s.textContent = '';
    const b = st.sel && D.byId.get(st.sel);
    if (b) {
      const chip = el('div', 'chip'), t = el('span', 't');
      t.innerHTML = `<b>${esc(b.title)}</b> <span class="dim">· ${esc(b.id)} · ${b.w} × ${b.h}</span>`;
      chip.append(t, button('Open', () => openFocus(b)), button('Copy name', () => copy(b.id, 'Frame name copied')));
      s.append(chip);
    }
    s.append(el('div', 'hint', st.commenting ? 'Click a spot on a frame to comment · C or Esc to stop' : 'Scroll to move · Ctrl/⌘ + scroll to zoom · Double-click a frame to open it'));
  }
  function button(label, fn, cls = 'tbtn') { const b = el('button', cls, label); b.addEventListener('click', fn); return b; }

  // ---------- pages ----------
  function setPage(p, hash = true) {
    if (p !== 'ds' && !D.pageById.has(p)) p = D.pages[0].id;
    const cur = D.pageById.get(st.page);
    if (cur && cur.id !== p) cur.view = { z: st.z, tx: st.tx, ty: st.ty };
    if (st.sel && D.byId.get(st.sel) && D.byId.get(st.sel).page !== p) { D.byId.get(st.sel).el.classList.remove('sel'); st.sel = null; }
    st.page = p;
    for (const b of document.querySelectorAll('.pages button')) b.classList.toggle('on', b.dataset.page === p);
    const canvas = p !== 'ds';
    stage.hidden = !canvas; $('#dspage').hidden = canvas; $('#zoom-box').hidden = !canvas;
    for (const pg of D.pages) { pg.world.hidden = pg.id !== p; pg.secLayer.hidden = pg.id !== p; }
    $('#search').value = '';
    if (canvas) {
      const pg = D.pageById.get(p);
      world = pg.world; D.boards = pg.boards; D.sections = pg.sections;
      if (!pg.imgs) { for (const b of pg.boards) addImg(b, 0); pg.imgs = true; }
      if (pg.view) { st.z = pg.view.z; st.tx = pg.view.tx; st.ty = pg.view.ty; } else home();
    }
    buildList();
    if (canvas) schedule();
    if (hash) setHash();
  }

  function buildDs() {
    const root = $('#dspage'); root.textContent = '';
    const inner = el('div', 'dsin'), head = el('div', 'dshead');
    head.append(el('h1', null, 'Design system'), el('p', null, 'Tokens, components and states of Securezone VPN. The screens are built from these parts. Click a card to see it at full size with its notes.'));
    const g = el('div', 'guide-card');
    g.append(el('p', null, 'The guide explains the look, colour, type, words and states of the app, in English and Arabic.'), button('Read the guide', openDoc, 'tbtn primary'));
    head.append(g); inner.append(head);
    for (const grp of D.ds.groups) {
      const sec = el('section', 'dsgrp'); sec.id = 'dsg-' + grp.name.replace(/\W+/g, '-');
      const h = el('h2', null, grp.name); h.append(el('i', null, grp.cards.length)); sec.append(h);
      const grid = el('div', 'dsgrid');
      for (const c of grp.cards) {
        const card = el('button', 'dscard'); card.dataset.key = c.key;
        const im = el('div', 'im'), img = new Image(); img.loading = 'lazy'; img.alt = c.title; img.src = `shots/ds/${c.id}.jpg`; im.append(img);
        const meta = el('div', 'meta'), t = el('b', null, c.title);
        meta.append(t, el('span', null, c.subtitle || ''));
        card.append(im, meta);
        card.addEventListener('click', () => openFocus(c, 'card'));
        grid.append(card);
      }
      sec.append(grid); inner.append(sec);
    }
    root.append(inner);
  }

  // ---------- focus view ----------
  function openFocus(item, kind = 'board') {
    hidePop();
    if (kind === 'board' && st.page !== item.page) setPage(item.page, false);
    if (kind === 'card' && st.page !== 'ds') setPage('ds', false);
    st.focus = { kind, item };
    const f = $('#focus'); f.hidden = false; f.classList.toggle('commenting', st.commenting);
    $('#f-doc').hidden = true; frame.hidden = false;
    $('#f-title').textContent = item.title;
    $('#f-sub').textContent = kind === 'board' ? `${pageLabel(item.page)} › ${item.section} · ${item.id} · ${item.w} × ${item.h}` : `${item.group} · ${item.subtitle || ''}`;
    $('#f-open').href = item.file; $('#f-open').hidden = false;
    for (const b of ['#f-prev', '#f-next', '#f-scale', '#f-comment']) $(b).hidden = false;
    const arr = kind === 'card' ? D.cards : D.boards, i = arr.indexOf(item);
    $('#f-prev').disabled = i <= 0; $('#f-next').disabled = i >= arr.length - 1;
    iframe.src = item.file;
    const rd = $('#f-readme');
    if (kind === 'card' && item.readme) {
      rd.hidden = false; rd.innerHTML = '<p class="dim">Loading notes…</p>';
      fetch(item.readme).then(r => r.text()).then(t => { if (st.focus && st.focus.item === item) rd.innerHTML = md(t, item.readme); }).catch(() => { rd.innerHTML = '<p class="dim">Notes could not load.</p>'; });
    } else rd.hidden = true;
    $('#f-scroll').scrollTop = 0;
    layoutFocus(); renderFocusPins(); markList(); setHash();
  }
  function openDoc() {
    hidePop();
    if (st.page !== 'ds') setPage('ds', false);
    st.focus = { kind: 'doc', item: { title: 'Design system guide', file: D.ds.readme } };
    $('#focus').hidden = false; frame.hidden = true; $('#f-readme').hidden = true;
    for (const b of ['#f-prev', '#f-next', '#f-scale', '#f-comment']) $(b).hidden = true;
    $('#f-title').textContent = 'Design system guide'; $('#f-sub').textContent = D.ds.readme;
    $('#f-open').hidden = true;
    const doc = $('#f-doc'); doc.hidden = false; doc.innerHTML = '<p class="dim">Loading…</p>';
    fetch(D.ds.readme).then(r => r.text()).then(t => { doc.innerHTML = '<h1>Design system guide</h1>' + md(t, D.ds.readme); }).catch(() => { doc.innerHTML = '<p>The guide could not load.</p>'; });
    $('#f-scroll').scrollTop = 0;
    markList(); setHash();
  }
  function closeFocus() {
    if (!st.focus) return;
    hidePop();
    const it = st.focus.kind === 'board' ? st.focus.item : null;
    st.focus = null; $('#focus').hidden = true; iframe.src = 'about:blank';
    if (it) { select(it.id); if (!inView(it)) fitBoard(it); }
    else { markList(); setHash(); }
  }
  function layoutFocus() {
    if (!st.focus || st.focus.kind === 'doc') return;
    const it = st.focus.item, sc = $('#f-scroll');
    st.fs = st.fscale === 'fit' ? Math.min(1, (sc.clientWidth - 48) / it.w) : 1;
    frame.style.width = it.w * st.fs + 'px'; frame.style.height = it.h * st.fs + 'px';
    iframe.style.width = it.w + 'px'; iframe.style.height = it.h + 'px'; iframe.style.transform = `scale(${st.fs})`;
    for (const b of document.querySelectorAll('#f-scale button')) b.classList.toggle('on', b.dataset.s === st.fscale);
    renderFocusPins();
    if (pop) placePop();
  }
  function focusKey() { return st.focus ? (st.focus.kind === 'card' ? st.focus.item.key : st.focus.item.id) : null; }

  // ---------- comments ----------
  function titleOf(key) {
    if (key.startsWith('ds:')) { const c = D.cardById.get(key.slice(3)); return c ? `Design system › ${c.title}` : key; }
    const b = D.byId.get(key); return b ? `${pageLabel(b.page)} › ${b.title}` : key;
  }
  function orderOf(key) {
    if (key.startsWith('ds:')) return 100000 + D.cards.findIndex(c => c.key === key);
    return D.allBoards.findIndex(b => b.id === key);
  }
  function pinEl(c, draft) {
    const p = el('div', 'pin' + (draft ? ' draft' : ''), draft ? '+' : c.n);
    p.title = draft ? 'New comment' : c.text;
    if (!draft) {
      p.addEventListener('pointerdown', e => e.stopPropagation());
      p.addEventListener('click', e => { e.stopPropagation(); editComment(c); });
    }
    return p;
  }
  function renderPins() {
    if (!D) return;
    for (const b of D.allBoards) b.pinsEl.textContent = '';
    for (const c of comments) {
      const b = D.byId.get(c.target); if (!b) continue;
      const p = pinEl(c); p.style.left = c.x + 'px'; p.style.top = c.y + 'px'; p.dataset.id = c.id;
      b.pinsEl.append(p);
    }
    if (pop && pop.mode === 'new') {
      const b = D.byId.get(pop.target);
      if (b) { const p = pinEl(null, true); p.style.left = pop.x + 'px'; p.style.top = pop.y + 'px'; b.pinsEl.append(p); }
    }
    renderFocusPins();
  }
  function renderFocusPins() {
    const layer = $('#f-pins'); layer.textContent = '';
    const key = focusKey(); if (!key || st.focus.kind === 'doc') return;
    for (const c of comments) {
      if (c.target !== key) continue;
      const p = pinEl(c); p.style.left = c.x * st.fs + 'px'; p.style.top = c.y * st.fs + 'px'; p.dataset.id = c.id;
      layer.append(p);
    }
    if (pop && pop.mode === 'new' && pop.target === key) {
      const p = pinEl(null, true); p.style.left = pop.x * st.fs + 'px'; p.style.top = pop.y * st.fs + 'px'; layer.append(p);
    }
  }
  function startComment(target, x, y) {
    pop = { mode: 'new', target, x: Math.round(x), y: Math.round(y) };
    showPop();
  }
  function editComment(c) {
    pop = { mode: 'edit', id: c.id, target: c.target, x: c.x, y: c.y };
    showPop(c.text);
  }
  function showPop(text = '') {
    const box = $('#pop');
    $('#pop-n').textContent = pop.mode === 'new' ? 'New comment' : '#' + comments.find(c => c.id === pop.id).n;
    $('#pop-t').textContent = titleOf(pop.target);
    $('#pop-text').value = text;
    $('#pop-del').hidden = pop.mode === 'new';
    box.hidden = false;
    renderPins(); placePop();
    $('#pop-text').focus();
  }
  function hidePop() {
    if (!pop) return;
    pop = null; $('#pop').hidden = true;
    if (document.activeElement === $('#pop-text')) $('#pop-text').blur();
    renderPins();
  }
  function anchor() {
    if (!pop) return null;
    if (st.focus && focusKey() === pop.target) { const r = frame.getBoundingClientRect(); return [r.left + pop.x * st.fs, r.top + pop.y * st.fs]; }
    const b = D.byId.get(pop.target); if (!b || st.page !== b.page) return null;
    const r = stage.getBoundingClientRect();
    return [r.left + (b.x + pop.x) * st.z + st.tx, r.top + (b.y + pop.y) * st.z + st.ty];
  }
  function placePop() {
    const a = anchor(), box = $('#pop'); if (!a) return;
    const w = box.offsetWidth || 320, h = box.offsetHeight || 180;
    let x = a[0] + 22, y = a[1] - 24;
    if (x + w > innerWidth - 8) x = a[0] - 22 - w;
    x = clamp(x, 8, innerWidth - w - 8); y = clamp(y, 56, innerHeight - h - 8);
    box.style.left = x + 'px'; box.style.top = y + 'px';
  }
  function savePop() {
    if (!pop) return;
    const text = $('#pop-text').value.trim();
    if (pop.mode === 'new') {
      if (!text) { hidePop(); return; }
      const n = comments.reduce((m, c) => Math.max(m, c.n), 0) + 1;
      comments.push({ id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), n, target: pop.target, x: pop.x, y: pop.y, text, at: new Date().toISOString() });
      toast(`Comment #${n} saved`);
    } else {
      const c = comments.find(c => c.id === pop.id);
      if (!text) { if (!confirm('Delete this comment?')) return; comments = comments.filter(x => x !== c); }
      else c.text = text;
    }
    saveComments(); hidePop(); afterComments();
  }
  function deletePop() {
    if (!pop || pop.mode !== 'edit') return;
    comments = comments.filter(c => c.id !== pop.id);
    saveComments(); hidePop(); afterComments(); toast('Comment deleted');
  }
  function afterComments() { renderPins(); renderComments(); buildList(); }
  function sortedComments() { return comments.slice().sort((a, b) => orderOf(a.target) - orderOf(b.target) || a.n - b.n); }
  function renderComments() {
    $('#n-comments').textContent = comments.length || '';
    const list = $('#c-list'); list.textContent = '';
    $('#c-hint').textContent = comments.length
      ? 'Copy all, then paste the text into the task. Click a comment to see its spot.'
      : 'No comments yet. Press C (or Comment at the top), then click the spot on a frame.';
    $('#c-copy').disabled = $('#c-clear').disabled = !comments.length;
    for (const c of sortedComments()) {
      const it = el('button', 'citem'), h = el('div', 'ch');
      h.append(el('span', 'badge', c.n), el('span', null, titleOf(c.target)));
      it.append(h, el('div', 'ct', c.text));
      it.addEventListener('click', () => goComment(c));
      list.append(it);
    }
  }
  function goComment(c) {
    if (c.target.startsWith('ds:')) { const card = D.cardById.get(c.target.slice(3)); if (card) openFocus(card, 'card'); }
    else if (st.focus) { const b = D.byId.get(c.target); if (b) openFocus(b); }
    else {
      const b = D.byId.get(c.target); if (!b) return;
      if (st.page !== b.page) setPage(b.page);
      select(b.id);
      const z = Math.max(st.z, 0.6), W = stage.clientWidth, H = stage.clientHeight;
      animateTo(z, W / 2 - (b.x + c.x) * z, H / 2 - (b.y + c.y) * z);
    }
    setTimeout(() => {
      for (const p of document.querySelectorAll(`.pin[data-id="${c.id}"]`)) { p.classList.add('hl'); setTimeout(() => p.classList.remove('hl'), 1600); }
      if (st.focus) { const p = $(`#f-pins .pin[data-id="${c.id}"]`); p && p.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    }, 320);
  }
  function exportText() {
    const page = location.origin + location.pathname;
    const out = [`Design review comments: ${D.title} (commit ${D.source.commit})`, page, ''];
    let last = null;
    for (const c of sortedComments()) {
      if (c.target !== last) {
        if (last !== null) out.push('');
        const name = c.target.startsWith('ds:') ? `design-system card ${c.target.slice(3)}` : c.target;
        out.push(`${titleOf(c.target)} (${name})`);
        last = c.target;
      }
      out.push(`  #${c.n} at x ${c.x}, y ${c.y}: ${c.text.replace(/\n/g, '\n      ')}`);
    }
    return out.join('\n');
  }
  function setCommenting(on) {
    st.commenting = on;
    stage.classList.toggle('commenting', on);
    $('#focus').classList.toggle('commenting', on);
    $('#btn-comment').classList.toggle('on', on); $('#f-comment').classList.toggle('on', on);
    let pill = $('.mode-pill', stage);
    if (on && !pill) { pill = el('div', 'mode-pill', 'Comment mode: click a spot on a frame'); stage.append(pill); }
    if (!on && pill) pill.remove();
    if (!on && pop && pop.mode === 'new') hidePop();
    renderStatus();
  }

  // ---------- links ----------
  function setHash() {
    let h = '';
    if (st.page === 'ds') h = st.focus ? (st.focus.kind === 'doc' ? 'ds=guide' : 'ds=' + st.focus.item.id) : 'ds';
    else if (st.focus) h = 'open=' + st.focus.item.id;
    else if (st.sel) h = 'f=' + st.sel;
    else if (st.page) h = 'p=' + st.page;
    history.replaceState(null, '', h ? '#' + h : location.pathname + location.search);
  }
  function findBoard(id) {
    // Frame ids are "<canvas>/<file name>"; a bare file name finds the screen canvas first, then the paywall canvas.
    id = id.replace(/\.dc\.html$/, '');
    return D.byId.get(id) || D.byId.get('screens/' + id) || D.byId.get('paywalls/' + id) || null;
  }
  function route() {
    const q = new URLSearchParams(location.hash.slice(1));
    if (q.has('ds')) {
      setPage('ds', false);
      const id = q.get('ds');
      if (id === 'guide') openDoc(); else if (id && D.cardById.get(id)) openFocus(D.cardById.get(id), 'card');
      return true;
    }
    const id = q.get('open') || q.get('f'), b = id && findBoard(id);
    if (!b) {
      if (q.has('p') && D.pageById.has(q.get('p'))) { setPage(q.get('p'), false); select(null); return true; }
      return false;
    }
    if (st.page !== b.page) setPage(b.page, false);
    select(b.id); fitBoard(b, false);
    if (q.has('open')) openFocus(b);
    return true;
  }

  // ---------- helpers ----------
  async function copy(text, msg) {
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = el('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    toast(msg || 'Copied');
  }
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 1800);
  }
  function md(src, base) {
    const dir = base.replace(/[^/]*$/, '');
    const link = u => /^(https?:|mailto:|#)/.test(u) ? u : dir + u;
    const fmt = s => esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:!?]|$)/g, '$1<i>$2</i>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${esc(link(u))}" target="_blank" rel="noopener">${t}</a>`);
    const inline = s => s.split(/(`[^`]+`)/).map((p, i) => i % 2 ? `<code>${esc(p.slice(1, -1))}</code>` : fmt(p)).join('');
    const lines = src.replace(/\r/g, '').split('\n'), out = [];
    const isList = l => /^\s*([-*]|\d+\.)\s+/.test(l);
    const isTable = i => /^\s*\|/.test(lines[i]) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1]);
    let i = 0;
    while (i < lines.length) {
      const l = lines[i];
      if (/^```/.test(l)) {
        const buf = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++; out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue;
      }
      const h = l.match(/^(#{1,6})\s+(.*)$/);
      if (h) { const n = Math.min(h[1].length + 1, 6); out.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
      if (isTable(i)) {
        const cells = r => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => inline(c.trim()));
        const head = cells(lines[i]); i += 2; const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
        out.push(`<table><thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      if (isList(l)) {
        const items = [];
        while (i < lines.length) {
          const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
          if (m) { items.push({ ind: m[1].length, ord: /\d/.test(m[2]), text: m[3] }); i++; continue; }
          if (lines[i].trim() && /^\s{2,}/.test(lines[i]) && items.length) { items[items.length - 1].text += ' ' + lines[i].trim(); i++; continue; }
          break;
        }
        let html = ''; const stack = [];
        for (const it of items) {
          while (stack.length && it.ind < stack[stack.length - 1].ind) html += `</li></${stack.pop().tag}>`;
          if (!stack.length || it.ind > stack[stack.length - 1].ind) { const tag = it.ord ? 'ol' : 'ul'; stack.push({ ind: it.ind, tag }); html += `<${tag}><li>`; }
          else html += '</li><li>';
          html += inline(it.text);
        }
        while (stack.length) html += `</li></${stack.pop().tag}>`;
        out.push(html); continue;
      }
      if (/^>\s?/.test(l)) {
        const buf = []; while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
        out.push(`<blockquote>${inline(buf.join(' '))}</blockquote>`); continue;
      }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { out.push('<hr>'); i++; continue; }
      if (!l.trim()) { i++; continue; }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|>)/.test(lines[i]) && !isList(lines[i]) && !isTable(i)) buf.push(lines[i++]);
      out.push(`<p>${inline(buf.join(' '))}</p>`);
    }
    return out.join('\n');
  }

  // ---------- events ----------
  function bind() {
    for (const b of document.querySelectorAll('.pages button')) b.addEventListener('click', () => { closeFocus(); setPage(b.dataset.page); });
    for (const b of document.querySelectorAll('#side-tabs button')) b.addEventListener('click', () => {
      for (const x of document.querySelectorAll('#side-tabs button')) x.classList.toggle('on', x === b);
      $('#tab-list').hidden = b.dataset.tab !== 'list'; $('#tab-comments').hidden = b.dataset.tab !== 'comments';
    });
    $('#search').addEventListener('input', applySearch);
    $('#btn-comment').addEventListener('click', () => setCommenting(!st.commenting));
    $('#f-comment').addEventListener('click', () => setCommenting(!st.commenting));
    $('#zoom-in').addEventListener('click', () => zoomCenter(st.z * 1.25));
    $('#zoom-out').addEventListener('click', () => zoomCenter(st.z / 1.25));
    $('#zoom-val').addEventListener('click', () => zoomCenter(1));
    $('#btn-fit').addEventListener('click', fitAll);
    $('#btn-help').addEventListener('click', () => { $('#help').hidden = false; });
    $('#help-x').addEventListener('click', () => { $('#help').hidden = true; });
    $('#help').addEventListener('click', e => { if (e.target.id === 'help') $('#help').hidden = true; });
    $('#banner-x').addEventListener('click', () => { $('#banner').hidden = true; sessionStorage.setItem('szdr:banner', 'off'); schedule(); });
    $('#f-close').addEventListener('click', closeFocus);
    $('#f-prev').addEventListener('click', () => step(-1));
    $('#f-next').addEventListener('click', () => step(1));
    $('#f-copy').addEventListener('click', () => copy(location.href, 'Link copied'));
    for (const b of document.querySelectorAll('#f-scale button')) b.addEventListener('click', () => { st.fscale = b.dataset.s; layoutFocus(); });
    $('#f-scroll').addEventListener('scroll', () => { if (pop) placePop(); }, { passive: true });
    $('#f-catch').addEventListener('click', e => {
      const r = frame.getBoundingClientRect();
      startComment(focusKey(), (e.clientX - r.left) / st.fs, (e.clientY - r.top) / st.fs);
    });
    iframe.addEventListener('load', () => {
      try { iframe.contentDocument.addEventListener('keydown', ev => onKey(ev, true)); } catch { /* other origin */ }
    });
    $('#pop-save').addEventListener('click', savePop);
    $('#pop-cancel').addEventListener('click', hidePop);
    $('#pop-del').addEventListener('click', deletePop);
    $('#c-copy').addEventListener('click', () => copy(exportText(), `${comments.length} comments copied`));
    $('#c-clear').addEventListener('click', () => {
      if (!comments.length || !confirm(`Delete all ${comments.length} comments in this browser? Copy them first if you need them.`)) return;
      comments = []; saveComments(); hidePop(); afterComments();
    });
    window.addEventListener('resize', () => { schedule(); layoutFocus(); });
    window.addEventListener('hashchange', () => {
      if (st.focus) { hidePop(); st.focus = null; $('#focus').hidden = true; iframe.src = 'about:blank'; }
      route();
    });
    window.addEventListener('storage', e => { if (e.key === KEY) { comments = loadComments(); afterComments(); } });
    document.addEventListener('keydown', e => onKey(e, false));

    // pan and zoom
    stage.addEventListener('wheel', e => {
      e.preventDefault();
      const k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? stage.clientHeight : 1;
      if (e.ctrlKey || e.metaKey) {
        const d = clamp(e.deltaY * k, -60, 60), [sx, sy] = stagePt(e);
        zoomAt(sx, sy, st.z * Math.exp(-d * 0.006));
      } else {
        const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX, dy = e.shiftKey && !e.deltaX ? 0 : e.deltaY;
        st.tx -= dx * k; st.ty -= dy * k; schedule();
      }
    }, { passive: false });
    let gz = 1;
    stage.addEventListener('gesturestart', e => { e.preventDefault(); gz = st.z; });
    stage.addEventListener('gesturechange', e => { e.preventDefault(); const [sx, sy] = stagePt(e); zoomAt(sx, sy, gz * e.scale); });
    const ptrs = new Map(); let drag = null, pinch = null;
    stage.addEventListener('pointerdown', e => {
      if (e.target.closest('.pin, .chip')) return;
      if (e.button !== 0 && e.button !== 1) return;
      cancelAnimationFrame(anim);
      stage.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (ptrs.size === 1) drag = { x: e.clientX, y: e.clientY, tx: st.tx, ty: st.ty, moved: false, button: e.button };
      else if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z: st.z, mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], tx: st.tx, ty: st.ty };
        drag = null;
      }
    });
    stage.addEventListener('pointermove', e => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (pinch && ptrs.size >= 2) {
        const [a, b] = [...ptrs.values()], r = stage.getBoundingClientRect();
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]), mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const nz = clamp(pinch.z * d / pinch.d, MIN_Z, MAX_Z), sx = pinch.mid[0] - r.left, sy = pinch.mid[1] - r.top;
        const wx = (sx - pinch.tx) / pinch.z, wy = (sy - pinch.ty) / pinch.z;
        st.z = nz; st.tx = sx - wx * nz + (mid[0] - pinch.mid[0]); st.ty = sy - wy * nz + (mid[1] - pinch.mid[1]);
        schedule(); return;
      }
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) > 4) { drag.moved = true; stage.classList.add('panning'); }
      if (drag.moved) { st.tx = drag.tx + dx; st.ty = drag.ty + dy; schedule(); }
    });
    const end = e => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.delete(e.pointerId);
      if (pinch) { if (ptrs.size < 2) pinch = null; drag = null; return; }
      if (drag && !drag.moved && e.type === 'pointerup' && drag.button === 0) onStageClick(e);
      drag = null; stage.classList.remove('panning');
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('dblclick', e => {
      if (st.commenting || e.target.closest('.pin, .chip')) return;
      const b = boardAt(...toWorld(...stagePt(e)));
      if (b) openFocus(b);
    });
  }
  function onStageClick(e) {
    const [wx, wy] = toWorld(...stagePt(e)), b = boardAt(wx, wy);
    if (st.commenting) {
      if (b) startComment(b.id, wx - b.x, wy - b.y); else toast('Click on a frame to comment');
      return;
    }
    if (pop) { hidePop(); return; }
    select(b ? b.id : null);
  }
  function onKey(e, fromFrame) {
    const tag = ((e.target && e.target.tagName) || '').toLowerCase();
    if ((tag === 'textarea' || tag === 'input') && e.target.offsetParent !== null) {
      if (e.key === 'Escape') { e.target.blur(); if (pop) hidePop(); }
      if (tag === 'textarea' && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); savePop(); }
      return;
    }
    if (!$('#help').hidden) { if (e.key === 'Escape') $('#help').hidden = true; return; }
    if (e.key === 'Escape') {
      if (pop) hidePop(); else if (st.commenting) setCommenting(false); else if (st.focus) closeFocus(); else if (st.sel) select(null);
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const canvas = !st.focus && isCanvas();
    switch (e.key) {
      case 'c': case 'C': if (st.focus && st.focus.kind === 'doc') return; setCommenting(!st.commenting); break;
      case 'ArrowRight': step(1); break;
      case 'ArrowLeft': step(-1); break;
      case 'Enter': if (canvas && st.sel) openFocus(D.byId.get(st.sel)); else return; break;
      case '+': case '=': if (canvas) zoomCenter(st.z * 1.25); else return; break;
      case '-': case '_': if (canvas) zoomCenter(st.z / 1.25); else return; break;
      case '0': if (canvas) fitAll(); else return; break;
      case '1': if (canvas) zoomCenter(1); else return; break;
      case '?': $('#help').hidden = false; break;
      case '/': if (st.focus) return; $('#search').focus(); break;
      default: return;
    }
    e.preventDefault();
  }
})();
