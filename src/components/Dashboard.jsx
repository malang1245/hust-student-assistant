import { useT } from '../i18n'
import { byDue, diff, todayIdx } from '../utils'
import { courseOf, cname, TaskRow, ExamRow } from './common'

export default function Dashboard({ data, actions }) {
  const t = useT()
  const pend = data.tasks.filter((x) => !x.done).sort(byDue)
  const ex = data.exams.filter((e) => diff(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))
  const today = data.sessions.filter((s) => s.day === todayIdx).sort((a, b) => a.start.localeCompare(b.start))
  const stats = [
    [today.length, 'sToday'], [pend.length, 'sPend'], [ex.length, 'sExam'], [data.courses.length, 'sCourse'],
  ]
  return (
    <>
      <div className="stats">
        {stats.map(([n, k]) => (
          <div className="card" key={k}><b>{n}</b><span>{t(k)}</span></div>
        ))}
      </div>
      <div className="two">
        <div className="card">
          <h3>{t('todayT')} ({t('d' + todayIdx)})</h3>
          {today.length === 0 && <p className="empty">{t('noClass')}</p>}
          {today.map((s) => (
            <div className="row" key={s.id}>
              <div>
                <b>{cname(courseOf(data, s.course, t), t)}</b><br />
                <small>{s.start}–{s.end}{s.room ? ' · ' + s.room : ''}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>{t('upT')}</h3>
          {pend.length === 0 && <p className="empty">{t('noPend')}</p>}
          {pend.slice(0, 5).map((x) => <TaskRow key={x.id} data={data} task={x} actions={actions} />)}
        </div>
        <div className="card">
          <h3>{t('upE')}</h3>
          {ex.length === 0 && <p className="empty">{t('noExam')}</p>}
          {ex.slice(0, 3).map((e) => <ExamRow key={e.id} data={data} exam={e} actions={actions} />)}
        </div>
      </div>
    </>
  )
}
