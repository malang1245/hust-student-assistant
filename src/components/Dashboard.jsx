import { D, useT } from '../i18n'

import { byDue, diff, todayIdx } from '../utils'
import { courseOf, cname, TaskRow, ExamRow } from './common'

// Chữ riêng cho khu "Việc đã hoàn thành"
Object.assign(D, {
  doneT: ['Việc đã hoàn thành', 'Completed tasks', 'កិច្ចការបានបញ្ចប់'],
  noDone: ['Chưa có việc nào hoàn thành.', 'No completed tasks yet.', 'មិនទាន់មានកិច្ចការបានបញ្ចប់ទេ។'],
})

export default function Dashboard({ data, actions }) {
  const t = useT()
  const pend = data.tasks.filter((x) => !x.done).sort(byDue)
  const done = data.tasks.filter((x) => x.done).sort((a, b) => b.due.localeCompare(a.due))
  const ex = data.exams.filter((e) => diff(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))
  const today = data.sessions.filter((s) => s.day === todayIdx).sort((a, b) => a.start.localeCompare(b.start))
  const tiles = [
    ['', '📅', today.length, 'sToday'],
    ['stat-orange', '📝', pend.length, 'sPend'],
    ['stat-purple', '🎓', ex.length, 'sExam'],
    ['stat-green', '📚', data.courses.length, 'sCourse'],
  ]

  return (
    <div className="dashboard">
      <section className="dashboard-welcome">
        <h2>{t('todayT')}</h2>
        <p>{t('sub')}</p>
      </section>

      <section className="stats">
        {tiles.map(([cls, icon, n, k]) => (
          <div className={`stat-card ${cls}`.trim()} key={k}>
            <div className="stat-top">
              <span className="stat-icon">{icon}</span>
              <span className="stat-value">{n}</span>
            </div>
            <span className="stat-label">{t(k)}</span>
          </div>
        ))}
      </section>

      <section className="dashboard-sections">
        <div className="dashboard-panel">
          <div className="panel-heading">
            <span className="panel-icon">📅</span>
            <h3>{t('todayT')} ({t('d' + todayIdx)})</h3>
          </div>
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

        <div className="dashboard-panel">
          <div className="panel-heading">
            <span className="panel-icon">📝</span>
            <h3>{t('upT')}</h3>
          </div>
          {pend.length === 0 && <p className="empty">{t('noPend')}</p>}
          {pend.slice(0, 5).map((x) => <TaskRow key={x.id} data={data} task={x} actions={actions} />)}
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <span className="panel-icon">🎓</span>
            <h3>{t('upE')}</h3>
          </div>
          {ex.length === 0 && <p className="empty">{t('noExam')}</p>}
          {ex.slice(0, 3).map((e) => <ExamRow key={e.id} data={data} exam={e} actions={actions} />)}
        </div>

        <div className="dashboard-panel" style={{ borderTop: '4px solid #10b981' }}>
          <div className="panel-heading">
            <span className="panel-icon">✅</span>
            <h3>{t('doneT')}</h3>
          </div>
          {done.length === 0 && <p className="empty">{t('noDone')}</p>}
          {done.slice(0, 5).map((x) => <TaskRow key={x.id} data={data} task={x} actions={actions} />)}
        </div>
      </section>
    </div>
  )
}
