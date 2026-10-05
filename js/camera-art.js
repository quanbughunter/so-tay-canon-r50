/* Sơ đồ minh họa Canon EOS R50 + RF-S 18-45 (vẽ lại bằng vector, KHÔNG phải ảnh chụp).
   Tên bộ phận theo bảng "Названия компонентов / Nomenclature" trong hướng dẫn Canon.
   Vị trí chỉ gần đúng. Mỗi mặt máy là một <symbol>, các "plate" zoom bằng viewBox. */
(function () {
  const R = (x, y, w, h, r, c = '') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
  const C = (x, y, r, c = '') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
  const T = (x, y, s, t, c = 'lbl', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" font-size="${s}" text-anchor="${a}">${t}</text>`;
  const L = (x1, y1, x2, y2, c = 'ln') => `<line class="${c}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  const P = (d, c = '') => `<path class="${c}" d="${d}"/>`;

  function knurl(cx, cy, r, n, len, c = 'knurl') {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      s += L(cx + Math.cos(a) * (r - len), cy + Math.sin(a) * (r - len), cx + Math.cos(a) * r, cy + Math.sin(a) * r, c);
    }
    return s;
  }
  function dots(x, y, cols, rows, gap, r, c = 'hole') {
    let s = '';
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += C(x + i * gap, y + j * gap, r, c);
    return s;
  }

  /* ---------------------------- MẶT SAU ---------------------------- */
  function back() {
    let s = '';
    s += R(40, 292, 24, 54, 8, 'body2') + R(1176, 292, 24, 54, 8, 'body2');          // quai đeo
    s += R(60, 210, 1120, 640, 64, 'body');
    s += P('M450 250 V168 Q450 108 510 108 H730 Q790 108 790 168 V250 Z', 'body');
    s += R(520, 92, 200, 18, 4, 'silver') + dots(548, 101, 8, 1, 20, 2.6, 'pin');       // đế phụ kiện (shoe)
    s += R(548, 126, 144, 100, 30, 'rubber') + R(574, 146, 92, 60, 18, 'glass');          // eyecup + thị kính
    s += R(700, 166, 62, 26, 13, 'slot') + R(712, 162, 24, 34, 7, 'btn') + T(708, 214, 20, '−', 'lbl-dim') + T(756, 214, 20, '+', 'lbl-dim');
    s += R(602, 232, 36, 12, 6, 'slot') + C(620, 238, 3, 'glassdot');                    // cảm biến mắt
    // màn hình xoay lật
    s += R(66, 304, 28, 62, 10, 'body2') + R(66, 640, 28, 62, 10, 'body2');
    s += R(92, 262, 668, 470, 26, 'bezel') + R(110, 280, 632, 434, 10, 'glass');
    s += `<path class="shine" d="M110 280 H420 L250 714 H110 Z"/>`;
    s += L(426, 280, 426, 714, 'grid') + L(634, 280, 634, 714, 'grid') + L(110, 425, 742, 425, 'grid') + L(110, 569, 742, 569, 'grid');
    // công tắc nguồn
    s += R(900, 230, 150, 42, 21, 'slot') + R(982, 224, 64, 54, 14, 'btn') + knurl(1014, 251, 20, 6, 0, 'knurl');
    s += L(996, 232, 996, 270, 'knurl') + L(1006, 232, 1006, 270, 'knurl') + L(1016, 232, 1016, 270, 'knurl') + L(1026, 232, 1026, 270, 'knurl');
    s += T(924, 224, 24, 'OFF', 'lbl') + T(1020, 224, 24, 'ON', 'lbl');
    // MENU / INFO / PLAYBACK
    s += C(826, 420, 36, 'btn') + T(826, 428, 22, 'MENU');
    s += C(826, 540, 36, 'btn') + T(826, 548, 22, 'INFO');
    s += C(826, 660, 36, 'btn') + P('M814 642 L846 660 L814 678 Z', 'icon');
    // ★ AE lock  và  ▣ AF point
    s += C(900, 330, 36, 'btn') + P('M900 304 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2 Z', 'icon') + T(900, 364, 17, '⊕', 'lbl-dim');
    s += C(1010, 330, 36, 'btn') + R(992, 313, 36, 28, 4, 'iconline') + L(1000, 313, 1000, 318, 'iconline') + L(1020, 313, 1020, 318, 'iconline') + T(1010, 364, 17, '⊖', 'lbl-dim');
    // vòng điều hướng
    s += C(1000, 600, 120, 'padring') + C(1000, 600, 52, 'btn');
    s += T(1000, 484, 34, '±', 'lbl') + T(1000, 702, 12, '', 'lbl');
    s += P('M986 700 h28 l-2 28 h-24 Z M982 696 h36', 'iconline');                       // thùng rác
    s += T(886, 596, 24, 'AF', 'lbl') + T(886, 622, 17, 'MF', 'lbl-dim');
    s += C(1110, 600, 14, 'iconline') + L(1110, 600, 1110, 590, 'iconline') + L(1110, 600, 1118, 604, 'iconline');
    s += T(1000, 592, 18, 'Q', 'lbl-dim') + T(1000, 620, 22, 'SET', 'lbl');
    s += R(1118, 560, 48, 160, 24, 'rubber') + dots(1130, 580, 4, 12, 11, 1.4, 'pin');  // chỗ đặt ngón cái
    s += C(1100, 810, 9, 'lamp');
    return s;
  }
  const backBox = {
    'ban-phim-sau': [60, 100, 1120, 760],
    eyecup: [540, 118, 160, 120], eyepiece: [566, 138, 108, 76], 'eye-sensor': [588, 220, 66, 36], diopter: [690, 150, 90, 74],
    shoe: [510, 84, 220, 36], screen: [60, 250, 710, 500], power: [880, 205, 190, 90],
    menu: [780, 375, 92, 92], info: [780, 495, 92, 92], play: [780, 615, 92, 92],
    ael: [855, 285, 92, 105], afpoint: [965, 285, 92, 105],
    up: [940, 466, 120, 80], down: [940, 650, 120, 80], left: [850, 550, 100, 100], right: [1050, 550, 100, 100], qset: [945, 545, 110, 110], pad: [870, 475, 260, 250],
    lamp: [1070, 783, 60, 54], thumb: [1100, 540, 90, 200]
  };

  /* ---------------------------- MẶT TRƯỚC (không lắp lens) ---------------------------- */
  function front() {
    let s = '';
    s += R(36, 296, 26, 54, 8, 'body2') + R(1178, 296, 26, 54, 8, 'body2');
    s += R(60, 210, 1120, 640, 64, 'body');
    s += P('M450 250 V168 Q450 108 510 108 H730 Q790 108 790 168 V250 Z', 'body');
    s += R(520, 92, 200, 18, 4, 'silver');
    s += R(510, 124, 220, 100, 16, 'body2') + L(530, 180, 710, 180, 'grid') + L(530, 196, 710, 196, 'grid');   // đèn flash (đang gập)
    // báng cầm (bên trái khi nhìn từ trước)
    s += P('M60 270 Q60 210 120 210 H330 Q372 210 372 250 V810 Q372 850 330 850 H110 Q60 850 60 800 Z', 'grip');
    s += dots(96, 330, 15, 28, 16, 1.5, 'pin');
    s += P('M372 330 Q344 520 372 720', 'ln');
    s += C(220, 272, 16, 'rubber') + C(220, 272, 9, 'glassdot');                       // đèn trợ sáng AF
    // ngàm RF
    s += C(640, 560, 268, 'silver') + C(640, 560, 238, 'ring2');
    for (let i = 0; i < 3; i++) { const a = (i * 120 + 30) * Math.PI / 180; s += `<path class="tab" d="M${640 + Math.cos(a) * 200} ${560 + Math.sin(a) * 200} L${640 + Math.cos(a) * 252} ${560 + Math.sin(a) * 252}"/>`; }
    s += C(640, 560, 212, 'glass');
    s += R(530, 487, 220, 146, 6, 'sensor') + `<path class="shine" d="M530 487 H640 L590 633 H530 Z"/>`;
    for (let i = 0; i < 12; i++) s += R(576 + i * 11, 758, 7, 20, 2, 'gold');            // tiếp điểm
    s += C(500, 342, 14, 'redmark');                                                      // chấm đỏ
    s += C(968, 540, 28, 'btn') + C(968, 540, 16, 'btnface');                             // nút nhả lens
    s += R(862, 726, 12, 30, 3, 'silver');                                                // chốt khóa lens
    s += T(968, 596, 13, '', 'lbl');
    return s;
  }
  const frontBox = {
    mount: [360, 292, 560, 540], sensor: [515, 475, 250, 170], contacts: [560, 742, 150, 52], reddot: [472, 314, 56, 56],
    release: [925, 497, 86, 86], lockpin: [836, 704, 76, 74], afassist: [188, 240, 64, 64], grip: [50, 200, 340, 660],
    flash: [496, 112, 248, 124], shoe: [510, 84, 220, 36], strap: [20, 280, 60, 90]
  };

  /* ---------------------------- MẶT TRÊN ---------------------------- */
  function top() {
    let s = '';
    s += R(36, 210, 26, 54, 8, 'body2') + R(1178, 210, 26, 54, 8, 'body2');
    s += R(60, 150, 1120, 390, 52, 'body');
    s += R(450, 300, 340, 240, 50, 'body2');
    // đèn flash (gập) ở phía trước cục kính ngắm
    s += R(498, 214, 244, 84, 20, 'body2') + L(520, 238, 720, 238, 'grid') + L(520, 256, 720, 256, 'grid') + L(520, 274, 720, 274, 'grid');
    // đế phụ kiện đa năng
    s += R(520, 338, 200, 130, 10, 'silver') + L(540, 338, 540, 468, 'ln') + L(700, 338, 700, 468, 'ln') + dots(560, 352, 8, 1, 18, 3, 'pin2') + R(560, 410, 120, 36, 6, 'slot');
    // micro + loa
    s += dots(150, 222, 5, 3, 16, 3.2, 'hole') + dots(310, 336, 1, 1, 0, 0, 'hole');
    for (let i = 0; i < 5; i++) s += R(330, 318 + i * 17, 100, 7, 3.5, 'slot');
    // dấu mặt phẳng cảm biến  ⌀
    s += C(826, 486, 15, 'iconline') + L(808, 486, 844, 486, 'iconline') + L(826, 468, 826, 504, 'iconline');
    // vòng chọn chế độ
    s += C(880, 392, 80, 'btn') + knurl(880, 392, 80, 64, 9) + C(880, 392, 66, 'dialtop');
    const lab = ['A+', 'hyb', 'SCN', 'flt', 'P', 'Tv', 'Av', 'M', 'mov'];
    lab.forEach((t, i) => {
      const a = (-90 + i * 40) * Math.PI / 180, x = 880 + Math.cos(a) * 46, y = 392 + Math.sin(a) * 46;
      if (t === 'hyb') s += `<g transform="translate(${x} ${y})"><rect class="iconline" x="-11" y="-8" width="22" height="16" rx="2"/><path class="icon" d="M-3 -4 L5 0 L-3 4Z"/></g>`;
      else if (t === 'flt') s += `<path class="icon" transform="translate(${x} ${y})" d="M0 -11 L3 -3 11 0 3 3 0 11 -3 3 -11 0 -3 -3Z"/>`;
      else if (t === 'mov') s += `<g transform="translate(${x} ${y})"><rect class="iconline" x="-12" y="-7" width="16" height="14" rx="2"/><path class="icon" d="M5 -3 L12 -7 V7 L5 3Z"/></g>`;
      else s += T(x, y + 6, 16, t, 'lbl');
    });
    s += `<path class="icon" d="M880 308 l-8 -14 h16 z"/>`;                           // chấm chỉ
    // vòng điều khiển (control dial)
    s += C(1010, 344, 46, 'btn') + knurl(1010, 344, 46, 30, 8) + C(1010, 344, 26, 'dialtop');
    // nút ISO
    s += R(1084, 308, 70, 38, 12, 'btn') + T(1119, 335, 22, 'ISO');
    // nút quay phim
    s += C(1118, 420, 26, 'btn') + C(1118, 420, 9, 'reddot');
    // nút chụp
    s += C(1092, 232, 50, 'btn') + C(1092, 232, 34, 'btnface');
    return s;
  }
  const topBox = {
    mode: [792, 304, 176, 176], control: [958, 292, 104, 104], iso: [1070, 296, 100, 64], movie: [1080, 382, 76, 76], shutter: [1030, 170, 124, 124],
    shoe: [506, 326, 228, 154], flash: [480, 200, 280, 112], mic: [128, 200, 120, 78], speaker: [316, 304, 130, 112], focal: [794, 454, 64, 64],
    strap: [20, 194, 60, 90]
  };

  /* ---------------------------- MẶT BÊN TRÁI (cổng kết nối) ---------------------------- */
  function side() {
    let s = '';
    s += R(40, 252, 60, 200, 10, 'silver');                                           // ngàm (nhô ra phía trước)
    s += R(90, 150, 530, 400, 50, 'body') + R(300, 66, 240, 100, 36, 'body');
    s += R(440, 150, 150, 380, 24, 'body2');
    // nắp che cổng (mở)
    s += R(310, 250, 150, 190, 14, 'cavity');
    s += C(385, 292, 20, 'jack') + C(385, 292, 9, 'glass');                            // giắc mic 3,5 mm
    s += R(340, 338, 90, 30, 15, 'usbc') + R(352, 346, 66, 14, 7, 'glass');            // USB-C
    s += `<path class="hdmi" d="M345 392 H425 L417 418 H353 Z"/>`;                     // micro HDMI
    s += P('M310 250 L250 270 L250 420 L310 440 Z', 'flap');                           // nắp cao su mở
    s += T(480, 298, 20, 'MIC', 'lbl-dim', 'start') + T(480, 358, 20, 'USB-C', 'lbl-dim', 'start') + T(480, 412, 20, 'HDMI', 'lbl-dim', 'start');
    return s;
  }
  const sideBox = { flap: [230, 230, 250, 230], mic: [340, 262, 90, 60], usbc: [320, 322, 130, 56], hdmi: [320, 376, 130, 52] };

  /* ---------------------------- ỐNG KÍNH (nhìn ngang) ---------------------------- */
  function lens() {
    let s = '';
    s += R(100, 130, 56, 400, 12, 'rubber');                                          // vành ren filter (Ø49)
    s += R(150, 96, 130, 468, 26, 'body2');                                           // vành lấy nét
    for (let i = 0; i < 10; i++) s += L(166 + i * 11, 106, 166 + i * 11, 554, 'knurl');
    s += R(284, 80, 300, 500, 30, 'body');                                            // vành zoom
    for (let i = 0; i < 24; i++) s += L(304 + i * 11.5, 90, 304 + i * 11.5, 570, 'knurl');
    s += T(330, 70, 26, '18', 'lbl') + T(530, 70, 26, '45', 'lbl') + L(330, 76, 330, 90, 'iconline') + L(530, 76, 530, 90, 'iconline');
    s += R(584, 140, 60, 380, 10, 'body2');
    s += R(640, 150, 40, 360, 8, 'silver');                                           // ngàm chrome
    s += C(612, 150, 12, 'redmark');                                                  // chấm đỏ trên lens
    s += R(676, 190, 14, 280, 4, 'gold');                                             // tiếp điểm
    s += T(300, 628, 20, 'RF-S18-45mm F4.5-6.3 IS STM', 'lbl-dim', 'start');
    return s;
  }
  const lensBox = { filter: [80, 110, 100, 440], focusring: [140, 86, 160, 488], zoomring: [276, 70, 320, 520], focal: [300, 30, 270, 80], redmark: [586, 126, 56, 56], contacts: [630, 176, 70, 308], mount: [572, 130, 126, 400] };

  /* ---------------------------- MẶT TRƯỚC ỐNG KÍNH (chữ in quanh kính) ---------------------------- */
  function lensfront() {
    let s = '';
    s += C(320, 320, 300, 'body') + C(320, 320, 262, 'ring2') + C(320, 320, 226, 'rubber');
    s += `<path id="lfpath" d="M320 320 m-244 0 a244 244 0 1 1 488 0 a244 244 0 1 1 -488 0" fill="none"/>`;
    s += `<text class="lbl" font-size="30" letter-spacing="2"><textPath href="#lfpath" startOffset="2%">RF-S18-45mm F4.5-6.3 IS STM</textPath></text>`;
    s += `<text class="lbl-dim" font-size="26"><textPath href="#lfpath" startOffset="73%">Ø49mm</textPath></text>`;
    s += C(320, 320, 168, 'glass') + C(320, 320, 120, 'glass2') + C(320, 320, 60, 'glass3');
    return s;
  }
  const lensfrontBox = { text: [20, 20, 600, 120], full: [20, 20, 600, 600] };

  /* ---------------------------- MÀN HÌNH CHỤP (mô phỏng, minh họa vị trí thông tin) ---------------------------- */
  function screen() {
    let s = '';
    s += R(0, 0, 960, 640, 18, 'glass');
    s += `<path class="shine" d="M0 0 H520 L330 640 H0 Z"/>`;
    // khung nét
    s += R(396, 190, 168, 168, 6, 'afok') + R(430, 230, 100, 100, 6, 'afface');
    s += T(36, 64, 38, 'Av', 'scr', 'start');                                          // chế độ chụp
    s += T(130, 62, 26, 'ONE SHOT', 'scrg', 'start');                                  // chế độ AF
    s += R(836, 34, 62, 28, 5, 'iconline') + R(898, 42, 7, 12, 2, 'icon') + R(840, 38, 40, 20, 3, 'icon'); // pin
    s += T(930, 96, 28, '[1234]', 'scr', 'end');                                       // số ảnh còn lại
    s += T(36, 176, 22, 'L', 'scr', 'start') + T(36, 206, 22, 'RAW', 'scr', 'start');  // chất lượng ảnh
    s += C(60, 262, 20, 'iconline') + C(60, 262, 8, 'icon');                           // chế độ đo sáng
    s += R(40, 316, 36, 22, 3, 'iconline') + R(46, 322, 24, 10, 2, 'iconline');        // chế độ chụp liên tiếp (drive)
    s += T(924, 270, 26, 'AWB', 'scr', 'end');                                         // cân bằng trắng
    s += T(924, 322, 24, 'Auto', 'scr', 'end');                                        // picture style
    s += P('M860 374 q30 -26 62 0 M876 392 q14 -12 30 0', 'iconline');                 // IS
    s += `<path class="icon" transform="translate(930 438)" d="M-8 -12 L2 -12 L-3 -2 L8 -2 L-6 14 L-2 2 L-10 2Z"/>`;  // flash
    s += L(60, 520, 900, 520, 'grid');
    s += T(60, 588, 54, '250', 'scr', 'start');                                        // tốc độ
    s += T(220, 588, 54, 'F5.6', 'scr', 'start');                                      // khẩu độ
    for (let i = -6; i <= 6; i++) s += L(520 + i * 22, 566, 520 + i * 22, i % 3 ? 576 : 584, 'iconline');
    s += P('M520 556 l-7 -10 h14 z', 'icon');                                          // thước phơi sáng
    s += T(760, 588, 54, 'ISO 100', 'scr', 'start');                                   // ISO
    return s;
  }
  const screenBox = {
    mode: [20, 20, 90, 60], afmode: [120, 30, 150, 44], battery: [820, 22, 100, 50], remaining: [810, 66, 124, 40], quality: [26, 150, 90, 74],
    metering: [30, 232, 62, 62], drive: [30, 300, 64, 52], wb: [790, 238, 146, 44], style: [800, 296, 136, 40], is: [850, 354, 84, 60], flash: [900, 410, 60, 58],
    afframe: [380, 176, 200, 200], shutter: [50, 540, 120, 62], aperture: [210, 540, 160, 62], expscale: [366, 536, 308, 60], iso: [750, 540, 212, 62]
  };

  const masters = {
    back: { w: 1240, h: 900, svg: back(), box: backBox, label: 'Mặt sau' },
    front: { w: 1240, h: 900, svg: front(), box: frontBox, label: 'Mặt trước (tháo lens)' },
    top: { w: 1240, h: 600, svg: top(), box: topBox, label: 'Mặt trên (nhìn từ trên xuống, phía trước ở trên)' },
    side: { w: 760, h: 640, svg: side(), box: sideBox, label: 'Cạnh trái (mở nắp cổng)' },
    lens: { w: 760, h: 660, svg: lens(), box: lensBox, label: 'Ống kính RF-S 18-45mm (nhìn ngang, mặt trước ở bên trái)' },
    lensfront: { w: 640, h: 640, svg: lensfront(), box: lensfrontBox, label: 'Mặt trước ống kính' },
    screen: { w: 960, h: 640, svg: screen(), box: screenBox, label: 'Màn hình chụp (minh họa)' }
  };

  const XMLNS = 'http://www.w3.org/2000/svg';
  function mountSymbols() {
    if (document.getElementById('art-symbols')) return;
    const d = document.createElement('div');
    d.id = 'art-symbols';
    d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML = `<svg xmlns="${XMLNS}" width="0" height="0"><defs>` +
      Object.entries(masters).map(([k, m]) => `<symbol id="m-${k}" viewBox="0 0 ${m.w} ${m.h}">${m.svg}</symbol>`).join('') +
      `</defs></svg>`;
    document.body.prepend(d);
  }

  /* Tạo SVG zoom vào 1 bộ phận; tự thêm vòng sáng + làm tối phần còn lại + bản đồ nhỏ định vị */
  function zoom(view, key, opt = {}) {
    const m = masters[view]; const b = m.box[key];
    if (!b) return `<div class="art-missing">Chưa có hình cho ${view}.${key}</div>`;
    const asp = opt.aspect || 1.5;
    const pad = opt.pad || 2.1;
    let W = Math.max(b[2] * pad, b[3] * pad * asp, opt.minW || 300);
    let H = W / asp;
    if (W > m.w) { W = m.w; H = W / asp; }
    if (H > m.h) { H = m.h; W = H * asp; }
    let x = b[0] + b[2] / 2 - W / 2, y = b[1] + b[3] / 2 - H / 2;
    x = Math.max(0, Math.min(m.w - W, x)); y = Math.max(0, Math.min(m.h - H, y));
    const hx = b[0] - 8, hy = b[1] - 8, hw = b[2] + 16, hh = b[3] + 16, sw = Math.max(3, W / 120);
    const dim = `M${x - 5} ${y - 5} h${W + 10} v${H + 10} h-${W + 10} Z M${hx + 14} ${hy} h${hw - 28} a14 14 0 0 1 14 14 v${hh - 28} a14 14 0 0 1 -14 14 h-${hw - 28} a14 14 0 0 1 -14 -14 v-${hh - 28} a14 14 0 0 1 14 -14 Z`;
    const mini = opt.mini === false ? '' :
      `<svg class="mini" viewBox="0 0 ${m.w} ${m.h}" aria-hidden="true"><use href="#m-${view}" width="${m.w}" height="${m.h}"/><rect class="vp" x="${x}" y="${y}" width="${W}" height="${H}" style="stroke-width:${m.w / 36}px"/></svg>`;
    return `<div class="zoomfig"><svg class="zoomsvg" viewBox="${x.toFixed(1)} ${y.toFixed(1)} ${W.toFixed(1)} ${H.toFixed(1)}" role="img" aria-label="${opt.alt || 'Hình phóng to bộ phận'}"><use href="#m-${view}" width="${m.w}" height="${m.h}"/><path class="dimmask" fill-rule="evenodd" d="${dim}"/><rect class="hlring" x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="16" style="stroke-width:${sw}px"/></svg>${mini}</div>`;
  }
  function whole(view, opt = {}) {
    const m = masters[view];
    return `<svg class="wholesvg ${opt.cls || ''}" viewBox="0 0 ${m.w} ${m.h}" role="img" aria-label="${opt.alt || m.label}"><use href="#m-${view}" width="${m.w}" height="${m.h}"/></svg>`;
  }

  window.ART = { masters, zoom, whole, mountSymbols };
})();
