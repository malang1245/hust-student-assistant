
import { useT } from '../i18n'
import { byDue, diff, todayIdx } from '../utils'
import { courseOf, cname, TaskRow, ExamRow } from './common'

export default function Dashboard({ data, actions }) {
  const t = useT()

  const pend = data.tasks
    .filter((x) => !x.done)
    .sort(byDue)

  const ex = data.exams
    .filter((e) => diff(e.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))

  const today = data.sessions
    .filter((s) => s.day === todayIdx)
    .sort((a, b) => a.start.localeCompare(b.start))

  const stats = [
    { value: today.length, label: 'sToday', icon: '📅', color: 'blue' },
    { value: pend.length, label: 'sPend', icon: '📝', color: 'orange' },
    { value: ex.length, label: 'sExam', icon: '🎓', color: 'purple' },
    { value: data.courses.length, label: 'sCourse', icon: '📚', color: 'green' },
  ]

  return (
    <div className="dashboard">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">
            HUST STUDENT ASSISTANT
          </span>
          <h2>{t('todayT')}</h2>
          {t('sub')}
        </div>
      </section>

      <section className="stats">
        {stats.map((item) => (
          <div
            className={`card stat-card stat-${item.color}`}
            key={item.label}
          >
            <div className="stat-top">
              <span className="stat-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="stat-value">{item.value}</span>
            </div>
            <span className="stat-label">{t(item.label)}</span>
          </div>
        ))}
      </section>

      <section className="dashboard-sections">
        <div className="card dashboard-panel">
          <div className="panel-heading">
            <span className="panel-icon">📅</span>
            <h3>{t('todayT')} ({t('d' + todayIdx)})</h3>
          </div>

          {today.length === 0 && (
            <p className="empty">{t('noClass')}</p>
          )}

          {today.map((s) => (
            <div className="row" key={s.id}>
              <div>
                <b>{cname(courseOf(data, s.course, t), t)}</b>
                <br />
                <small>
                  {s.start}–{s.end}
                  {s.room ? ' · ' + s.room : ''}
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="card dashboard-panel">
          <div className="panel-heading">
            <span className="panel-icon">📝</span>
            <h3>{t('upT')}</h3>
          </div>

          {pend.length === 0 && (
            <p className="empty">{t('noPend')}</p>
          )}

          {pend.slice(0, 5).map((x) => (
            <TaskRow
              key={x.id}
              data={data}
              task={x}
              actions={actions}
            />
          ))}
        </div>

        <div className="card dashboard-panel">
          <div className="panel-heading">
            <span className="panel-icon">🎓</span>
            <h3>{t('upE')}</h3>
          </div>

          {ex.length === 0 && (
            <p className="empty">{t('noExam')}</p>
          )}

          {ex.slice(0, 3).map((e) => (
            <ExamRow
              key={e.id}
              data={data}
              exam={e}
              actions={actions}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
