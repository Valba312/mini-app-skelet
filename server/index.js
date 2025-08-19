import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { validateInitData } from './validateInitData.js'

const app = express()
const PORT = process.env.PORT || 8787
const ORIGIN = process.env.ALLOWED_ORIGIN || ''

// CORS: в одном домене не нужен; если задан ORIGIN — включим, иначе пропустим
if (ORIGIN) app.use(cors({ origin: ORIGIN, credentials: true }))
app.use(express.json())

// --- Разрешаем встраивание в Telegram WebView (должно стоять РАНЬШЕ роутов/статики)
app.use((req, res, next) => {
  // если где-то добавят X-Frame-Options — уберём на ответе
  res.removeHeader('X-Frame-Options')
  // CSP: разрешаем фрейм-родителей — Telegram и self
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://web.telegram.org https://*.telegram.org;"
  )
  next()
})

// Health
app.get('/health', (_, res) => res.json({ ok: true }))

// Диагностика: можно временно поставить этот путь в BotFather (…/diag)
app.get('/diag', (req, res) => {
  res.type('html').send(`<!doctype html>
<meta charset="utf-8">
<title>diag</title>
<style>body{font:14px/1.4 monospace;padding:12px}</style>
<h1>Diag</h1>
<div id="out"></div>
<script>
  const log = (...a)=>{document.getElementById('out').innerHTML += a.join(' ') + '<br>'}
  log('time:', new Date().toISOString())
  log('href:', location.href)
  log('UA:', navigator.userAgent)
  try { log('TG present?', !!(window.Telegram && Telegram.WebApp)) }
  catch(e){ log('TG check err:', e?.message) }
  window.onerror = (m,s,l,c,e)=>{ log('onerror:', m, '@', s+':'+l) }
</script>`)
})

// Пример защищённого эндпоинта
app.get('/api/me', (req, res) => {
  const initData = req.header('X-Telegram-Init-Data') || ''
  const ok = validateInitData(initData, process.env.BOT_TOKEN || '')
  if (!ok) return res.status(401).json({ error: 'Invalid init data' })

  const sp = new URLSearchParams(initData)
  const userStr = sp.get('user')
  const user = userStr ? JSON.parse(userStr) : null

  return res.json({ user, roles: ['user'] })
})

// ---------- раздача статики клиента ----------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDist = path.join(__dirname, '../client/dist')

// отдать файлы сборки
app.use(express.static(clientDist, { index: false }))

// SPA-фоллбек: все НЕ /api/* → index.html
app.get(/^(?!\/api\/).*/, (_, res) => {
  res.sendFile(path.join(clientDist, 'index.html'))
})
// ------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
