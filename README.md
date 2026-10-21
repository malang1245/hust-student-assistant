# HUST Student Assistant (React + Vite)

## Run the project
```
npm install
npm run dev
```
 http://localhost:5173

## Structure

src/App.jsx – Global state, tab bar, language selection

src/components/ – Dashboard, Timetable, Tasks, Exams, Courses (+ shared common.jsx)

src/i18n.js – All Vietnamese / English / Khmer strings. Add new strings here

src/store.js – Data reading/writing (currently using localStorage). Replace with API calls when Express + MySQL backend is available

src/utils.js – Date functions, colors, utility functions
