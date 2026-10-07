import { useEffect, useState } from 'react'
import { D, LANGS, LANG_NAMES, LangCtx, translate } from './i18n'
import { loadData, saveData } from './store'
import { uid } from './utils'
import Dashboard from './components/Dashboard'
import Timetable from './components/Timetable'
import Tasks from './components/Tasks'
import Exams from './components/Exams'
import Courses from './components/Courses'

const TABS = [
  ['home', 'tHome', Dashboard],
  ['tt', 'tTT', Timetable],
  ['task', 'tTask', Tasks],
  ['exam', 'tExam', Exams],
  ['course', 'tCourse', Courses],
]

const initialLang = () => {
  try {
    return Math.max(0, LANGS.indexOf(localStorage.getItem('hust-lang')))
  } catch {
    return 0
  }
}

export default function App() {
  const [li, setLi] = useState(initialLang)
  const [data, setData] = useState(loadData)
  const [tab, setTab] = useState('home')
  const t = (k, n) => translate(li, k, n)

  useEffect(() => saveData(data), [data])
  useEffect(() => {
    document.documentElement.lang = LANGS[li]
    try { localStorage.setItem('hust-lang', LANGS[li]) } catch {}
  }, [li])

  const actions = {
    add: (kind, item) => setData((d) => ({ ...d, [kind]: [...d[kind], { id: uid(), ...item }] })),
    remove: (kind, id) =>
      setData((d) => {
        const next = { ...d, [kind]: d[kind].filter((x) => x.id !== id) }
        if (kind === 'courses') // xóa môn thì xóa luôn dữ liệu liên quan
          ['sessions', 'tasks', 'exams'].forEach((k) => (next[k] = next[k].filter((x) => x.course !== id)))
        return next
      }),
    update: (kind, id, patch) =>
      setData((d) => ({ ...d, [kind]: d[kind].map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    toggle: (id) =>
      setData((d) => ({ ...d, tasks: d.tasks.map((x) => (x.id === id ? { ...x, done: !x.done } : x)) })),
  }

  const View = TABS.find((x) => x[0] === tab)[2]

  return (
    <LangCtx.Provider value={li}>
      <header>
        <div className="top">
          <h1>HUST Student Assistant</h1>
          <label className="lg">
            <span>{t('lang')}</span>
            <select value={LANGS[li]} onChange={(e) => setLi(LANGS.indexOf(e.target.value))}>
              {LANGS.map((l) => <option key={l} value={l}>{LANG_NAMES[l]}</option>)}
            </select>
          </label>
        </div>
        <p>{t('sub')}</p>
      </header>
      <nav>
        {TABS.map(([k, label]) => (
          <button key={k} className={k === tab ? 'on' : ''} onClick={() => setTab(k)}>{t(label)}</button>
        ))}
      </nav>
      <main>
        <View data={data} actions={actions} />
      </main>
    </LangCtx.Provider>
  )
}
