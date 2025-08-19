export function getStartParam(initDataUnsafe?: TelegramWebAppInitDataUnsafe) {
  const p = new URLSearchParams(window.location.search)
  const fromQuery = p.get('tgWebAppStartParam') || p.get('start_param')
  return fromQuery || initDataUnsafe?.start_param || ''
}
