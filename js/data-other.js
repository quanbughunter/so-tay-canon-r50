/* Đáy máy (ảnh thật từ máy bạn gửi), ống kính, màn hình chụp, phụ kiện */
window.CHAPTERS2 = [
{ id:'day', title:'Đáy máy — ảnh thật từ máy của bạn', intro:'Các ảnh dưới đây là ảnh thật, cắt phóng to từ tấm ảnh đáy máy mà bạn gửi. Mình đã làm mờ dãy số serial trong ảnh trước khi đưa lên trang.', plates:[
 { id:'tripod', real:'assets/real/chan-may-tripod.jpg', realCap:'Lỗ ren chân máy trên máy của bạn: sạch, không xước.', name:'Lỗ ren chân máy (Tripod socket)', where:'Giữa đáy máy.',
   marks:[], what:'Lỗ ren để bắt vít chân máy ba chân hoặc gimbal. Chuẩn ren phổ biến 1/4 inch.', use:'Dùng khi chụp đêm, quay phim cố định hoặc hẹn giờ chụp nhóm.',
   test:'Ren không toét, không xước kim loại sáng quanh lỗ. Trên ảnh máy này: lỗ ren sạch, viền không có vết cạy.' },
 { id:'door', real:'assets/real/nap-the-pin-khoa.jpg', realCap:'Nắp thẻ/pin và khóa gạt có chữ CARD/BATT., OPEN, LOCK.', name:'Nắp thẻ nhớ / pin và khóa gạt', where:'Đáy máy, phía báng cầm.',
   marks:['CARD/BATT.','OPEN','LOCK'], what:'Gạt khóa về phía OPEN để mở nắp. Bên trong có pin LP-E17 và khe thẻ SD. Gạt về LOCK để khóa lại.',
   use:'Chỉ mở khi máy đã TẮT và đèn truy cập thẻ không nháy. Thẻ cần là SD/SDHC/SDXC loại UHS-I.',
   test:'Khóa gạt có nấc rõ, nắp đóng khít. Mở nắp xem khoang pin và khe thẻ có sạch, không gỉ.',
   abbr:[['CARD','Thẻ nhớ SD.'],['BATT.','Battery: pin.'],['OPEN / LOCK','Mở / khóa nắp.']] },
 { id:'label', real:'assets/real/nhan-serial-nhan-mac.jpg', realCap:'Nhãn thông số dưới đáy máy. Số serial đã được làm mờ.', name:'Nhãn thông số và số serial', where:'Đáy máy, cạnh lỗ ren chân máy.',
   marks:['CANON INC.','DS126877','MADE IN TAIWAN','9.0V ⎓','EAC','UK CA'],
   what:'Nhãn ghi tên hãng, mã kiểu theo quy định, nơi sản xuất, điện áp cấp vào và các dấu hợp chuẩn. Dãy số bên dưới là số serial (số thân máy).',
   use:'Khi mua, ghi lại serial và đối chiếu với hộp, hóa đơn, thẻ bảo hành.',
   test:'Chữ in rõ, không bị mài hay cạo. Serial trên máy phải khớp serial trên hộp.',
   abbr:[['DS126877','Mã kiểu máy ghi theo quy định (không phải serial của từng máy).'],['MADE IN TAIWAN','Nơi sản xuất.'],['9.0V ⎓','Điện áp 9,0 V dòng một chiều (ký hiệu ⎓ là DC).'],
         ['EAC','Dấu hợp chuẩn của Liên minh Á–Âu (Nga, Belarus, Kazakhstan...).'],['UK CA','Dấu hợp chuẩn của Anh.']] },
 { id:'vn', real:'assets/real/tem-chinh-hang-vn.jpg', realCap:'Tem "Hàng chính hãng - Công ty TNHH Canon Marketing Việt Nam".', name:'Tem chính hãng Canon Marketing Việt Nam', where:'Đáy máy, cạnh trái lỗ ren chân máy.',
   marks:['HÀNG CHÍNH HÃNG','CANON MARKETING VIỆT NAM'], what:'Tem cho biết máy do Canon Marketing Việt Nam phân phối. Thường bảo hành chính hãng áp dụng ở Việt Nam.',
   use:'Nếu bạn dùng máy ở Nga, hãy hỏi kỹ bảo hành có hiệu lực ở đó hay không trước khi tính vào giá.',
   test:'Tem không bong, không dán chồng, chữ in sắc nét. Hỏi chủ máy hóa đơn hoặc thẻ bảo hành đi kèm.' }
]},
{ id:'lens', title:'Ống kính RF-S 18-45mm F4.5-6.3 IS STM', intro:'Ống kit đi kèm máy. Hình bên trái là nhìn ngang (phía trước ở bên trái), có hình mặt trước để đọc chữ in quanh kính.', plates:[
 { id:'lens-text', art:['lensfront','text'], name:'Chữ in quanh mặt kính', where:'Vành tròn quanh phía trước ống kính.',
   marks:['RF-S18-45mm F4.5-6.3 IS STM','Ø49mm'],
   what:'Đây là "tên đầy đủ" của lens: RF-S là loại ngàm cho APS-C, 18-45mm là khoảng zoom, F4.5-6.3 là khẩu độ lớn nhất, IS là chống rung, STM là mô-tơ lấy nét. Ø49mm là đường kính ren gắn filter (hãy đối chiếu chữ in thật trên lens).',
   use:'Mua thêm kính lọc (UV, CPL, ND) thì cần đúng đường kính ghi ở đây.', test:'Chữ rõ, không bị xước mòn. Mặt kính không có xước, nấm mốc, dầu.',
   abbr:[['RF-S','Ngàm RF cho cảm biến APS-C.'],['18-45mm','Tiêu cự zoom từ 18 đến 45 mm (tương đương khoảng 29–72 mm trên full-frame).'],['F4.5-6.3','Khẩu độ lớn nhất: f/4.5 ở 18 mm, giảm dần tới f/6.3 ở 45 mm.'],
         ['IS','Image Stabilizer: chống rung quang học trong lens.'],['STM','Stepping Motor: mô-tơ bước, lấy nét êm, mượt khi quay phim.'],['Ø','Ký hiệu đường kính.']] },
 { id:'filter', art:['lens','filter'], name:'Ren gắn kính lọc (Filter thread)', where:'Mép trước của lens.',
   marks:['Ø49'], what:'Ren để vặn kính lọc như UV (bảo vệ), CPL (giảm phản chiếu), ND (giảm sáng) hoặc nắp trước.', use:'Vặn nắp trước khi không chụp để bảo vệ mặt kính.', test:'Ren không móp, vặn nắp vào trơn tru.' },
 { id:'focusring', art:['lens','focusring'], name:'Vành lấy nét (Focus ring)', where:'Vành hẹp ở phía trước ống kính.',
   marks:[], what:'Xoay để lấy nét bằng tay khi ở chế độ MF. Khi máy đang tự động lấy nét (AF), không chạm vào vành này nếu thấy nó đang xoay.',
   use:'Ống kit không có công tắc AF/MF trên lens, nên chọn AF/MF bằng nút ◄ trên máy hoặc trong menu.', test:'Ở MF, xoay vành: hình trong EVF nét dần mềm mượt, không khựng hay lỏng.' },
 { id:'zoomring', art:['lens','zoomring'], name:'Vành zoom (Zoom ring)', where:'Vành rộng có khía ở thân lens.',
   marks:['18','45'], what:'Xoay để đổi tiêu cự trong khoảng 18–45 mm: 18 mm cho góc rộng, 45 mm "kéo gần" chủ thể.',
   use:'Chụp phong cảnh: xoay về 18 mm. Chụp chân dung: xoay về 35–45 mm.', test:'Xoay trọn hành trình: mượt, không rít, không lỏng, thân lens không rơ.' },
 { id:'lens-focal', art:['lens','focal'], name:'Vạch tiêu cự (Focal length scale)', where:'Trên vành zoom, có các con số.',
   marks:['18','45'], what:'Các con số tiêu cự tính bằng mm. Vạch trắng thẳng hàng với số nào thì lens đang ở tiêu cự đó.', use:'Nhìn nhanh để biết đang ở rộng hay hẹp.', test:'Số in rõ, không mòn.',
   abbr:[['mm','Milimét. Tiêu cự càng nhỏ thì góc nhìn càng rộng.'],['Crop factor ≈ 1,6×','Nhân tiêu cự thực với 1,6 để so với máy full-frame.']] },
 { id:'lens-reddot', art:['lens','redmark'], name:'Chấm đỏ trên lens (Lens mount index)', where:'Gần ngàm kim loại phía sau lens.',
   marks:['●'], what:'Dấu căn lens. Gắn lens: căn chấm đỏ này với chấm đỏ trên thân máy rồi xoay.', use:'Mỗi lần gắn lens.', test:'Chấm đỏ còn rõ màu, không bong.' },
 { id:'lens-contacts', art:['lens','contacts'], name:'Tiếp điểm điện của lens (Lens contacts)', where:'Mặt sau lens, gần ngàm.',
   marks:[], what:'Hàng chân vàng nối điện và dữ liệu giữa lens và thân máy. Không chạm tay vào.', use:'Tháo lens xong thì đậy nắp sau.', test:'Chân vàng sạch, không đen xỉn.' }
]},
{ id:'manhinh', title:'Chữ bạn sẽ thấy trên màn hình', intro:'Khi bật máy, màn hình và EVF hiện nhiều chữ viết tắt. Đây là sơ đồ minh họa vị trí; bố cục thật có thể khác một chút tùy chế độ và lần bấm INFO.', plates:[
 { id:'s-mode', art:['screen','mode'], name:'Chế độ chụp đang dùng', marks:['Av'], what:'Hiện chế độ trên vòng xoay (A+, P, Tv, Av, M...).', test:'Xoay vòng chế độ: chữ này đổi theo.' },
 { id:'s-afmode', art:['screen','afmode'], name:'Cách lấy nét (AF operation)', marks:['ONE SHOT','SERVO'], what:'ONE SHOT: lấy nét một lần rồi khóa, hợp chủ thể đứng yên. SERVO: lấy nét liên tục theo chủ thể di chuyển.', test:'Nửa nhấn nút chụp: khung xanh (ONE SHOT) hoặc xanh dương/bám theo (SERVO).' },
 { id:'s-battery', art:['screen','battery'], name:'Mức pin', marks:[], what:'Biểu tượng pin cho biết mức pin của LP-E17. Khi hết, biểu tượng nhấp nháy.', test:'Pin đầy khi mua? Hỏi chủ máy có mấy cục pin.' },
 { id:'s-remaining', art:['screen','remaining'], name:'Số ảnh còn chụp được', marks:['[1234]'], what:'Số ảnh còn có thể chụp trên thẻ nhớ, tùy dung lượng thẻ và chất lượng ảnh đã chọn.', test:'Cắm thẻ vào: số này hiện ra. Không có thẻ thì không chụp được (nếu bật lựa chọn).' },
 { id:'s-quality', art:['screen','quality'], name:'Chất lượng ảnh (Image quality)', marks:['L','RAW'], what:'L = kích thước ảnh lớn nhất; RAW = ảnh thô nhiều dữ liệu để chỉnh hậu kỳ. Ngoài ra còn JPEG và HEIF; C-RAW là RAW nén.', test:'Bấm Q rồi chọn mục này: đổi được chất lượng ảnh.',
   abbr:[['JPEG','Ảnh đã xử lý/nén; nhẹ, dễ chia sẻ.'],['RAW','Dữ liệu thô từ cảm biến; cần phần mềm để xử lý.'],['C-RAW','RAW nén, dung lượng nhỏ hơn.'],['HEIF','Định dạng ảnh nén hiện đại, nhẹ hơn JPEG.']] },
 { id:'s-metering', art:['screen','metering'], name:'Chế độ đo sáng (Metering)', marks:[], what:'Cách máy đo độ sáng: đánh giá toàn khung (Evaluative), một phần, điểm hoặc trung tâm. Biểu tượng thay đổi theo chế độ.', test:'Bấm Q và chọn mục này để xem các lựa chọn.', abbr:[['AE','Auto Exposure.']] },
 { id:'s-drive', art:['screen','drive'], name:'Chế độ chụp liên tiếp / hẹn giờ (Drive)', marks:[], what:'Biểu tượng cho biết đang chụp từng tấm, chụp liên tiếp hay hẹn giờ.', test:'Bấm ► để đổi và xem biểu tượng thay đổi.' },
 { id:'s-wb', art:['screen','wb'], name:'Cân bằng trắng (White Balance)', marks:['AWB'], what:'Chỉnh màu để vật trắng trông đúng là trắng, không bị ám vàng hay xanh. AWB = Auto White Balance (tự động).', test:'Chuyển giữa nắng và đèn trong nhà: ảnh vẫn không ám màu lạ nếu AWB.', abbr:[['WB','White Balance.'],['AWB','Auto White Balance.']] },
 { id:'s-style', art:['screen','style'], name:'Picture Style', marks:['Auto'], what:'Kiểu xử lý màu sắc, tương phản của ảnh (Auto, Tiêu chuẩn, Chân dung, Phong cảnh, Trung tính, Đơn sắc...).', test:'Bấm Q và chọn Picture Style để xem các kiểu.' },
 { id:'s-is', art:['screen','is'], name:'Chống rung (IS)', marks:[], what:'Biểu tượng cho biết chống rung của lens đang bật. Giúp ảnh bớt nhòe khi cầm tay, nhất là ở tốc độ chậm.', test:'Bật/tắt IS trong menu để so sánh khi xem EVF phóng to.', abbr:[['IS','Image Stabilizer.'],['IBIS','Chống rung bằng dịch chuyển cảm biến trong thân. R50 không có.']] },
 { id:'s-flash', art:['screen','flash'], name:'Flash', marks:[], what:'Biểu tượng tia chớp báo cho bạn biết cần nâng đèn flash (nâng bằng tay).', test:'Chụp trong chỗ tối: biểu tượng nháy.' },
 { id:'s-af', art:['screen','afframe'], name:'Khung lấy nét (AF frame)', marks:[], what:'Khung xanh = đã lấy nét. Khung trắng quanh mặt/người = máy nhận diện được chủ thể (mặt, mắt, thú vật, xe).', test:'Hướng máy vào mặt người: khung nhận diện hiện ra.' },
 { id:'s-shutter', art:['screen','shutter'], name:'Tốc độ màn trập', marks:['250'], what:'250 nghĩa là 1/250 giây. Số càng lớn, màn trập mở càng ngắn: đóng băng chuyển động. Nếu nhấp nháy: có thể ảnh bị rung.', test:'Ở Tv, xoay vòng điều khiển: số này đổi.', abbr:[['1/250','1/250 giây.'],['30"','30 giây (dấu " là giây).']] },
 { id:'s-aperture', art:['screen','aperture'], name:'Khẩu độ (Aperture)', marks:['F5.6'], what:'F5.6 là độ mở của lens. Số F càng nhỏ, lens càng mở rộng, ảnh sáng hơn và nền mờ hơn.', test:'Ở Av, xoay vòng điều khiển: số này đổi.', abbr:[['F / f-number','Tỉ số tiêu cự / đường kính lỗ mở.']] },
 { id:'s-exp', art:['screen','expscale'], name:'Thước phơi sáng (Exposure level)', marks:[], what:'Vạch giữa = phơi sáng chuẩn. Mũi tên lệch phải: ảnh sáng hơn; lệch trái: tối hơn.', test:'Xoay vòng ở chế độ M: mũi tên dịch chuyển.' },
 { id:'s-iso', art:['screen','iso'], name:'ISO', marks:['ISO 100'], what:'Giá trị ISO hiện tại. Có thể hiện ISO AUTO nếu máy tự chọn.', test:'Bấm nút ISO rồi xoay vòng: số đổi.' }
]}
];
window.ACCESSORIES = [
 ['Nắp thân máy (Body cap) R-F-5','Đậy ngàm khi cất máy không lens để chống bụi.'],
 ['Nắp đế phụ kiện (Multi-function shoe cover)','Đậy đế phụ kiện, bảo vệ chân tiếp xúc.'],
 ['Dây đeo (Strap)','Luồn qua hai móc ở hai bên thân máy.'],
 ['Pin LP-E17','Pin sạc đi kèm. Hỏi chủ máy có mấy cục và tình trạng pin.'],
 ['Sạc LC-E17 / LC-E17E','Bộ sạc đi kèm; đầy pin hết ~2 giờ ở nhiệt độ phòng.'],
 ['Thẻ nhớ SD/SDHC/SDXC (UHS-I)','Không kèm theo máy; cần mua riêng. Gạt khóa chống ghi lên vị trí cho phép ghi.']
];
window.CHECK = [
 ['Trước khi gặp',['Xin người bán ảnh/video: mặt trên, mặt sau, mặt trước, đáy, màn hình bật sáng.','Xin số lần chụp (shutter count) kèm ảnh chụp màn hình hoặc một ảnh gốc.','Xin ảnh serial trên máy, trên lens (vành sau) và trên hộp để đối chiếu.']],
 ['Ngoại hình',['Thân máy: không móp, không nứt, ốc không bị cạy.','Lỗ ren chân máy và nắp pin sạch, không xước.','Tem chính hãng còn nguyên, không dán lại.']],
 ['Bật máy lên thử',['Bật/tắt vài lần, máy không treo.','Xoay vòng chế độ qua đủ các nấc.','Nửa nhấn rồi nhấn hết nút chụp; chụp 10 tấm, xem lại.','Quay video 5–10 giây, xem lại có tiếng và hình.']],
 ['Màn hình, kính ngắm, đèn',['Màn hình: mở, xoay đủ hướng; chạm các góc nhạy.','EVF: nhìn vào thấy rõ, chỉnh diop được.','Nâng/hạ flash êm.']],
 ['Ống kính',['Xoay vành zoom và vành lấy nét: mượt.','Mặt kính không nấm, không xước, không dầu.','Chụp ảnh ở 18 mm và 45 mm: nét, không mờ lệch một bên.']],
 ['Cảm biến và ảnh',['Tháo lens, soi đèn: lòng ngàm sạch.','Chụp tường trắng f/16: không có đốm đen.']],
 ['Giấy tờ và phụ kiện',['Hộp, hóa đơn, thẻ bảo hành; hỏi bảo hành có hiệu lực nơi bạn dùng không.','Pin, sạc, dây đeo, nắp thân máy, nắp lens.']]
];
