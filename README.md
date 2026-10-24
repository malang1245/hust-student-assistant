# HUST Student Assistant (React + Node.js + MySQL)

## 1. Backend (thư mục `server/`)
```
cd server
npm install
copy .env.example .env      (Windows)   # rồi mở .env, điền DB_PASSWORD và JWT_SECRET
npm run setup               # tạo database + 6 bảng (chỉ chạy một lần)
npm run dev                 # chạy backend tại http://localhost:4000
```

## 2. Frontend (thư mục gốc)
Mở một terminal khác:
```
npm install
npm run dev
```
Mở http://localhost:5173, đăng ký tài khoản rồi dùng.

## Cấu trúc
- `src/` – giao diện React (App, components, i18n Việt/Anh/Khmer, api.js gọi backend)
- `server/index.js` – REST API (Express, JWT, bcrypt)
- `server/schema.sql` – thiết kế 6 bảng: users, courses, schedules, assignments, exams, notifications
- `server/setup.js` – tạo database từ schema.sql
