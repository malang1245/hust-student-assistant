export const COLORS = ['#2b59c3', '#0f9d58', '#d97706', '#7c3aed', '#0891b2', '#c2410c']
export const uid = () => Math.random().toString(36).slice(2, 9)
export const iso = (d) =>
  d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return iso(d)
}
export const diff = (s) =>
  Math.round((new Date(s + 'T00:00:00') - new Date(iso(new Date()) + 'T00:00:00')) / 864e5)
export const todayIdx = (new Date().getDay() + 6) % 7 // 0 = Thứ 2
export const fmtDate = (s) => {
  const [y, m, d] = s.split('-')
  return `${d}/${m}/${y}`
}
export const byDue = (a, b) => a.due.localeCompare(b.due)
export const DAY_IDS = [0, 1, 2, 3, 4, 5, 6]
