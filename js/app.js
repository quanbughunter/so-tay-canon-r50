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
      return `<figure class="realfig"><img loading="lazy" src="${src}" alt="${p.name}"><span class="badge">ảnh thật</span>${p.realCap ? `<figcaption>${p.realCap}</figcaption>` : ''}</figure>`;
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
  function chapter(c) {
    return `<section class="chap" id="${c.id}"><div class="wrap"><header><h2>${c.title}</h2><p>${c.intro}</p></header>${c.plates.map(plate).join('')}</div></section><hr class="rule">`;
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
  }
  $('#viewtabs').innerHTML = views.map(([v, n], i) => `<button data-v="${v}" aria-pressed="${i === 0}">${n}</button>`).join('');
  $('#viewtabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('#viewtabs button').forEach(x => x.setAttribute('aria-pressed', x === b)); drawMap(b.dataset.v); };
  $('#mapbody').onclick = e => { const b = e.target.closest('[data-go]'); if (!b) return; const t = document.getElementById(b.dataset.go); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 1600); } };
  drawMap('back');

  /* ---------- tick "đã thử" + tiến độ ---------- */
  const done = new Set(store.get('r50-tested', []));
  const tries = [...document.querySelectorAll('.try')];
  function progress() { $('#prog').textContent = `Đã thử ${done.size}/${tries.length}`; }
  tries.forEach(t => { const cb = t.querySelector('input'), id = t.dataset.id; cb.checked = done.has(id); t.classList.toggle('done', cb.checked); cb.onchange = () => { cb.checked ? done.add(id) : done.delete(id); t.classList.toggle('done', cb.checked); store.set('r50-tested', [...done]); progress(); }; });
  progress();

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
  $('#check').onchange = e => { const id = e.target.dataset.c; if (!id) return; e.target.checked ? ck.add(id) : ck.delete(id); store.set('r50-check', [...ck]); };

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

  /* ---------- đánh dấu mục đang xem ---------- */
  const links = [...document.querySelectorAll('.bar nav a')];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id)); } }), { rootMargin: '-40% 0px -55% 0px' });
  links.forEach(l => { const t = document.querySelector(l.getAttribute('href')); if (t) io.observe(t); });
})();
