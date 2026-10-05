/* Chọn máy cho người mới, tầm 15–20 triệu cho bộ thân + ống kit.
   GIÁ THAM KHẢO, xem ngày 05/10/2026. Giá đổi theo khuyến mãi từng tuần: kiểm tra lại trước khi mua.
   Đơn vị: triệu đồng (tr) cho Việt Nam, rúp (₽) cho Moscow.
   Muốn cập nhật: sửa số trong mảng BUY.models rồi chạy lại build_single.py. */
window.BUY = {
  asof: '05/10/2026',
  rub: 307,            // 1 ₽ ≈ 307 đ (tỷ giá chính thức Ngân hàng Trung ương Nga ngày 03/10/2026: 10.000 đ = 32,57 ₽)
  rubSrc: 'Ngân hàng Trung ương Nga, 03/10/2026',
  groups: [
    { id: 'nen', title: 'Nên mua', note: 'Có kính ngắm, ngàm ống kính còn được phát triển, giá vừa túi tiền.' },
    { id: 'video', title: 'Hợp quay video hơn chụp ảnh', note: 'Không có kính ngắm. Chụp ngoài nắng phải nhìn màn hình, khó hơn cho người học chụp ảnh.' },
    { id: 'khong', title: 'Không khuyên cho người mới lúc này', note: 'Hệ máy đã dừng phát triển, hoặc vượt ngân sách.' }
  ],
  models: [
    { g: 'nen', name: 'Canon EOS R50', kit: 'RF-S 18-45mm', year: 2023, evf: true, screen: 'Xoay lật, cảm ứng', mount: 'RF (Canon đang phát triển)', alive: true,
      vnNew: [17.49, 17.89], vnUsed: [15.0, 15.5], ru: 'Mới khoảng 60.000 ₽ (Pixel24)',
      pros: ['Cân bằng nhất cho người mới: kính ngắm, màn xoay cảm ứng, lấy nét nhận diện mắt/người tốt', 'Menu có chế độ hướng dẫn, dễ học', 'Sổ tay này viết cho chính máy này'],
      cons: ['Pin LP-E17 nhỏ, nên mua thêm 1 pin', 'Không chống rung trên thân (chỉ có IS trong ống kit)'],
      fit: 'Người mới muốn học chụp ảnh lẫn quay phim, không muốn đổi máy sớm.' },
    { g: 'nen', name: 'Sony A6400', kit: 'E 16-50mm PZ', year: 2019, evf: true, screen: 'Lật lên 180°, cảm ứng hạn chế', mount: 'E (rất nhiều ống kính, kể cả hãng thứ ba)', alive: true,
      vnNew: [18.99, 18.99], vnUsed: [12.5, 17.5], ru: null,
      pros: ['Lấy nét bám chủ thể nhanh nhất nhóm', 'Ngàm E có nhiều ống kính cũ giá rẻ'],
      cons: ['Pin NP-FW50 nhỏ', 'Ống kit 16-50 cho ảnh bình thường', 'Menu khó hơn Canon với người mới'],
      fit: 'Người hay chụp trẻ em, thú cưng, thể thao; chịu học menu.' },
    { g: 'nen', name: 'Canon EOS R100', kit: 'RF-S 18-45mm', year: 2023, evf: true, screen: 'Cố định, không cảm ứng', mount: 'RF (Canon đang phát triển)', alive: true,
      vnNew: [12.9, 12.99], vnUsed: [10.5, 11.5], ru: 'Mới 41.500–51.600 ₽ (Fotosklad, Pixel24, Onlinetrade)',
      pros: ['Rẻ nhất mà vẫn có kính ngắm và ngàm RF', 'Tiền dư 4–5 triệu đủ mua thêm ống RF 50mm f/1.8 để xóa phông'],
      cons: ['Màn hình không xoay, không chạm để lấy nét', 'Quay 4K bị cắt khung, lấy nét chậm', 'Chụp liên tiếp chậm'],
      fit: 'Chủ yếu chụp ảnh, muốn tiết kiệm để mua thêm ống kính.' },
    { g: 'nen', name: 'Nikon Z50', kit: 'Z DX 16-50mm VR', year: 2019, evf: true, screen: 'Lật xuống, cảm ứng', mount: 'Z (Nikon đang phát triển)', alive: true,
      vnNew: [22.49, 22.49], vnUsed: [13, 16], usedNote: 'ước lượng, ít tin bán rõ ràng',
      ru: null,
      pros: ['Báng cầm chắc tay, kính ngắm rõ', 'Ống kit 16-50 VR gọn, có chống rung'],
      cons: ['Mua mới vượt ngân sách; giá máy cũ chênh nhau nhiều', 'Màn lật xuống bị chân máy che', 'Ít ống APS-C giá rẻ hơn Canon/Sony'],
      fit: 'Người tìm được máy cũ tốt giá dưới 16 triệu.' },

    { g: 'video', name: 'Sony ZV-E10', kit: 'E 16-50mm PZ', year: 2021, evf: false, screen: 'Xoay lật, cảm ứng', mount: 'E', alive: true,
      vnNew: [16.19, 16.19], vnUsed: [12.9, 13.5], ru: 'Mới khoảng 70.000 ₽ (Pixel24)',
      pros: ['Có cổng micro, màn xoay ra trước để tự quay', 'Ngàm E nhiều ống kính'],
      cons: ['Không kính ngắm', 'Méo hình khi lia nhanh (rolling shutter), nóng máy khi quay 4K lâu', 'Pin nhỏ'],
      fit: 'Người làm vlog, quay TikTok/YouTube là chính.' },
    { g: 'video', name: 'Nikon Z30', kit: 'Z DX 16-50mm VR', year: 2022, evf: false, screen: 'Xoay lật, cảm ứng', mount: 'Z', alive: true,
      vnNew: [17.99, 19.19], vnUsed: [17, 17], usedNote: 'rất ít tin bán', ru: 'Mới khoảng 56.000 ₽ (Pixel24)',
      pros: ['Gọn nhẹ, quay video tốt'],
      cons: ['Không kính ngắm, pin nhỏ', 'Cùng tiền thì R50 có thêm kính ngắm'],
      fit: 'Quay video là chính, thích hệ Nikon.' },
    { g: 'video', name: 'Canon EOS R50 V', kit: 'RF-S 14-30mm PZ', year: 2025, evf: false, screen: 'Xoay lật, cảm ứng', mount: 'RF', alive: true,
      vnNew: [19.99, 19.99], newNote: 'giá khuyến mãi ở WinWinStore, giá gốc 26,99 tr', vnUsed: null, ru: null,
      pros: ['Ống kit góc rộng 14 mm hợp tự quay', 'Thiết kế cho quay dọc, livestream'],
      cons: ['Không kính ngắm', 'Giá chỉ vừa ngân sách khi có khuyến mãi'],
      fit: 'Người chỉ quay video, cần góc rộng.' },

    { g: 'khong', name: 'Canon EOS M100 / M200 / M50 Mark II', kit: 'EF-M 15-45mm', year: '2017–2020', evf: 'M50 II có, M100/M200 không', screen: 'Lật/xoay, cảm ứng', mount: 'EF-M — Canon đã dừng cả hệ từ 10/2023', alive: false,
      vnNew: null, vnUsed: [11.5, 16], usedNote: 'M50 Mark II cũ', ru: 'Cửa hàng máy cũ: M100 kit 30.000–42.000 ₽, thân 25.000 ₽; M50 kit 35.000–42.600 ₽',
      pros: ['Nhỏ, rẻ'],
      cons: ['Ngàm EF-M không còn ống kính mới; ống RF không lắp được', 'M100: không kính ngắm, không quay 4K, không cổng micro, pin khoảng 295 ảnh', 'Cùng tiền có thể mua R100 mới'],
      fit: 'Chỉ nên mua khi rất rẻ và chấp nhận không nâng cấp ống kính.' },
    { g: 'khong', name: 'Fujifilm X-T30 / X-T30 II / X-M5', kit: 'XC 15-45mm', year: '2019–2024', evf: 'X-T30 có, X-M5 không', screen: 'Lật', mount: 'X', alive: true,
      vnNew: [25.59, 29.5], vnUsed: [19.5, 26], usedNote: 'X-T30 đời đầu cũ 19,5–21,5 tr; X-T30 II cũ khoảng 26 tr', ru: null,
      pros: ['Màu ảnh (giả lập phim) rất được ưa chuộng'],
      cons: ['Vượt ngân sách: Fuji cũ ở Việt Nam bị đẩy giá cao'],
      fit: 'Để dành khi có ngân sách trên 20 triệu.' },
    { g: 'khong', name: 'Canon R10, Nikon Z50 II, Sony ZV-E10 II', kit: 'kit đi kèm', year: '2022–2024', evf: 'R10, Z50 II có; ZV-E10 II không', screen: '', mount: 'RF / Z / E', alive: true,
      vnNew: [21.49, 28.46], vnUsed: [19.49, 23.99], ru: null,
      pros: ['Mạnh hơn R50 một bậc'],
      cons: ['Vượt ngân sách 15–20 triệu'],
      fit: 'Khi ngân sách tăng lên 21–28 triệu.' }
  ],
  sources: [
    ['zShop: R50, R100, R10, A6400, Z30, ZV-E10 (mới và cũ)', 'https://zshop.vn/canon-eos-r50-kit-18-45mm.html'],
    ['Máy Ảnh City: R50 cũ 15,49 tr, Z30 mới', 'https://mayanhcity.com/products/canon-eos-r50-kit-18-45mm-hang-cu-html'],
    ['Bình Minh Digital: R50 mới', 'https://binhminhdigital.com/canon-eos-r50-kit-18-45mm-is-stm-lbm.html'],
    ['Kyma: R50, R100, X-T30 III', 'https://kyma.vn/may-anh-canon-eos-r50-kit-rfs18-45mm-f45-63-is-stm.html'],
    ['Khánh Long: ZV-E10, ZV-E10 II, Z50, Z50 II, X-M5', 'https://khanhlong.com/sony-zv-e10-kit-16-50mm-den-chinh-hang'],
    ['Máy ảnh Top1, Máy ảnh cũ, Chợ Tốt: giá máy cũ', 'https://www.chotot.com/tags/mua-ban-may-anh-may-quay/may-anh-sony-a6400'],
    ['Pixel24, FOTOCCCP, Fotosklad (Moscow): giá ở Nga', 'https://pixel24.ru/vcd-1585/catalog.html'],
    ['Canon dừng hệ EOS M / EF-M (DPReview, 10/2023)', 'https://www.dpreview.com/news/1138973177/canon-officially-discontinues-eos-m-cameras-ef-m-system/'],
    ['Tỷ giá chính thức rúp (Ngân hàng Trung ương Nga)', 'https://www.cbr.ru/currency_base/daily/']
  ]
};
