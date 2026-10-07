# HUST Student Assistant (React + Vite)

## Chạy dự án
```
npm install
npm run dev
```
Mở http://localhost:5173

## Cấu trúc
- `src/App.jsx` – state chung, thanh tab, chọn ngôn ngữ
- `src/components/` – Dashboard, Timetable, Tasks, Exams, Courses (+ common.jsx dùng chung)
- `src/i18n.js` – toàn bộ chuỗi Việt / Anh / Khmer. Thêm chuỗi mới ở đây
- `src/store.js` – đọc/ghi dữ liệu (đang dùng localStorage). Thay bằng gọi API khi có backend Express + MySQL
- `src/utils.js` – hàm ngày tháng, màu, tiện ích
