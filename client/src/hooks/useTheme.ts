import { useEffect } from 'react'
import { tg } from '../telegram'

export function useThemeHeader(color: 'bg_color' | 'secondary_bg_color' = 'bg_color') {
  useEffect(() => {
    if (!tg) return
    const p = tg.themeParams
    const val = (p as any)[color] || '#ffffff'
    tg.setHeaderColor(val)
  }, [color])
}
