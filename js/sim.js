/* Phòng thí nghiệm ảnh: mô phỏng ảnh hưởng của khẩu độ, tốc độ, ISO, tiêu cự lên một bức ảnh.
   Cảnh mẫu là tranh vẽ nhiều lớp (không phải ảnh chụp thật); lớp nào xa/gần thì mờ theo công thức vòng mờ (circle of confusion). */
(function () {
  const APS = 22.3;                                  // bề ngang cảm biến APS-C Canon (mm)
  const AP = [1.8, 2, 2.2, 2.5, 2.8, 3.2, 3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22];
  const TV = [1 / 4000, 1 / 3200, 1 / 2500, 1 / 2000, 1 / 1600, 1 / 1250, 1 / 1000, 1 / 800, 1 / 640, 1 / 500, 1 / 400, 1 / 320, 1 / 250, 1 / 200, 1 / 160, 1 / 125, 1 / 100, 1 / 80, 1 / 60, 1 / 50, 1 / 40, 1 / 30, 1 / 25, 1 / 20, 1 / 15, 1 / 13, 1 / 10, 1 / 8, 1 / 6, 1 / 5, 1 / 4, 0.3, 0.4, 0.5, 0.6, 0.8, 1];
  const ISOS = [100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800, 16000, 25600];
  const SCENES = [
    ['Nắng gắt ngoài trời', 15], ['Công viên nắng nhẹ', 13], ['Trời râm', 12], ['Hoàng hôn / bóng râm', 9], ['Trong nhà sáng', 7], ['Trong nhà tối', 5]
  ];
  const MOVES = [['Đứng yên', 0], ['Đi bộ', 1.3], ['Chạy bộ', 3]];
  const f0 = 18, s0 = 3.5;                            // tiêu cự gốc và khoảng cách chủ thể gốc (m) của cảnh vẽ
  const LAYERS = [['sky', 200], ['far', 40], ['mid', 12], ['subj', 3.5], ['fg', 0.9]];

  const fmtT = t => t >= 0.4 ? (Math.round(t * 10) / 10).toString().replace('.', '"') + '"' : '1/' + Math.round(1 / t);
  const fmtN = n => 'F' + (n % 1 ? n.toFixed(1) : n);
  const nearest = (arr, v, log = true) => { let bi = 0, bd = 1e9; arr.forEach((a, i) => { const d = Math.abs((log ? Math.log2(a) : a) - (log ? Math.log2(v) : v)); if (d < bd) { bd = d; bi = i; } }); return bi; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const log2 = Math.log2;

  /* ------------------------- cảnh vẽ: công viên hoa anh đào ------------------------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const PAL = ['#fff4f7', '#fde6ee', '#fad2de', '#f5bccd', '#ea9fb8'];
  function blossoms(r, cx, cy, rx, ry, n, rMin, rMax, light) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = r() * 6.2832, d = Math.sqrt(r()), x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d;
      const sh = (y - cy) / ry, k = clamp(Math.floor((r() * 0.55 + (sh + 1) * 0.22 + (light ? 0 : 0.15)) * PAL.length), 0, PAL.length - 1);
      s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(rMin + r() * (rMax - rMin)).toFixed(1)}" fill="${PAL[k]}" opacity="${(0.8 + r() * 0.2).toFixed(2)}"/>`;
    }
    for (let i = 0; i < n / 7; i++) { const a = r() * 6.2832, d = Math.sqrt(r()), x = cx + Math.cos(a) * rx * d, y = cy - Math.abs(Math.sin(a)) * ry * d * 0.9; s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(rMin * 0.28 + r() * rMin * 0.35).toFixed(1)}" fill="#fff" opacity=".9"/>`; }
    return s;
  }
  const trunk = (x, y0, y1, w) => `<path d="M${x - w} ${y0} C${x - w * .7} ${y0 - 160} ${x - w * .5} ${y1 + 140} ${x - w * .3} ${y1} L${x + w * .3} ${y1} C${x + w * .5} ${y1 + 140} ${x + w * .7} ${y0 - 160} ${x + w} ${y0} Z" fill="#4a332f"/>`;
  const limb = (x1, y1, x2, y2, w) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2 + (y2 - y1) * 0.18} ${(y1 + y2) / 2} ${x2} ${y2}" stroke="#4a332f" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  const wrap = inner => `<svg viewBox="-72 -48 1344 896" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

  function sceneLayers() {
    const out = {};
    let r = rng(11), s = '';
    // trời + đồi xa + bãi cỏ nền
    s += `<defs><linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fbdec"/><stop offset=".55" stop-color="#cfe7f8"/><stop offset="1" stop-color="#fbeaee"/></linearGradient>
          <linearGradient id="gMead" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6d58f"/><stop offset="1" stop-color="#78ad5c"/></linearGradient></defs>`;
    s += `<rect x="-72" y="-48" width="1344" height="560" fill="url(#gSky)"/>`;
    [[170, 90, 130, 34], [520, 150, 170, 40], [930, 70, 150, 32], [1090, 190, 120, 28]].forEach(([x, y, w, h]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#fff" opacity=".85"/><ellipse cx="${x + w * .5}" cy="${y + 10}" rx="${w * .7}" ry="${h * .8}" fill="#fff" opacity=".8"/>`; });
    s += `<path d="M-72 440 Q150 360 330 410 T700 395 T1000 405 T1272 380 V560 H-72Z" fill="#b7cfe4"/>`;
    s += `<rect x="-72" y="448" width="1344" height="400" fill="url(#gMead)"/>`;
    out.sky = wrap(s);

    // hàng cây xa, bokeh nền
    r = rng(23); s = '';
    for (let i = 0; i < 16; i++) { const x = -60 + i * 88 + r() * 40, y = 400 + r() * 30; s += `<rect x="${x - 4}" y="${y}" width="8" height="${52 + r() * 22}" fill="#6d5348"/>`; s += blossoms(r, x, y - 4, 74 + r() * 30, 52 + r() * 22, 70, 9, 21, true); }
    s += blossoms(r, 600, 360, 300, 90, 140, 8, 20, true);
    for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 1300 - 60).toFixed(0)}" cy="${(250 + r() * 230).toFixed(0)}" r="${(3 + r() * 5).toFixed(1)}" fill="#fff" opacity="${(0.55 + r() * .4).toFixed(2)}"/>`;
    s += `<path d="M-72 520 H1272 V560 H-72Z" fill="#8fbc6c" opacity=".9"/>`;
    out.far = wrap(s);

    // hai cây lớn + lối đi
    r = rng(37); s = '';
    s += `<defs><linearGradient id="gPath" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dcc6"/><stop offset="1" stop-color="#d7c5a6"/></linearGradient></defs>`;
    s += `<path d="M520 478 L690 478 L1010 860 L190 860 Z" fill="url(#gPath)" opacity=".96"/>`;
    s += trunk(185, 560, 250, 34) + limb(185, 300, 90, 190, 14) + limb(190, 280, 300, 170, 12) + limb(188, 340, 330, 290, 11);
    s += blossoms(r, 150, 200, 190, 140, 300, 13, 28, true) + blossoms(r, 320, 230, 130, 110, 160, 12, 24, true) + blossoms(r, 90, 330, 110, 90, 110, 12, 22, false);
    s += trunk(1020, 560, 240, 32) + limb(1018, 300, 1110, 190, 13) + limb(1018, 290, 910, 190, 12) + limb(1015, 350, 880, 300, 10);
    s += blossoms(r, 1060, 190, 190, 140, 300, 13, 28, true) + blossoms(r, 900, 220, 130, 110, 160, 12, 24, true) + blossoms(r, 1110, 330, 110, 90, 110, 12, 22, false);
    for (let i = 0; i < 70; i++) s += `<circle cx="${(r() * 1300 - 60).toFixed(0)}" cy="${(r() * 330).toFixed(0)}" r="${(3 + r() * 5).toFixed(1)}" fill="#fff" opacity="${(0.6 + r() * .35).toFixed(2)}"/>`;
    for (let i = 0; i < 90; i++) s += `<ellipse cx="${(250 + r() * 700).toFixed(0)}" cy="${(520 + r() * 300).toFixed(0)}" rx="${(4 + r() * 4).toFixed(1)}" ry="${(2.5 + r() * 2).toFixed(1)}" fill="${PAL[1 + Math.floor(r() * 3)]}" opacity=".85" transform="rotate(${(r() * 180).toFixed(0)} ${(250 + r() * 700).toFixed(0)} 600)"/>`;
    out.mid = wrap(s);

    // cô gái (nhìn từ phía sau, ngẩng nhìn hoa) + mảng cỏ quanh chân
    r = rng(51); s = '';
    s += `<defs><radialGradient id="gPatch"><stop offset=".55" stop-color="#6fa653" stop-opacity=".95"/><stop offset="1" stop-color="#6fa653" stop-opacity="0"/></radialGradient>
         <linearGradient id="gDress" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6d6df"/><stop offset=".5" stop-color="#fff7f5"/><stop offset="1" stop-color="#efc3cf"/></linearGradient>
         <linearGradient id="gHair" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1d1311"/><stop offset=".45" stop-color="#3a2621"/><stop offset="1" stop-color="#1d1311"/></linearGradient></defs>`;
    s += `<ellipse cx="600" cy="752" rx="470" ry="86" fill="url(#gPatch)"/>`;
    for (let i = 0; i < 260; i++) { const x = 160 + r() * 880, y = 690 + r() * 120; s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(r() * 6 - 3).toFixed(1)} -${(8 + r() * 12).toFixed(0)} ${(r() * 8 - 4).toFixed(1)} -${(14 + r() * 14).toFixed(0)}" stroke="#5c9444" stroke-width="2" fill="none" opacity=".8"/>`; }
    for (let i = 0; i < 60; i++) s += `<ellipse cx="${(220 + r() * 760).toFixed(0)}" cy="${(700 + r() * 90).toFixed(0)}" rx="${(4 + r() * 3).toFixed(1)}" ry="${(2.5 + r() * 1.5).toFixed(1)}" fill="${PAL[Math.floor(r() * 4)]}" transform="rotate(${(r() * 180).toFixed(0)} 600 750)"/>`;
    s += `<ellipse cx="610" cy="760" rx="125" ry="14" fill="#000" opacity=".22"/>`;
    // chân + giày
    s += `<path d="M588 612 L584 740 L599 740 L603 612Z" fill="#efc4aa"/><path d="M606 612 L611 740 L626 740 L620 612Z" fill="#e8b99f"/>`;
    s += `<ellipse cx="590" cy="748" rx="19" ry="8" fill="#fff"/><ellipse cx="620" cy="748" rx="19" ry="8" fill="#f1f1f1"/><rect x="571" y="754" width="38" height="4" rx="2" fill="#d7d7d7"/><rect x="601" y="754" width="38" height="4" rx="2" fill="#cfcfcf"/>`;
    // váy + áo
    s += `<path d="M574 468 Q600 478 628 468 L664 628 Q600 646 536 628Z" fill="url(#gDress)"/>`;
    for (let i = 0; i < 7; i++) s += `<path d="M${586 + i * 6} 476 Q${580 + i * 11} 556 ${548 + i * 18} 630" stroke="#e9b8c6" stroke-width="1.6" fill="none" opacity=".7"/>`;
    s += `<path d="M570 404 Q600 394 632 404 L628 474 Q600 482 574 474Z" fill="#ffffff"/><path d="M570 404 Q600 394 632 404 L631 424 Q600 416 571 424Z" fill="#f3ecee"/>`;
    // tay + túi
    s += `<path d="M571 406 Q553 450 556 505 L568 506 Q568 452 582 414Z" fill="#efc4aa"/><path d="M630 406 Q650 440 662 478 L652 486 Q640 452 622 418Z" fill="#e8b99f"/>`;
    s += `<rect x="640" y="480" width="40" height="46" rx="6" fill="#d9b48a"/><path d="M646 480 Q660 456 674 480" stroke="#b78e63" stroke-width="3" fill="none"/>`;
    // cổ + đầu + tóc
    s += `<rect x="591" y="372" width="18" height="30" fill="#efc4aa"/><ellipse cx="601" cy="342" rx="27" ry="31" fill="#efc4aa"/>`;
    s += `<path d="M570 346 C566 296 636 292 633 346 C642 396 644 440 628 492 L574 492 C558 440 560 396 570 346Z" fill="url(#gHair)"/>`;
    for (let i = 0; i < 9; i++) s += `<path d="M${580 + i * 6} 322 C${574 + i * 7} 390 ${572 + i * 8} 440 ${578 + i * 6} 486" stroke="#5a3a30" stroke-width="1.3" fill="none" opacity=".55"/>`;
    s += `<circle cx="631" cy="352" r="9" fill="#f7a8c0"/><circle cx="631" cy="352" r="4" fill="#fff4f7"/>`;
    out.subj = wrap(s);

    // tiền cảnh: cành hoa sát ống kính + cánh hoa bay
    r = rng(71); s = '';
    s += limb(-72, 80, 150, 40, 18) + limb(40, 56, 250, 120, 11) + limb(1272, 120, 1030, 60, 18) + limb(1160, 90, 960, 150, 10);
    s += blossoms(r, 60, 40, 170, 120, 70, 24, 46, true) + blossoms(r, 250, 120, 100, 70, 40, 22, 40, true);
    s += blossoms(r, 1160, 40, 170, 110, 70, 24, 46, true) + blossoms(r, 980, 150, 100, 66, 40, 22, 40, true);
    for (let i = 0; i < 16; i++) { const x = r() * 1300 - 60, y = 100 + r() * 700; s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(10 + r() * 8).toFixed(1)}" ry="${(6 + r() * 4).toFixed(1)}" fill="${PAL[Math.floor(r() * 3)]}" opacity=".92" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`; }
    out.fg = wrap(s);
    return out;
  }

  /* ------------------------- mô hình quang học ------------------------- */
  function physics(st, W) {
    const f = st.lens === 'prime' ? 50 : st.f, N = st.N, T = st.T, ISO = st.iso;
    const sub = st.keep ? s0 * f / f0 : s0;                          // khoảng cách máy–chủ thể (m)
    const sMM = sub * 1000;
    const stops = st.ev - (log2(N * N / T) - log2(ISO / 100));      // + = thừa sáng
    const coc = d => {                                              // đường kính vòng mờ (px trên khung)
      const dd = (sub + (d - s0)) * 1000;
      if (dd <= f) return 0;
      return (f * f / (N * (sMM - f))) * Math.abs(dd - sMM) / dd / APS * W;
    };
    const k = d0 => (f / f0) * d0 / (sub + d0 - s0);                // hệ số phóng của lớp có khoảng cách gốc d0
    const diff = N > 11 ? (N - 11) * 0.09 * W / 900 : 0;
    const shakeMM = f * 0.04 * T * (st.is ? 0.125 : 1);
    const shakePx = shakeMM / APS * W;
    const vPx = (st.v * 1000 * f / sMM) * T / APS * W;               // nhòe do chủ thể chuyển động
    return { f, sub, stops, coc, k, diff, shakePx, vPx, bgCoc: coc(40), fgCoc: coc(0.9) };
  }

  /* ------------------------- giao diện ------------------------- */
  function mount(root) {
    const sc = sceneLayers();
    const st = { mode: 'Av', lens: 'kit', f: 18, N: 5.6, T: 1 / 250, iso: 100, ev: 13, v: 0, is: true, keep: false, user: null };
    let U = { x: .5, y: .56, size: 1 };                                // vùng nét của ảnh người dùng
    root.innerHTML = `
    <div class="lab">
      <div class="lab-view">
        <div class="vf" id="vf">
          <div class="stage" id="stage">
            <div class="expo" id="expo"><div class="shake" id="shake">
              ${LAYERS.map(([id]) => `<div class="lyr" data-id="${id}"><div class="lyr-in">${sc[id]}</div></div>`).join('')}
              <div class="lyr user" id="ulyr" hidden><div class="lyr-in"><img id="uimgb" alt=""></div></div>
              <div class="lyr user" id="ulyr2" hidden><div class="lyr-in"><img id="uimgs" alt=""></div></div>
            </div></div>
            <canvas class="noise" id="noise" width="256" height="256"></canvas>
            <div class="afbox" id="afbox"></div>
            <div class="hud top"><span id="hMode">Av</span><span id="hF">18mm</span></div>
            <div class="hud bot"><b id="hT">1/250</b><b id="hN">F5.6</b><span class="scale" id="hScale"></span><b id="hI">ISO 100</b></div>
          </div>
        </div>
        <p class="small muted note" id="demoNote">Cảnh mẫu là tranh vẽ nhiều lớp (xa → gần), không phải ảnh chụp. Mỗi lớp mờ theo khoảng cách của nó. Bạn có thể nạp ảnh thật của mình ở dưới.</p>
      </div>
      <div class="lab-ctl">
        <fieldset class="seg" id="modeSeg"><legend>Chế độ máy</legend>
          <button data-m="M">M</button><button data-m="Av">Av</button><button data-m="Tv">Tv</button><button data-m="P">P</button></fieldset>
        <p class="small muted" id="modeHelp"></p>
        <fieldset class="seg" id="lensSeg"><legend>Ống kính</legend>
          <button data-l="kit">Kit 18-45 f/4.5-6.3</button><button data-l="prime">Lens 50 mm f/1.8</button></fieldset>
        <div class="row"><label for="rf">Tiêu cự</label><input type="range" id="rf" min="18" max="45" step="1" value="18"><output id="of"></output></div>
        <div class="row"><label for="rn">Khẩu độ</label><input type="range" id="rn" min="0" max="${AP.length - 1}" step="1"><output id="on"></output><span class="auto" id="aN">AUTO</span></div>
        <div class="row"><label for="rt">Tốc độ màn trập</label><input type="range" id="rt" min="0" max="${TV.length - 1}" step="1"><output id="ot"></output><span class="auto" id="aT">AUTO</span></div>
        <div class="row"><label for="ri">ISO</label><input type="range" id="ri" min="0" max="${ISOS.length - 1}" step="1"><output id="oi"></output><span class="auto" id="aI">AUTO</span></div>
        <div class="row two">
          <label>Ánh sáng<select id="sScene">${SCENES.map((x, i) => `<option value="${i}">${x[0]}</option>`).join('')}</select></label>
          <label>Chủ thể<select id="sMove">${MOVES.map((x, i) => `<option value="${i}">${x[0]}</option>`).join('')}</select></label>
        </div>
        <label class="chk"><input type="checkbox" id="cIS" checked> Bật chống rung IS (mô phỏng ≈3 stop)</label>
        <label class="chk"><input type="checkbox" id="cKeep"> Lùi lại khi zoom để chủ thể giữ nguyên cỡ (xem nền bị "ép" lại)</label>
        <div class="presets" id="presets"></div>
        <div class="usr">
          <label class="btn2">Dùng ảnh thật của bạn<input type="file" id="uf" accept="image/*" hidden></label>
          <button class="btn2 ghost" id="ubk" hidden>Quay lại cảnh mẫu</button>
          <label class="usz" id="usz" hidden>Vùng nét <input type="range" id="uzr" min="40" max="160" value="100"></label>
          <p class="small muted" id="uhelp" hidden>Kéo ngón tay/chuột trên ảnh để chọn vùng chủ thể nét. Ngoài vùng đó sẽ bị mờ theo khẩu độ và tiêu cự. Ảnh chỉ xử lý trên máy bạn, không tải lên đâu cả.</p>
        </div>
      </div>
      <div class="lab-out" id="explain" aria-live="polite"></div>
    </div>
    <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <filter id="fShake" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur id="gShake" stdDeviation="0 0"/></filter>
      <filter id="fSubj" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur id="gSubj" stdDeviation="0 0"/></filter>
      <filter id="fUsr" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur id="gUsr" stdDeviation="0 0"/></filter></defs></svg>`;

    const $ = id => root.querySelector('#' + id);
    const stage = $('stage'), lyrs = [...root.querySelectorAll('.lyr')].filter(e => e.dataset.id);
    const byId = id => root.querySelector(`.lyr[data-id="${id}"]`);
    // noise tile
    (function () { const c = $('noise'), x = c.getContext('2d'), d = x.createImageData(256, 256); for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (Math.random() + Math.random() + Math.random() - 1.5) * 90; d.data[i] = v + (Math.random() - .5) * 26; d.data[i + 1] = v; d.data[i + 2] = v + (Math.random() - .5) * 26; d.data[i + 3] = 255; } x.putImageData(d, 0, 0); })();

    const minN = f => 4.5 + (f - 18) / 27 * 1.8;
    const apRange = () => { const lo = st.lens === 'prime' ? 1.8 : minN(st.f); return [AP.findIndex(a => a >= lo - 0.01), AP.length - 1]; };

    function auto() {                                                // chế độ tự động tính phần còn lại
      const K = Math.pow(2, st.ev) * st.iso / 100;
      const [lo] = apRange();
      if (st.mode === 'Av') st.T = TV[nearest(TV, st.N * st.N / K)];
      else if (st.mode === 'Tv') st.N = AP[clamp(nearest(AP, Math.sqrt(st.T * K)), lo, AP.length - 1)];
      else if (st.mode === 'P') {
        const fe = (st.lens === 'prime' ? 50 : st.f) * 1.6, safe = 1 / Math.max(60, fe * 2);
        let N = AP[clamp(nearest(AP, 8), lo, AP.length - 1)], T = N * N / K;
        if (T > safe) { N = AP[clamp(nearest(AP, Math.sqrt(safe * K)), lo, AP.length - 1)]; T = N * N / K; }
        st.N = N; st.T = TV[nearest(TV, T)];
      }
    }

    function sync() {                                                // cập nhật các thanh trượt theo trạng thái
      if (st.lens === 'prime') { st.f = 50; }
      const [lo] = apRange(); if (AP.indexOf(st.N) < lo) st.N = AP[lo];
      auto();
      $('rf').disabled = st.lens === 'prime'; $('rf').value = st.lens === 'prime' ? 45 : st.f; $('of').textContent = (st.lens === 'prime' ? 50 : st.f) + ' mm';
      $('rn').min = lo; $('rn').value = AP.indexOf(st.N); $('on').textContent = fmtN(st.N);
      $('rt').value = nearest(TV, st.T); $('ot').textContent = fmtT(st.T);
      $('ri').value = nearest(ISOS, st.iso, true); $('oi').textContent = st.iso;
      $('rn').disabled = st.mode === 'Tv' || st.mode === 'P'; $('rt').disabled = st.mode === 'Av' || st.mode === 'P';
      $('aN').hidden = !(st.mode === 'Tv' || st.mode === 'P'); $('aT').hidden = !(st.mode === 'Av' || st.mode === 'P'); $('aI').hidden = true;
      root.querySelectorAll('#modeSeg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === st.mode));
      root.querySelectorAll('#lensSeg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === st.lens));
      $('modeHelp').textContent = { M: 'M: bạn chỉnh cả khẩu độ, tốc độ và ISO. Nhìn thước phơi sáng để biết ảnh sáng hay tối.', Av: 'Av: bạn chọn khẩu độ, máy tự chọn tốc độ cho ảnh đủ sáng.', Tv: 'Tv: bạn chọn tốc độ, máy tự chọn khẩu độ.', P: 'P: máy chọn cả khẩu độ và tốc độ; bạn chỉnh ISO.' }[st.mode];
    }

    function render() {
      const W = stage.clientWidth || 600;
      const p = physics(st, W);
      const mk = st.user;
      // lớp cảnh mẫu / ảnh người dùng
      root.querySelectorAll('.lyr[data-id]').forEach(l => l.hidden = !!mk);
      $('ulyr').hidden = $('ulyr2').hidden = !mk;
      const sig = c => Math.max(0, c * 0.42);
      if (!mk) {
        LAYERS.forEach(([id, d0]) => {
          const el = byId(id), inn = el.firstElementChild;
          const dist = id === 'sky' ? 400 : d0;
          let blur = sig(p.coc(dist)) + p.diff;
          inn.style.transform = `scale(${p.k(d0).toFixed(3)})`;
          if (id === 'subj') {
            $('gSubj').setAttribute('stdDeviation', `${(p.vPx * 0.5).toFixed(2)} 0`);
            el.style.filter = `${p.vPx > 0.4 ? 'url(#fSubj) ' : ''}blur(${blur.toFixed(2)}px)`;
          } else el.style.filter = `blur(${blur.toFixed(2)}px)`;
        });
      } else {
        const bgb = sig(p.coc(15)) + p.diff;
        $('ulyr').style.filter = `blur(${(bgb + 0.0).toFixed(2)}px)`;
        $('gUsr').setAttribute('stdDeviation', `${(p.vPx * 0.5).toFixed(2)} 0`);
        $('ulyr2').style.filter = `${p.vPx > 0.4 ? 'url(#fUsr) ' : ''}blur(${p.diff.toFixed(2)}px)`;
        const rx = 22 * U.size, ry = 38 * U.size;
        const m = `radial-gradient(ellipse ${rx}% ${ry}% at ${U.x * 100}% ${U.y * 100}%, #000 62%, transparent 100%)`;
        $('ulyr2').style.webkitMaskImage = $('ulyr2').style.maskImage = m;
      }
      // rung máy (toàn khung)
      const a = 25 * Math.PI / 180;
      $('gShake').setAttribute('stdDeviation', `${(p.shakePx * 0.5 * Math.cos(a)).toFixed(2)} ${(p.shakePx * 0.5 * Math.sin(a)).toFixed(2)}`);
      $('shake').style.filter = p.shakePx > 0.4 ? 'url(#fShake)' : 'none';
      // phơi sáng + nhiễu
      const s = clamp(p.stops, -7, 7);
      const gain = clamp(Math.pow(2, s / 2.2), 0.04, 6);
      $('expo').style.filter = `brightness(${gain.toFixed(3)}) contrast(${(1 + Math.max(0, s) * 0.1).toFixed(2)}) saturate(${(1 - Math.min(0.55, Math.abs(s) * 0.09)).toFixed(2)})`;
      const nz = clamp(0.012 + 0.085 * log2(st.iso / 100) + 0.09 * Math.max(0, -s), 0, 0.92);
      $('noise').style.opacity = nz.toFixed(3);
      // HUD
      $('hMode').textContent = st.mode; $('hF').textContent = p.f + ' mm';
      $('hT').textContent = fmtT(st.T); $('hN').textContent = fmtN(st.N); $('hI').textContent = 'ISO ' + st.iso;
      const flash = Math.abs(s) > 1.4 ? ' flash' : '';
      let sc = '';
      for (let i = -3; i <= 3; i++) sc += `<i class="${i % 1 === 0 ? 'big' : ''}"></i>`;
      $('hScale').innerHTML = sc + `<em class="pt${flash}" style="left:${(50 + clamp(s, -3.2, 3.2) / 3.2 * 50).toFixed(1)}%"></em>`;
      $('afbox').hidden = !!mk;
      explain(p);
    }

    function explain(p) {
      const s = p.stops, bg = p.bgCoc, items = [];
      const ev = Math.abs(s) < 0.4 ? ['ok', 'Độ sáng chuẩn', `Thước phơi sáng ở giữa (${s >= 0 ? '+' : '−'}${Math.abs(s).toFixed(1)} stop). Ảnh đủ sáng, giữ được chi tiết cả vùng sáng lẫn tối.`]
        : s > 0 ? ['bad', `Thừa sáng ${s.toFixed(1)} stop`, 'Vùng sáng (bầu trời, hoa) bị cháy trắng, màu nhạt. Cách sửa: tăng tốc độ, thu nhỏ khẩu (số F lớn hơn) hoặc giảm ISO.']
          : ['bad', `Thiếu sáng ${Math.abs(s).toFixed(1)} stop`, 'Ảnh tối, màu xỉn, nhiễu hạt lộ rõ ở vùng tối. Cách sửa: giảm tốc độ, mở khẩu lớn hơn hoặc tăng ISO.'];
      items.push(ev);
      const bgTxt = bg < 1.5 ? 'Nền gần như nét hết. Hợp phong cảnh; muốn nền mờ, hãy mở khẩu lớn, zoom dài hơn hoặc đổi sang lens 50 mm f/1.8.'
        : bg < 6 ? 'Nền hơi mờ, chủ thể bắt đầu tách khỏi nền.' : 'Nền mờ rõ, chủ thể nổi bật. Đây là hiệu ứng "xóa phông" dùng cho chân dung.';
      items.push(['info', `Nền mờ ${bg.toFixed(1)} px`, bgTxt + (p.diff > 0.5 ? ' Khẩu quá nhỏ (số F rất lớn) làm toàn ảnh hơi mềm do nhiễu xạ.' : '')]);
      const mv = Math.max(p.vPx, 0), sh = p.shakePx;
      if (st.v > 0 && mv > 3) items.push(['bad', `Người bị nhòe ${mv.toFixed(1)} px`, 'Chủ thể đang đi/chạy nên cần tốc độ nhanh hơn. Thử 1/250 s trở lên để đóng băng chuyển động.']);
      else if (sh > 3) items.push(['bad', `Rung máy ~${sh.toFixed(1)} px`, 'Tốc độ quá chậm so với tiêu cự nên cả khung bị nhòe. Tăng tốc độ, zoom ngắn lại, bật IS hoặc dùng chân máy.']);
      else items.push(['ok', 'Không nhòe', st.v > 0 ? 'Tốc độ đủ nhanh để đóng băng chuyển động và rung tay.' : 'Tốc độ đủ nhanh cho cầm tay ở tiêu cự này.']);
      items.push([st.iso >= 6400 ? 'bad' : 'info', `ISO ${st.iso}`, st.iso >= 6400 ? 'ISO rất cao: nhiễu hạt và mất chi tiết rõ. Chỉ dùng khi buộc phải giữ tốc độ nhanh.' : st.iso >= 1600 ? 'ISO cao: ảnh sáng hơn trong chỗ tối nhưng nhiễu hạt bắt đầu thấy rõ (phóng to ảnh sẽ thấy).' : st.iso > 400 ? 'ISO vừa: có ít nhiễu, thường chấp nhận được.' : 'ISO thấp: ảnh sạch, ít nhiễu, nếu đủ sáng.']);
      items.push(['info', `Tiêu cự ${p.f} mm`, p.f < 28 ? 'Góc rộng: thu nhiều cảnh hơn, mờ nền ít.' : 'Tiêu cự dài hơn: chủ thể lớn hơn, nền mờ nhiều hơn.' + (st.keep ? ` Máy đang đứng cách chủ thể ${p.sub.toFixed(1)} m nên nền như được "ép" lại gần.` : ' Đứng yên chỗ cũ mà zoom chỉ là cắt khung lớn hơn.')]);
      $('explain').innerHTML = items.map(i => `<div class="ex ${i[0]}"><b>${i[1]}</b><span>${i[2]}</span></div>`).join('');
    }

    /* ---- sự kiện ---- */
    let raf = 0; const redraw = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { sync(); render(); }); };
    root.querySelectorAll('#modeSeg button').forEach(b => b.onclick = () => { st.mode = b.dataset.m; redraw(); });
    root.querySelectorAll('#lensSeg button').forEach(b => b.onclick = () => { st.lens = b.dataset.l; redraw(); });
    $('rf').oninput = e => { st.f = +e.target.value; redraw(); };
    $('rn').oninput = e => { st.N = AP[+e.target.value]; redraw(); };
    $('rt').oninput = e => { st.T = TV[+e.target.value]; redraw(); };
    $('ri').oninput = e => { st.iso = ISOS[+e.target.value]; redraw(); };
    $('sScene').onchange = e => { st.ev = SCENES[+e.target.value][1]; redraw(); };
    $('sMove').onchange = e => { st.v = MOVES[+e.target.value][1]; redraw(); };
    $('cIS').onchange = e => { st.is = e.target.checked; redraw(); };
    $('cKeep').onchange = e => { st.keep = e.target.checked; redraw(); };
    window.addEventListener('resize', redraw);

    const PRE = [
      ['Chân dung nền mờ', { lens: 'prime', mode: 'Av', N: 1.8, iso: 100, ev: 13, v: 0, keep: true }],
      ['Phong cảnh nét sâu', { lens: 'kit', f: 18, mode: 'Av', N: 8, iso: 100, ev: 13, v: 0, keep: false }],
      ['Bắt người đi bộ', { lens: 'kit', f: 24, mode: 'Tv', T: 1 / 500, iso: 200, ev: 13, v: 1.3, keep: false }],
      ['Người nhòe vì chậm', { lens: 'kit', f: 24, mode: 'Tv', T: 1 / 15, iso: 100, ev: 13, v: 1.3, keep: false }],
      ['Rung tay ở 45 mm', { lens: 'kit', f: 45, mode: 'M', N: 8, T: 1 / 8, iso: 100, ev: 9, v: 0, is: false, keep: false }],
      ['Trong nhà tối', { lens: 'kit', f: 18, mode: 'M', N: 4.5, T: 1 / 30, iso: 1600, ev: 5, v: 0, keep: false }]
    ];
    $('presets').innerHTML = '<span class="small muted">Thử nhanh:</span>' + PRE.map((p, i) => `<button data-p="${i}">${p[0]}</button>`).join('');
    $('presets').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      Object.assign(st, { is: true, v: 0, f: 18, keep: false }, PRE[+b.dataset.p][1]);
      $('sScene').value = SCENES.findIndex(x => x[1] === st.ev); $('sMove').value = MOVES.findIndex(x => x[1] === st.v);
      $('cIS').checked = st.is; $('cKeep').checked = st.keep; redraw();
    };

    /* ---- ảnh thật của người dùng ---- */
    $('uf').onchange = e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const u = URL.createObjectURL(f);
      $('uimgb').src = $('uimgs').src = u; st.user = u; U = { x: .5, y: .56, size: 1 };
      $('ubk').hidden = $('usz').hidden = $('uhelp').hidden = false; $('uzr').value = 100;
      $('demoNote').textContent = 'Đang dùng ảnh của bạn. Vùng elip là chủ thể nét; phần còn lại được xem là nền (giả định xa chủ thể).';
      redraw();
    };
    $('ubk').onclick = () => { st.user = null; $('ubk').hidden = $('usz').hidden = $('uhelp').hidden = true; $('demoNote').textContent = 'Cảnh mẫu là tranh vẽ nhiều lớp (xa → gần), không phải ảnh chụp. Mỗi lớp mờ theo khoảng cách của nó.'; redraw(); };
    $('uzr').oninput = e => { U.size = +e.target.value / 100; redraw(); };
    const mv = e => { if (!st.user || !(e.buttons || e.type === 'pointerdown')) return; const r = stage.getBoundingClientRect(); U.x = clamp((e.clientX - r.left) / r.width, 0, 1); U.y = clamp((e.clientY - r.top) / r.height, 0, 1); redraw(); };
    stage.addEventListener('pointerdown', mv); stage.addEventListener('pointermove', mv);

    sync(); render();
    new ResizeObserver(() => render()).observe(stage);
  }

  window.SIM = { mount };
})();
