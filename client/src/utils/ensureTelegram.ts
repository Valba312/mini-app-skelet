export function ensureTelegram() {
  const w = window as any
  if (w.Telegram?.WebApp) return

  const hash = new URLSearchParams(location.hash.slice(1))
  const tgData = hash.get('tgWebAppData')
  if (!tgData) return

  // Мини-объект, достаточный для нашей авторизации на бэке
  const unsafe = Object.fromEntries(new URLSearchParams(tgData))
  w.Telegram = {
    WebApp: {
      initData: tgData,
      initDataUnsafe: unsafe,
      platform: hash.get('tgWebAppPlatform') || 'weba',
      version: hash.get('tgWebAppVersion') || '',
      ready() {},
      expand() {},
    }
  }
}
