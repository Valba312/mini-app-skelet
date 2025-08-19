import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tg } from '../telegram'

export default function BackButtonHandler() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!tg) return
    const onClick = () => navigate(-1)
    tg.BackButton.show()
    tg.BackButton.onClick(onClick)
    return () => {
      tg.BackButton.offClick(onClick)
      tg.BackButton.hide()
    }
  }, [navigate])
  return null
}
