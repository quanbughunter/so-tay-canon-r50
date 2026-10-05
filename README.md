# Sổ tay Canon EOS R50 cho người mới

Trang web tiếng Việt giải thích **Canon EOS R50 + RF-S 18-45mm F4.5-6.3 IS STM** từ số 0:

- Từng nút, từng bộ phận trên thân máy và ống kính: là gì, dùng khi nào, cách thử khi mua máy cũ (có ô đánh dấu "đã thử").
- Chữ in trên máy (MENU, INFO, Q/SET, CARD/BATT., EAC, UK CA...) và chữ hiện trên màn hình (ISO, AWB, ONE SHOT...).
- **Phòng thí nghiệm ảnh**: chỉnh khẩu độ, tốc độ màn trập, ISO, tiêu cự và xem ảnh thay đổi; có thể nạp ảnh thật của bạn.
- Danh sách kiểm tra khi đi xem máy cũ, từ điển viết tắt, bài kiểm tra nhỏ.

Tên bộ phận và chức năng theo hướng dẫn chính thức của Canon (Advanced User Guide EOS R50).

**Xem trực tuyến:** https://quanbughunter.github.io/so-tay-canon-r50/

## Xem trang

Mở `index.html` bằng trình duyệt (cần mạng nếu muốn tải font; không có mạng vẫn dùng được với font hệ thống).
Hoặc mở `dist/so-tay-canon-r50-mot-file.html`, bản gộp một file duy nhất (tạo lại bằng `python3 build_single.py`).

## Đưa lên GitHub Pages

```bash
git init
git add .
git commit -m "Sổ tay Canon EOS R50"
git branch -M main
git remote add origin https://github.com/quanbughunter/so-tay-canon-r50.git
git push -u origin main
```

Sau đó vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`.
Trang sẽ ở `https://quanbughunter.github.io/so-tay-canon-r50/`.

## Thay hình minh họa bằng ảnh thật

Các hình zoom trong phần Mặt trên/trước/sau/cổng/lens hiện là **sơ đồ minh họa vẽ bằng vector** (vị trí gần đúng).
Phần **Đáy máy** dùng ảnh thật (cắt từ ảnh chụp đáy một máy R50, số serial đã làm mờ).

Khi có ảnh cận cảnh thật của từng bộ phận:

1. Chép ảnh vào `assets/real/`, ví dụ `assets/real/menu.jpg`.
2. Mở `js/real-photos.js` và khai báo, khóa là `id` của bộ phận (xem `js/data-body.js`):

```js
window.REAL = { menu: 'assets/real/menu.jpg', mode: 'assets/real/mode-dial.jpg' };
```

## Cấu trúc

```
index.html              trang chính
css/style.css           giao diện
js/camera-art.js        sơ đồ vector + phóng to từng bộ phận
js/data-body.js         nội dung: mặt trên, trước, sau, cổng
js/data-other.js        nội dung: đáy máy, lens, màn hình, phụ kiện, checklist
js/glossary-data.js     từ điển và bài kiểm tra
js/sim.js               phòng thí nghiệm ảnh
js/app.js               ghép trang
assets/real/            ảnh thật
```
