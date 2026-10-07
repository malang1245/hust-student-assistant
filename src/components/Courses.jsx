import { useState } from 'react'
import { useT } from '../i18n'
import { COLORS } from '../utils'
import { Chip, DelBtn, cname, readForm } from './common'

function CourseRow({ data, c, actions }) {
  const t = useT()
  const [editing, setEditing] = useState(false)

  if (editing) {
    const save = (e) => {
      const [d] = readForm(e)
      actions.update('courses', c.id, { name: d.name, sk: null })
      setEditing(false)
    }
    return (
      <div className="row">
        <form className="rowform" onSubmit={save}>
          <label style={{ flex: '2 1 220px' }}>{t('cName')}<input name="name" defaultValue={cname(c, t)} required /></label>
          <button className="btn">{t('save')}</button>
          <button type="button" className="btn ghost" onClick={() => setEditing(false)}>{t('cancel')}</button>
        </form>
      </div>
    )
  }

  return (
    <div className="row">
      <div><Chip data={data} id={c.id} /></div>
      <button type="button" className="x ed" onClick={() => setEditing(true)} aria-label={t('edit')}>✎</button>
      <DelBtn onClick={() => actions.remove('courses', c.id)} />
    </div>
  )
}

export default function Courses({ data, actions }) {
  const t = useT()

  const submit = (e) => {
    const [d, reset] = readForm(e)
    actions.add('courses', { name: d.name, color: COLORS[data.courses.length % COLORS.length] })
    reset()
  }

  return (
    <>
      <div className="card">
        <h3>{t('addC')}</h3>
        <form onSubmit={submit}>
          <label style={{ flex: '2 1 240px' }}>{t('cName')}<input name="name" required /></label>
          <button className="btn">{t('addC')}</button>
        </form>
      </div>
      <div className="card">
        {data.courses.length === 0 && <p className="empty">{t('noCourse')}</p>}
        {data.courses.map((c) => <CourseRow key={c.id} data={data} c={c} actions={actions} />)}
        <p className="mut">{t('delW')}</p>
      </div>
    </>
  )
}
