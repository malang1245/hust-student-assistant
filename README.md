# HUST Student Assistant (React + Vite + Node.js + MySQL)

A web application for managing university courses, schedules, assignments, and exams.

## 1. Project Requirements

- Node.js and npm
- MySQL Server
- React + Vite
- Express.js

## 2. Run the Backend

Open a terminal in the project root:

```bash
cd server
npm install
```

Create the environment file:

```powershell
copy .env.example .env
```

Open `server/.env` and configure your MySQL database password and JWT secret.

Run the database setup:

```bash
npm run setup
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:4000
```

## 3. Run the Frontend

Open a second terminal in the project root:

```bash
npm install
npm run dev
```

Open the application:

```text
http://localhost:5173
```

Register an account and log in to use the application.

## 4. Project Structure

```text
hust-student-assistant/
├── server/
│   ├── .env.example
│   ├── db.js
│   ├── index.js
│   ├── schema.sql
│   ├── setup.js
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Timetable.jsx
│   │   ├── Tasks.jsx
│   │   ├── Exams.jsx
│   │   ├── Courses.jsx
│   │   └── common.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

## 5. Backend Technologies

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcryptjs

## 6. Database

The application uses MySQL with six main tables:

- users
- courses
- schedules
- assignments
- exams
- notifications

Database structure is defined in `server/schema.sql`.

## 7. Languages

The application supports:

- Vietnamese
- English
- Khmer

## 8. Features

- User registration and login
- Dashboard
- Course management
- Timetable management
- Assignment management
- Exam management