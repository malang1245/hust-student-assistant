import { useEffect, useState } from 'react'
import { LANGS, LANG_NAMES, LangCtx, translate } from './i18n'
import { api, getToken, setToken } from './api'
import Auth from './components/Auth'
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
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [booting, setBooting] = useState(!!getToken())
  const [bootErr, setBootErr] = useState('')
  const [tab, setTab] = useState('home')
  const t = (k, n) => translate(li, k, n)

  useEffect(() => {
    document.documentElement.lang = LANGS[li]
    try { localStorage.setItem('hust-lang', LANGS[li]) } catch {}
  }, [li])

  // Mở lại trang: nếu còn token thì tự đăng nhập
  useEffect(() => {
    if (!getToken()) return
    api.me()
      .then((r) => { setUser(r.user); return api.data() })
      .then(setData)
      .catch((e) => {
        if (e.status === 401) setToken(null)
        else setBootErr(e.code || 'errGeneric')
      })
      .finally(() => setBooting(false))
  }, [])

  const logout = () => {
    setToken(null)
    setUser(null)
    setData(null)
    setTab('home')
  }

  const onAuth = async (res) => {
    setToken(res.token)
    setData(await api.data())
    setUser(res.user)
  }

  // Gọi API rồi tải lại dữ liệu; lỗi 401 thì đăng xuất
  const run = async (fn) => {
    try {
      await fn()
      setData(await api.data())
    } catch (e) {
      if (e.status === 401) logout()
      else alert(t(e.code || 'errGeneric'))
    }
  }
  const actions = {
    add: (kind, item) => run(() => api.add(kind, item)),
    update: (kind, id, patch) => run(() => api.update(kind, id, patch)),
    remove: (kind, id) => run(() => api.remove(kind, id)),
    toggle: (id) => run(() => api.toggle(id)),
  }

  const View = TABS.find((x) => x[0] === tab)[2]
  const ready = user && data

  return (
    <LangCtx.Provider value={li}>
      <header>
        <div className="top">
          <h1>HUST Student Assistant</h1>
          <div className="tools">
            <label className="lg">
              <span>{t('lang')}</span>
              <select value={LANGS[li]} onChange={(e) => setLi(LANGS.indexOf(e.target.value))}>
                {LANGS.map((l) => <option key={l} value={l}>{LANG_NAMES[l]}</option>)}
              </select>
            </label>
            {ready && <button className="btn ghost" onClick={logout}>{t('logout')}</button>}
          </div>
        </div>
        <p>{t('sub')}</p>
      </header>
      {booting ? (
        <main><p className="empty">{t('loading')}</p></main>
      ) : bootErr ? (
        <main><div className="card"><p className="err">{t(bootErr)}</p></div></main>
      ) : !ready ? (
        <main><Auth onAuth={onAuth} /></main>
      ) : (
        <>
          <nav>
            {TABS.map(([k, label]) => (
              <button key={k} className={k === tab ? 'on' : ''} onClick={() => setTab(k)}>{t(label)}</button>
            ))}
          </nav>
          <main>
            <View data={data} actions={actions} />
          </main>
        </>
      )}
    </LangCtx.Provider>
  )
}
