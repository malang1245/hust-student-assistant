import { useT } from '../i18n'
import { addDays, DAY_IDS, todayIdx } from '../utils'
import { courseOf, cname, CourseOptions, DelBtn, NeedCourse, readForm } from './common'

export default function Timetable({ data, actions }) {
  const t = useT()

  const submit = (e) => {
    const [d, reset] = readForm(e)
    if (!d.course) return alert(t('errC'))
    if (d.end <= d.start) return alert(t('errEnd'))
    actions.add('sessions', { ...d, day: +d.day })
    reset()
  }

  return (
    <>
      <div className="card">
        <h3>{t('addS')}</h3>
        <NeedCourse data={data} />
        <form onSubmit={submit}>
          <label>{t('course')}<select name="course" required><CourseOptions data={data} /></select></label>
          <label>{t('day')}
            <select name="day" defaultValue={todayIdx}>
              {DAY_IDS.map((i) => <option key={i} value={i}>{t('d' + i)}</option>)}
            </select>
          </label>
          <label>{t('start')}<input type="time" name="start" defaultValue="07:00" required /></label>
          <label>{t('end')}<input type="time" name="end" defaultValue="09:30" required /></label>
          <label>{t('room')}<input name="room" placeholder="D3-301" /></label>
          <button className="btn">{t('addS')}</button>
        </form>
      </div>

      <div className="week">
        {DAY_IDS.map((i) => {
          let end = ''
          const list = data.sessions.filter((s) => s.day === i).sort((a, b) => a.start.localeCompare(b.start))
          return (
            <div key={i} className={'col' + (i === todayIdx ? ' today' : '')}>
              <h4>{t('d' + i)}</h4>
              {list.length === 0 && <span className="mut">{t('free')}</span>}
              {list.map((s) => {
                const bad = s.start < end // trùng giờ với buổi trước
                if (s.end > end) end = s.end
                const c = courseOf(data, s.course, t)
                return (
                  <div key={s.id} className={'sess' + (bad ? ' bad' : '')} style={{ '--c': c.color }}>
                    <b>{cname(c, t)}</b>
                    <span>{s.start}–{s.end}{s.room ? ' · ' + s.room : ''}</span>
                    {bad && <em>{t('clash')}</em>}
                    <DelBtn onClick={() => actions.remove('sessions', s.id)} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
