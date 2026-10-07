import { useState } from 'react'
import { useT } from '../i18n'
import { diff, fmtDate } from '../utils'

export const courseOf = (data, id, t) =>
  data.courses.find((c) => c.id === id) || { name: t('gone'), color: '#888' }
export const cname = (c, t) => (c.sk ? t(c.sk) : c.name)

export function Chip({ data, id }) {
  const t = useT()
  const c = courseOf(data, id, t)
  return <span className="chip" style={{ '--c': c.color }}>{cname(c, t)}</span>
}

export function DueTag({ n }) {
  const t = useT()
  if (n < 0) return <span className="tag late">{t('late', -n)}</span>
  if (n === 0) return <span className="tag late">{t('today')}</span>
  if (n <= 2) return <span className="tag soon">{n === 1 ? t('tmr') : t('left', n)}</span>
  return <span className="tag ok">{t('left', n)}</span>
}

export function DelBtn({ onClick }) {
  const t = useT()
  return <button type="button" className="x" onClick={onClick} aria-label={t('del')}>×</button>
}

export function NeedCourse({ data }) {
  const t = useT()
  return data.courses.length ? null : <p className="empty">{t('needC')}</p>
}

export function CourseOptions({ data }) {
  const t = useT()
  return data.courses.map((c) => <option key={c.id} value={c.id}>{cname(c, t)}</option>)
}

// Đọc dữ liệu form, ngăn reload trang; trả về [dữ liệu, hàm reset form]
export function readForm(e) {
  e.preventDefault()
  const f = e.currentTarget
  return [Object.fromEntries(new FormData(f)), () => f.reset()]
}

export function TaskRow({ data, task: x, actions }) {
  const t = useT()
  const [editing, setEditing] = useState(false)

  if (editing) {
    const save = (e) => {
      const [d] = readForm(e)
      if (!d.course) return alert(t('errC'))
      // sk: null để bài tập mẫu chuyển thành bài tập do người dùng đặt tên
      actions.update('tasks', x.id, { title: d.title, course: d.course, due: d.due, sk: null })
      setEditing(false)
    }
    return (
      <div className="row">
        <form className="rowform" onSubmit={save}>
          <label style={{ flex: '2 1 200px' }}>{t('title')}<input name="title" defaultValue={x.sk ? t(x.sk) : x.title} required /></label>
          <label>{t('course')}<select name="course" defaultValue={x.course} required><CourseOptions data={data} /></select></label>
          <label>{t('due')}<input type="date" name="due" defaultValue={x.due} required /></label>
          <button className="btn">{t('save')}</button>
          <button type="button" className="btn ghost" onClick={() => setEditing(false)}>{t('cancel')}</button>
        </form>
      </div>
    )
  }

  return (
    <div className={'row' + (x.done ? ' done' : '')}>
      <input type="checkbox" checked={x.done} onChange={() => actions.toggle(x.id)} aria-label={t('mark')} />
      <div>
        <b>{x.sk ? t(x.sk) : x.title}</b><br />
        <Chip data={data} id={x.course} />
        <small>{t('dueS')} {fmtDate(x.due)}</small>
      </div>
      {!x.done && <DueTag n={diff(x.due)} />}
      <button type="button" className="x ed" onClick={() => setEditing(true)} aria-label={t('edit')}>✎</button>
      <DelBtn onClick={() => actions.remove('tasks', x.id)} />
    </div>
  )
}

export function ExamRow({ data, exam: e, actions }) {
  const t = useT()
  const n = diff(e.date)
  return (
    <div className="row">
      <div>
        <b><Chip data={data} id={e.course} /></b>
        <small>{fmtDate(e.date)} · {e.time}{e.room ? ' · ' + e.room : ''}</small>
      </div>
      {n >= 0 ? <DueTag n={n} /> : <span className="tag">{t('past')}</span>}
      <DelBtn onClick={() => actions.remove('exams', e.id)} />
    </div>
  )
}
