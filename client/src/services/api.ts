export const API_URL = import.meta.env.VITE_BACKEND_URL || ''

export async function api<T>(path: string, opts: RequestInit = {}) {
  if (!API_URL) throw new Error('VITE_BACKEND_URL is not set.')
  const headers = new Headers(opts.headers || {})
  // Передаем initData в заголовке (сырой query string для валидации на сервере)
  // window.Telegram.WebApp может быть недоступен при запуске вне Telegram
  const initData = (window as any)?.Telegram?.WebApp?.initData || ''
  if (initData) headers.set('X-Telegram-Init-Data', initData)

  const res = await fetch(API_URL + path, {
    ...opts,
    headers
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<T>
}
