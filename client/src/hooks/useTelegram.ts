import { useEffect, useMemo, useState } from 'react'
import { tg } from '../telegram'

export function useTelegram() {
  const [colorScheme, setScheme] = useState<'light'|'dark'>(tg?.colorScheme ?? 'light')
  const [themeParams, setTheme] = useState(tg?.themeParams ?? {})
  const [initData, setInit] = useState(tg?.initData ?? '')
  const [initDataUnsafe, setUnsafe] = useState(tg?.initDataUnsafe ?? {})

  useEffect(() => {
    if (!tg) return

    const onTheme = () => {
      setScheme(tg.colorScheme)
      setTheme(tg.themeParams)
      applyCssVars()
    }
    const onViewport = () => applyCssVars()
    const onActive = () => applyCssVars()

    tg.onEvent('themeChanged', onTheme)
    tg.onEvent('viewportChanged', onViewport)
    tg.onEvent('activated', onActive)

    applyCssVars()
    setInit(tg.initData)
    setUnsafe(tg.initDataUnsafe)

    return () => {
      tg.offEvent('themeChanged', onTheme)
      tg.offEvent('viewportChanged', onViewport)
      tg.offEvent('activated', onActive)
    }
  }, [])

  const applyCssVars = () => {
    if (!tg) return
    const root = document.documentElement
    const p = tg.themeParams
    const set = (k: string, v?: string) => v && root.style.setProperty(`--tg-theme-${k.replace(/_/g,'-')}`, v)
    set('bg_color', p.bg_color)
    set('text_color', p.text_color)
    set('hint_color', p.hint_color)
    set('link_color', p.link_color)
    set('button_color', p.button_color)
    set('button_text_color', p.button_text_color)
    set('secondary_bg_color', p.secondary_bg_color)
    set('header_bg_color', p.header_bg_color)
    set('section_bg_color', p.section_bg_color)
    set('section_header_text_color', p.section_header_text_color)
    set('subtitle_text_color', p.subtitle_text_color)
    set('destructive_text_color', p.destructive_text_color)
    set('bottom_bar_bg_color', p.bottom_bar_bg_color)
    document.documentElement.style.setProperty('--tg-viewport-height', tg.viewportHeight + 'px')
    document.documentElement.style.setProperty('--tg-viewport-stable-height', tg.viewportStableHeight + 'px')
  }

  const user = useMemo(() => initDataUnsafe?.user, [initDataUnsafe])

  return { tg, isTg: !!tg, colorScheme, themeParams, initData, initDataUnsafe, user }
}
