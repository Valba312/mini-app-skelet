export const tg = window.Telegram?.WebApp as TelegramWebApp

export const isTg = !!tg

export function initTg() {
  if (!tg) return
  tg.ready()
  tg.expand()
}
