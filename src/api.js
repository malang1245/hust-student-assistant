// Lớp gọi backend. Địa chỉ API lấy từ biến VITE_API_URL (mặc định: backend chạy trên máy).
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const TOKEN_KEY = 'hust-token'

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
}
export const setToken = (t) => {
  try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch {}
}

export class ApiError extends Error {
  constructor(code, status) {
    super(code)
    this.code = code // trùng với khóa trong i18n.js (errLogin, errEmail, ...)
    this.status = status
  }
}

async function req(method, path, body) {
  const headers = { 'Content-Type': 'application/json' }
  if (getToken()) headers.Authorization = 'Bearer ' + getToken()
  let res
  try {
    res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  } catch {
    throw new ApiError('errNet', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.error || 'errGeneric', res.status)
  return data
}

export const api = {
  register: (b) => req('POST', '/auth/register', b),
  login: (b) => req('POST', '/auth/login', b),
  me: () => req('GET', '/auth/me'),
  data: () => req('GET', '/data'),
  add: (kind, item) => req('POST', '/' + kind, item),
  update: (kind, id, patch) => req('PUT', `/${kind}/${id}`, patch),
  remove: (kind, id) => req('DELETE', `/${kind}/${id}`),
  toggle: (id) => req('PATCH', `/tasks/${id}/toggle`),
}
