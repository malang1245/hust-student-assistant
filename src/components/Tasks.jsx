import { useT } from '../i18n'
import { addDays, byDue } from '../utils'
import { CourseOptions, NeedCourse, readForm, TaskRow } from './common'

export default function Tasks({ data, actions }) {
  const t = useT()
  const list = [...data.tasks].sort((a, b) => a.done - b.done || byDue(a, b))

  const submit = (e) => {
    const [d, reset] = readForm(e)
    if (!d.course) return alert(t('errC'))
    actions.add('tasks', { ...d, done: false })
    reset()
  }

  return (
    <>
      <div className="card">
        <h3>{t('addT')}</h3>
        <NeedCourse data={data} />
        <form onSubmit={submit}>
          <label style={{ flex: '2 1 220px' }}>{t('title')}<input name="title" required /></label>
          <label>{t('course')}<select name="course" required><CourseOptions data={data} /></select></label>
          <label>{t('due')}<input type="date" name="due" defaultValue={addDays(3)} required /></label>
          <button className="btn">{t('addT')}</button>
        </form>
      </div>
      <div className="card">
        {list.length === 0 && <p className="empty">{t('noTask')}</p>}
        {list.map((x) => <TaskRow key={x.id} data={data} task={x} actions={actions} />)}
      </div>
    </>
  )
}
