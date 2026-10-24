import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from './db.js'

const SECRET = process.env.JWT_SECRET
if (!SECRET) {
  console.error('Thiếu JWT_SECRET trong file .env (xem .env.example)')
  process.exit(1)
}

const COLORS = ['#2b59c3', '#0f9d58', '#d97706', '#7c3aed', '#0891b2', '#c2410c']
const app = express()
app.use(cors())
app.use(express.json())

// ---------- tiện ích ----------
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next)
const fail = (res, status, code) => res.status(status).json({ error: code })
const isTime = (s) => /^\d{2}:\d{2}$/.test(s)
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s)
const sign = (id) => jwt.sign({ id }, SECRET, { expiresIn: '7d' })
const hhmm = (s) => String(s).slice(0, 5)

function auth(req, res, next) {
  const h = req.headers.authorization || ''
  try {
    req.userId = jwt.verify(h.startsWith('Bearer ') ? h.slice(7) : '', SECRET).id
    next()
  } catch {
    fail(res, 401, 'errAuth')
  }
}

// môn học phải thuộc về người dùng đang đăng nhập
const owns = async (courseId, userId) => {
  const [r] = await pool.query('SELECT id FROM courses WHERE id = ? AND user_id = ?', [courseId, userId])
  return r.length > 0
}

// ---------- xác thực ----------
app.post('/api/auth/register', wrap(async (req, res) => {
  const name = String(req.body.name || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return fail(res, 400, 'errGeneric')
  if (password.length < 6) return fail(res, 400, 'errShort')
  const [dup] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
  if (dup.length) return fail(res, 409, 'errEmail')
  const hash = await bcrypt.hash(password, 10)
  const [r] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hash])
  res.json({ token: sign(r.insertId), user: { id: r.insertId, name, email } })
}))

app.post('/api/auth/login', wrap(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')
  const [rows] = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email])
  const u = rows[0]
  if (!u || !(await bcrypt.compare(password, u.password_hash))) return fail(res, 401, 'errLogin')
  res.json({ token: sign(u.id), user: { id: u.id, name: u.name, email: u.email } })
}))

app.get('/api/auth/me', auth, wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [req.userId])
  if (!rows[0]) return fail(res, 401, 'errAuth')
  res.json({ user: rows[0] })
}))

// ---------- toàn bộ dữ liệu của người dùng ----------
app.get('/api/data', auth, wrap(async (req, res) => {
  const u = req.userId
  const [courses] = await pool.query(
    'SELECT id, course_code AS code, course_name AS name, color FROM courses WHERE user_id = ? ORDER BY id', [u])
  const [sessions] = await pool.query(
    'SELECT s.id, s.course_id AS course, s.`day` AS `day`, s.start_time AS `start`, s.end_time AS `end`, s.room ' +
    'FROM schedules s JOIN courses c ON c.id = s.course_id WHERE c.user_id = ? ORDER BY s.id', [u])
  const [tasks] = await pool.query(
    "SELECT a.id, a.course_id AS course, a.title, a.deadline AS due, (a.status = 'done') AS done " +
    'FROM assignments a JOIN courses c ON c.id = a.course_id WHERE c.user_id = ? ORDER BY a.id', [u])
  const [exams] = await pool.query(
    'SELECT e.id, e.course_id AS course, e.exam_date AS `date`, e.exam_time AS `time`, e.room ' +
    'FROM exams e JOIN courses c ON c.id = e.course_id WHERE c.user_id = ? ORDER BY e.id', [u])
  res.json({
    courses,
    sessions: sessions.map((s) => ({ ...s, start: hhmm(s.start), end: hhmm(s.end), room: s.room || '' })),
    tasks: tasks.map((t) => ({ ...t, done: Boolean(t.done) })),
    exams: exams.map((e) => ({ ...e, time: hhmm(e.time), room: e.room || '' })),
  })
}))

// ---------- môn học ----------
app.post('/api/courses', auth, wrap(async (req, res) => {
  const name = String(req.body.name || '').trim()
  if (!name) return fail(res, 400, 'errGeneric')
  const [[{ n }]] = await pool.query('SELECT COUNT(*) AS n FROM courses WHERE user_id = ?', [req.userId])
  const [r] = await pool.query('INSERT INTO courses (user_id, course_name, color) VALUES (?, ?, ?)',
    [req.userId, name, COLORS[n % COLORS.length]])
  res.json({ id: r.insertId })
}))
app.put('/api/courses/:id', auth, wrap(async (req, res) => {
  const name = String(req.body.name || '').trim()
  if (!name) return fail(res, 400, 'errGeneric')
  await pool.query('UPDATE courses SET course_name = ? WHERE id = ? AND user_id = ?', [name, req.params.id, req.userId])
  res.json({ ok: true })
}))
app.delete('/api/courses/:id', auth, wrap(async (req, res) => {
  await pool.query('DELETE FROM courses WHERE id = ? AND user_id = ?', [req.params.id, req.userId])
  res.json({ ok: true })
}))

