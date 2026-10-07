import { useT } from '../i18n'
import { addDays } from '../utils'
import { CourseOptions, ExamRow, NeedCourse, readForm } from './common'

export default function Exams({ data, actions }) {
  const t = useT()
  const list = [...data.exams].sort((a, b) => a.date.localeCompare(b.date))

  const submit = (e) => {
    const [d, reset] = readForm(e)
    if (!d.course) return alert(t('errC'))
    actions.add('exams', d)
    reset()
  }

  return (
    <>
      <div className="card">
        <h3>{t('addE')}</h3>
        <NeedCourse data={data} />
        <form onSubmit={submit}>
          <label>{t('course')}<select name="course" required><CourseOptions data={data} /></select></label>
          <label>{t('eDate')}<input type="date" name="date" defaultValue={addDays(14)} required /></label>
          <label>{t('time')}<input type="time" name="time" defaultValue="09:00" required /></label>
          <label>{t('room')}<input name="room" /></label>
          <button className="btn">{t('addE')}</button>
        </form>
      </div>
      <div className="card">
        {list.length === 0 && <p className="empty">{t('noExam')}</p>}
        {list.map((e) => <ExamRow key={e.id} data={data} exam={e} actions={actions} />)}
      </div>
    </>
  )
}
