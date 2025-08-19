import { useEffect } from 'react'
import { tg } from '../telegram'

type Props = { text: string, onClick: () => void, visible?: boolean, disabled?: boolean }

export default function MainButton({ text, onClick, visible = true, disabled = false }: Props) {
  useEffect(() => {
    if (!tg) return
    tg.MainButton.setText(text)
    if (visible) tg.MainButton.show(); else tg.MainButton.hide()
    if (disabled) tg.MainButton.disable(); else tg.MainButton.enable()
    tg.MainButton.onClick(onClick)
    return () => tg.MainButton.offClick(onClick)
  }, [text, onClick, visible, disabled])

  return null
}
