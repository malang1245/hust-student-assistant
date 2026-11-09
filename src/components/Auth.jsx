import { useState } from 'react'
import { useT } from '../i18n'
import { api } from '../api'

export default function Auth({ onAuth }) {
  const t = useT()
  const [mode, setMode] = useState('login')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const isLogin = mode === 'login'

  const submit = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    setBusy(true)
    setErr('')
    try {
      await onAuth(await (isLogin ? api.login(d) : api.register(d)))
    } catch (x) {
      setErr(t(x.code || 'errGeneric'))
      setBusy(false)
    }
  }

  return (
    <div className="card auth">
      <h3>{isLogin ? t('tLogin') : t('tReg')}</h3>
      <form onSubmit={submit}>
        {!isLogin && <label>{t('uname')}<input name="name" autoComplete="name" required /></label>}
        <label>{t('email')}<input type="email" name="email" autoComplete="email" required /></label>
        <label>{t('pass')}
          <input type="password" name="password" minLength={isLogin ? undefined : 6}
            autoComplete={isLogin ? 'current-password' : 'new-password'} required />
        </label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? t('loading') : isLogin ? t('tLogin') : t('tReg')}</button>
      </form>
      <button type="button" className="linkbtn" onClick={() => { setMode(isLogin ? 'register' : 'login'); setErr('') }}>
        {isLogin ? t('toReg') : t('toLogin')}
      </button>
    </div>
  )
}