// ---------- buổi học ----------
app.post('/api/sessions', auth, wrap(async (req, res) => {
  const { course, day, start, end } = req.body
  const room = String(req.body.room || '').trim().slice(0, 50) || null
  if (!(await owns(course, req.userId))) return fail(res, 400, 'errGeneric')
  if (!(Number.isInteger(+day) && +day >= 0 && +day <= 6) || !isTime(start) || !isTime(end) || end <= start)
    return fail(res, 400, 'errGeneric')
  const [r] = await pool.query(
    'INSERT INTO schedules (course_id, `day`, start_time, end_time, room) VALUES (?, ?, ?, ?, ?)',
    [course, +day, start, end, room])
  res.json({ id: r.insertId })
}))
app.delete('/api/sessions/:id', auth, wrap(async (req, res) => {
  await pool.query('DELETE s FROM schedules s JOIN courses c ON c.id = s.course_id WHERE s.id = ? AND c.user_id = ?',
    [req.params.id, req.userId])
  res.json({ ok: true })
}))

// ---------- bài tập ----------
app.post('/api/tasks', auth, wrap(async (req, res) => {
  const { course, due } = req.body
  const title = String(req.body.title || '').trim().slice(0, 255)
  if (!title || !isDate(due) || !(await owns(course, req.userId))) return fail(res, 400, 'errGeneric')
  const [r] = await pool.query('INSERT INTO assignments (course_id, title, deadline) VALUES (?, ?, ?)', [course, title, due])
  res.json({ id: r.insertId })
}))
app.put('/api/tasks/:id', auth, wrap(async (req, res) => {
  const { course, due } = req.body
  const title = String(req.body.title || '').trim().slice(0, 255)
  if (!title || !isDate(due) || !(await owns(course, req.userId))) return fail(res, 400, 'errGeneric')
  await pool.query(
    'UPDATE assignments a JOIN courses c ON c.id = a.course_id SET a.title = ?, a.course_id = ?, a.deadline = ? ' +
    'WHERE a.id = ? AND c.user_id = ?', [title, course, due, req.params.id, req.userId])
  res.json({ ok: true })
}))
app.patch('/api/tasks/:id/toggle', auth, wrap(async (req, res) => {
  await pool.query(
    "UPDATE assignments a JOIN courses c ON c.id = a.course_id SET a.status = IF(a.status = 'done', 'pending', 'done') " +
    'WHERE a.id = ? AND c.user_id = ?', [req.params.id, req.userId])
  res.json({ ok: true })
}))
app.delete('/api/tasks/:id', auth, wrap(async (req, res) => {
  await pool.query('DELETE a FROM assignments a JOIN courses c ON c.id = a.course_id WHERE a.id = ? AND c.user_id = ?',
    [req.params.id, req.userId])
  res.json({ ok: true })
}))

// ---------- lịch thi ----------
app.post('/api/exams', auth, wrap(async (req, res) => {
  const { course, date, time } = req.body
  const room = String(req.body.room || '').trim().slice(0, 50) || null
  if (!isDate(date) || !isTime(time) || !(await owns(course, req.userId))) return fail(res, 400, 'errGeneric')
  const [r] = await pool.query('INSERT INTO exams (course_id, exam_date, exam_time, room) VALUES (?, ?, ?, ?)',
    [course, date, time, room])
  res.json({ id: r.insertId })
}))
app.delete('/api/exams/:id', auth, wrap(async (req, res) => {
  await pool.query('DELETE e FROM exams e JOIN courses c ON c.id = e.course_id WHERE e.id = ? AND c.user_id = ?',
    [req.params.id, req.userId])
  res.json({ ok: true })
}))

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use((err, req, res, next) => {
  console.error(err)
  fail(res, 500, 'errGeneric')
})

const port = Number(process.env.PORT || 4000)
app.listen(port, () => console.log(`Backend đang chạy tại http://localhost:${port}`))
