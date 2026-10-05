(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  ART.mountSymbols();

  /* ---------- plate ---------- */
  function figure(p) {
    const real = (window.REAL || {})[p.id];
    if (p.real || real) {
      const src = p.real || real;
      return `<figure class="realfig"><img decoding="async" src="${src}" alt="${p.name}"><span class="badge">ảnh thật</span>${p.realCap ? `<figcaption>${p.realCap}</figcaption>` : ''}</figure>`;
    }
    if (p.art) return ART.zoom(p.art[0], p.art[1], { alt: 'Hình phóng to: ' + p.name }).replace('<div class="zoomfig">', '<div class="zoomfig"><span class="badge">hình minh họa</span>');
    return '';
  }
  function plate(p) {
    const marks = p.marks && p.marks.length ? `<div class="marks"><span class="cap">In trên máy:</span>${p.marks.map(m => `<span class="mk">${m}</span>`).join('')}</div>` : '';
    const abbr = p.abbr ? `<ul class="abbr">${p.abbr.map(a => `<li><span class="mk">${a[0]}</span>${a[1]}</li>`).join('')}</ul>` : '';
    return `<article class="plate" id="p-${p.id}">${figure(p)}<div class="txt">
      <h3>${p.name}</h3>${p.where ? `<p class="where">${p.where}</p>` : ''}${marks}
      <dl>${p.what ? `<dt>Là gì</dt><dd>${p.what}</dd>` : ''}${p.use ? `<dt>Dùng khi nào</dt><dd>${p.use}</dd>` : ''}</dl>${abbr}
      ${p.test ? `<div class="try" data-id="${p.id}"><label><input type="checkbox"><span><b>Thử khi mua máy cũ:</b> ${p.test}</span></label></div>` : ''}
    </div></article>`;
  }
  const FACES = [['tren', 'Mặt trên'], ['truoc', 'Mặt trước'], ['sau', 'Mặt sau'], ['canh', 'Cổng'], ['day', 'Đáy máy'], ['lens', 'Lens'], ['manhinh', 'Màn hình']];
  function facenav(cur) {
    return `<nav class="facenav" aria-label="Chuyển sang mặt máy khác">${FACES.map(([id, n]) => `<a href="#${id}"${id === cur ? ' aria-current="true"' : ''}>${n}</a>`).join('')}</nav>`;
  }
  function chapter(c) {
    return `<section class="chap" id="${c.id}"><div class="wrap">${facenav(c.id)}<header><h2>${c.title}</h2><p>${c.intro}</p></header>${c.plates.map(plate).join('')}</div></section><hr class="rule">`;
  }
  const all = [...window.CHAPTERS, ...window.CHAPTERS2];
  const byId = Object.fromEntries(all.flatMap(c => c.plates).map(p => [p.id, p]));
  const order = ['tren', 'truoc', 'sau', 'canh', 'day', 'lens', 'manhinh'];
  const chmap = Object.fromEntries(all.map(c => [c.id, c]));
  $('#parts').innerHTML = order.map(id => chapter(chmap[id])).join('');

  /* ---------- bản đồ tương tác ở đầu trang ---------- */
  const keyToPlate = {};
  all.flatMap(c => c.plates).forEach(p => { if (p.art) keyToPlate[p.art[0] + '.' + p.art[1]] = p; });
  const views = [['back', 'Mặt sau'], ['top', 'Mặt trên'], ['front', 'Mặt trước'], ['side', 'Cạnh trái']];
  function drawMap(v) {
    const m = ART.masters[v];
    let h = ART.whole(v, { alt: 'Sơ đồ ' + m.label });
    Object.entries(m.box).forEach(([k, b]) => {
      const p = keyToPlate[v + '.' + k]; if (!p) return;
      let cx = b[0] + b[2] / 2, cy = b[1] + b[3] / 2;
      if (v === 'back' && k === 'pad') { cx += 78; cy += 78; }
      h += `<button class="hot" style="left:${(cx / m.w * 100).toFixed(2)}%;top:${(cy / m.h * 100).toFixed(2)}%" data-go="p-${p.id}" aria-label="${p.name}" title="${p.name}"></button>`;
    });
    $('#mapbody').innerHTML = h;
    const seen = new Set();
    $('#maplist').innerHTML = '<span class="small">Hoặc chọn trong danh sách:</span>' + Object.keys(m.box).map(k => keyToPlate[v + '.' + k]).filter(p => p && !seen.has(p.id) && seen.add(p.id)).map(p => `<button type="button" data-go="p-${p.id}">${p.name.replace(/\s*\(.*?\)\s*/g, ' ').trim()}</button>`).join('');
  }
  function go(id) {
    const t = document.getElementById(id); if (!t) return;
    t.scrollIntoView({ behavior: 'smooth', block: 'start' }); t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 1600);
  }
  $('#viewtabs').innerHTML = views.map(([v, n], i) => `<button data-v="${v}" aria-pressed="${i === 0}">${n}</button>`).join('');
  $('#viewtabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('#viewtabs button').forEach(x => x.setAttribute('aria-pressed', x === b)); drawMap(b.dataset.v); };
  $('#mapbody').onclick = $('#maplist').onclick = e => { const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go); };
  drawMap('back');

  /* ---------- ô xanh "Thử khi mua máy cũ" ở từng bộ phận ---------- */
  const done = new Set(store.get('r50-tested', []));
  const tries = [...document.querySelectorAll('.try')];
  tries.forEach(t => { const cb = t.querySelector('input'), id = t.dataset.id; cb.checked = done.has(id); t.classList.toggle('done', cb.checked); cb.onchange = () => { cb.checked ? done.add(id) : done.delete(id); t.classList.toggle('done', cb.checked); store.set('r50-tested', [...done]); tally(); }; });

  /* ---------- tên máy ---------- */
  const NAMES = {
    canon: ['Canon', 'Tên hãng sản xuất.'],
    eos: ['EOS', 'Electro-Optical System: tên dòng máy ảnh của Canon, có từ thời máy phim.'],
    r50: ['R50', 'Tên kiểu máy trong dòng EOS R (mirrorless). Số 50 là cấp máy do Canon đặt, không phải thông số kỹ thuật.'],
    rfs: ['RF-S', 'Lens dùng ngàm RF nhưng thiết kế cho máy cảm biến APS-C như R50.'],
    r1845: ['18–45mm', 'Khoảng tiêu cự zoom. 18 mm rộng; 45 mm hẹp hơn, kéo chủ thể gần hơn. Với APS-C nhân khoảng 1,6 lần: tương đương 29–72 mm trên máy full-frame.'],
    f: ['F4.5–6.3', 'Khẩu độ lớn nhất, thay đổi khi zoom: f/4.5 ở 18 mm và giảm dần tới f/6.3 ở 45 mm. Số F càng nhỏ, lens càng "sáng" và dễ xóa phông.'],
    is: ['IS', 'Image Stabilizer: chống rung quang học nằm trong lens.'],
    stm: ['STM', 'Stepping Motor: mô-tơ bước điều khiển lấy nét, êm và mượt, hợp quay phim.']
  };
  $('#nameChips').onclick = e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('#nameChips button').forEach(x => x.classList.remove('on')); b.classList.add('on'); const d = NAMES[b.dataset.k]; $('#nameOut').innerHTML = `<b>${d[0]}</b> ${d[1]}`; };

  /* ---------- phụ kiện, checklist ---------- */
  $('#acc').innerHTML = window.ACCESSORIES.map(a => `<li><b>${a[0]}.</b> ${a[1]}</li>`).join('');
  const ck = new Set(store.get('r50-check', [])); let n = 0;
  $('#check').innerHTML = window.CHECK.map(([t, items]) => `<fieldset><legend>${t}</legend>${items.map(i => { const id = 'c' + (n++); return `<label><input type="checkbox" data-c="${id}" ${ck.has(id) ? 'checked' : ''}> <span>${i}</span></label>`; }).join('')}</fieldset>`).join('');
  $('#check').onchange = e => { const id = e.target.dataset.c; if (!id) return; e.target.checked ? ck.add(id) : ck.delete(id); store.set('r50-check', [...ck]); tally(); };
  function tally() {
    const nP = tries.filter(t => done.has(t.dataset.id)).length, tP = tries.length;
    const nC = document.querySelectorAll('#check input:checked').length, tC = n;
    $('#tPartsN').textContent = nP; $('#tPartsT').textContent = tP; $('#tPartsBar').style.width = (tP ? nP / tP * 100 : 0) + '%';
    $('#tCheckN').textContent = nC; $('#tCheckT').textContent = tC; $('#tCheckBar').style.width = (tC ? nC / tC * 100 : 0) + '%';
    $('#nextUntested').disabled = nP === tP;
    $('#nextUntested').textContent = nP === tP ? 'Đã thử đủ mọi bộ phận' : 'Tới bộ phận chưa thử';
  }
  $('#nextUntested').onclick = () => { const t = tries.find(x => !done.has(x.dataset.id)); if (t) go(t.closest('.plate').id); };
  let armed = 0;
  $('#resetAll').onclick = e => {
    const b = e.currentTarget;
    if (!armed) { armed = setTimeout(() => { armed = 0; b.textContent = 'Xoá mọi đánh dấu'; b.classList.remove('warn'); }, 4000); b.textContent = 'Bấm lần nữa để xoá'; b.classList.add('warn'); return; }
    clearTimeout(armed); armed = 0; b.textContent = 'Xoá mọi đánh dấu'; b.classList.remove('warn');
    done.clear(); ck.clear(); store.set('r50-tested', []); store.set('r50-check', []);
    tries.forEach(t => { t.querySelector('input').checked = false; t.classList.remove('done'); });
    document.querySelectorAll('#check input').forEach(i => i.checked = false); tally();
  };
  tally();

  /* ---------- chọn máy 15–20 triệu ---------- */
  (function buy() {
    const B = window.BUY; if (!B) return;
    const nf = x => String(x).replace('.', ',');
    const rng = r => !r ? '—' : (r[0] === r[1] ? nf(r[0]) : nf(r[0]) + '–' + nf(r[1])) + ' tr';
    const evf = m => m.evf === true ? '<span class="tag ok">Có kính ngắm</span>' : m.evf === false ? '<span class="tag bad">Không kính ngắm</span>' : `<span class="tag">${m.evf}</span>`;
    const card = m => `<article class="buy ${m.g}">
      <header><h4>${m.name}</h4><span class="yr">${m.year}</span></header>
      <p class="kit">+ ống ${m.kit}</p>
      <div class="tags">${evf(m)}${m.screen ? `<span class="tag">Màn: ${m.screen}</span>` : ''}<span class="tag ${m.alive ? '' : 'bad'}">Ngàm ${m.mount}</span></div>
      <dl class="price"><dt>Mới</dt><dd>${m.vnNew ? rng(m.vnNew) : 'không còn bán'}${m.newNote ? ` <small>(${m.newNote})</small>` : ''}</dd><dt>Cũ</dt><dd>${rng(m.vnUsed)}${m.usedNote ? ` <small>(${m.usedNote})</small>` : ''}</dd>${m.ru ? `<dt>Ở Moscow</dt><dd>${m.ru}</dd>` : ''}</dl>
      <ul class="pc">${m.pros.map(x => `<li class="p">${x}</li>`).join('')}${m.cons.map(x => `<li class="c">${x}</li>`).join('')}</ul>
      <p class="fit"><b>Hợp với:</b> ${m.fit}</p></article>`;
    $('#buyAsof').textContent = B.asof;
    $('#buy').innerHTML = B.groups.map(g => `<div class="bgroup"><h3 class="sub">${g.title}</h3><p class="muted small">${g.note}</p><div class="buygrid">${B.models.filter(m => m.g === g.id).map(card).join('')}</div></div>`).join('');
    $('#buyTable').innerHTML = '<thead><tr><th>Máy (kit)</th><th>Kính ngắm</th><th>Ngàm còn phát triển</th><th>Mới</th><th>Cũ</th></tr></thead><tbody>' +
      B.models.map(m => `<tr><td><b>${m.name}</b></td><td>${m.evf === true ? 'Có' : m.evf === false ? 'Không' : m.evf}</td><td>${m.alive ? 'Có' : 'Không'}</td><td>${m.vnNew ? rng(m.vnNew) : '—'}</td><td>${rng(m.vnUsed)}</td></tr>`).join('') + '</tbody>';
    $('#buySrc').innerHTML = B.sources.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}</a></li>`).join('') + `<li>Tỷ giá dùng trong trang: 1 ₽ ≈ ${B.rub} đ (${B.rubSrc}).</li>`;
    const vnd = rub => { const v = rub * (+$('#cvRate').value || B.rub); return v >= 1e6 ? nf((v / 1e6).toFixed(1)) + ' triệu đ' : Math.round(v).toLocaleString('vi-VN') + ' đ'; };
    $('#cvRate').value = B.rub;
    $('#cvNote').textContent = `Tỷ giá chính thức (${B.rubSrc}). Đổi tiền hoặc chuyển khoản thực tế sẽ lệch một chút.`;
    const conv = () => { const r = +$('#cvRub').value || 0; $('#cvOut').innerHTML = `${r.toLocaleString('vi-VN')} ₽ ≈ <b>${vnd(r)}</b>`; document.querySelectorAll('[data-rub]').forEach(e => e.textContent = vnd(+e.dataset.rub)); };
    $('#cvRub').oninput = $('#cvRate').oninput = conv; conv();
  })();

  document.querySelectorAll('table.stack').forEach(t => { const hs = [...t.querySelectorAll('thead th')].map(h => h.textContent); t.querySelectorAll('tbody tr').forEach(r => [...r.children].forEach((c, i) => c.dataset.l = hs[i] || '')); });

  /* ---------- từ điển ---------- */
  function gloss(q = '') { const t = q.toLowerCase().trim(); $('#gl').innerHTML = window.GLOSS.filter(g => !t || g.join(' ').toLowerCase().includes(t)).map(g => `<div class="g"><span class="mk">${g[0]}</span> <b>${g[1]}</b><p>${g[2]}</p></div>`).join('') || '<p class="muted">Không thấy thuật ngữ này.</p>'; }
  $('#gq').oninput = e => gloss(e.target.value); gloss();

  /* ---------- quiz ---------- */
  let sc = 0, ans = 0;
  $('#quiz').innerHTML = window.QUIZ.map((q, i) => `<div class="qq" data-i="${i}"><b>${i + 1}. ${q.q}</b><div class="ans">${q.a.map((a, j) => `<button data-j="${j}">${a}</button>`).join('')}</div><p class="why" hidden>${q.why}</p></div>`).join('');
  $('#quiz').onclick = e => {
    const b = e.target.closest('button'); if (!b) return; const box = b.closest('.qq'); if (box.dataset.done) return; box.dataset.done = 1;
    const q = window.QUIZ[+box.dataset.i], ok = +b.dataset.j === q.ok; b.classList.add(ok ? 'right' : 'wrong'); if (!ok) box.querySelector(`[data-j="${q.ok}"]`).classList.add('right');
    box.querySelector('.why').hidden = false; if (ok) sc++; ans++; $('#score').textContent = `Điểm: ${sc}/${window.QUIZ.length}` + (ans === window.QUIZ.length ? (sc >= 7 ? ' — rất tốt!' : ' — đọc lại các phần trên rồi thử lại.') : '');
  };
  $('#score').textContent = `Điểm: 0/${window.QUIZ.length}`;

  /* ---------- phòng thí nghiệm ---------- */
  SIM.mount($('#lab'));

  /* ---------- mục lục ---------- */
  const SECS = [
    ['Bắt đầu', [['ten', 'Đọc tên máy']]],
    ['Bộ phận máy', FACES],
    ['Thực hành', [['lab-sec', 'Phòng thí nghiệm ảnh'], ['hoc', 'Học chụp']]],
    ['Khi đi mua', [['chon-may', 'Chọn máy 15–20 triệu'], ['mua', 'Mua máy cũ'], ['tu-dien', 'Từ điển viết tắt'], ['quiz-sec', 'Tự kiểm tra']]]
  ];
  const label = Object.fromEntries(SECS.flatMap(g => g[1]));
  label.top = 'Trang đầu';
  $('#menuin').innerHTML = SECS.map(([g, items]) => `<div class="mgroup"><p>${g}</p>${items.map(([id, n]) => `<a href="#${id}" data-sec="${id}">${n}</a>`).join('')}</div>`).join('');
  const menu = $('#menu'), mbtn = $('#menubtn');
  function openMenu(o) { menu.hidden = !o; mbtn.setAttribute('aria-expanded', o); document.body.classList.toggle('menu-open', o); }
  mbtn.onclick = () => openMenu(menu.hidden);
  menu.onclick = e => { if (e.target.closest('a')) openMenu(false); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { openMenu(false); mbtn.focus(); } });
  document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('#bar')) openMenu(false); });

  /* ---------- đánh dấu phần đang xem ---------- */
  const PARTS = new Set(FACES.map(f => f[0]));
  const navLinks = [...document.querySelectorAll('.mainnav a')], menuLinks = [...document.querySelectorAll('#menuin a')];
  function setCurrent(id) {
    navLinks.forEach(l => l.classList.toggle('on', l.dataset.group === 'parts' ? PARTS.has(id) : l.getAttribute('href') === '#' + id));
    menuLinks.forEach(l => l.toggleAttribute('aria-current', l.dataset.sec === id));
    $('#here').textContent = id === 'top' ? '' : (label[id] || '');
  }
  const watched = ['top', ...SECS.flatMap(g => g[1].map(i => i[0]))].map(id => document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); }), { rootMargin: '-35% 0px -60% 0px' });
  watched.forEach(t => io.observe(t));

  const totop = $('#totop');
  const onScroll = () => { totop.hidden = scrollY < innerHeight * 1.5; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
