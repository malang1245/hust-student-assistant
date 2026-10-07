import { COLORS, uid, addDays, todayIdx } from './utils'

const KEY = 'hust-student-assistant-v3'

export function seed() {
  const c = ['c1', 'c2', 'c3'].map((sk, i) => ({ id: uid(), sk, color: COLORS[i] }))
  return {
    courses: c,
    sessions: [
      { id: uid(), course: c[0].id, day: todayIdx, start: '07:00', end: '09:30', room: 'D3-301' },
      { id: uid(), course: c[1].id, day: todayIdx, start: '13:00', end: '15:30', room: 'D5-202' },
      { id: uid(), course: c[2].id, day: (todayIdx + 2) % 7, start: '09:45', end: '12:15', room: 'D9-101' },
    ],
    tasks: [
      { id: uid(), course: c[0].id, sk: 'k1', due: addDays(2), done: false },
      { id: uid(), course: c[2].id, sk: 'k2', due: addDays(5), done: false },
      { id: uid(), course: c[1].id, sk: 'k3', due: addDays(-1), done: false },
    ],
    exams: [{ id: uid(), course: c[1].id, date: addDays(14), time: '09:00', room: 'D3-101' }],
  }
}

// Lớp lưu trữ: hiện dùng localStorage.
// Khi có backend (Express + MySQL), thay hai hàm này bằng fetch() tới API.
export const loadData = () => {
  try {
    const s = localStorage.getItem(KEY)
    if (s) return JSON.parse(s)
  } catch {}
  return seed()
}
export const saveData = (d) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(d))
  } catch {}
}
