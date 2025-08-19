import MainButton from '../components/MainButton'
import TopBar from '../components/TopBar'
import { useTelegram } from '../hooks/useTelegram'
import { useThemeHeader } from '../hooks/useTheme'
import { getStartParam } from '../utils/initData'

export default function Home() {
  useThemeHeader('bg_color')
  const { tg, user, initDataUnsafe } = useTelegram()

  return (
    <div>
      <TopBar />
      <div className="container">
        <div className="card">
          <h2>Привет{user?.first_name ? `, ${user.first_name}` : ''}! 👋</h2>
          <p>Это каркас Telegram Mini App. Добавляй экраны и бизнес‑логику.</p>
          <ul>
            <li><b>start_param:</b> {getStartParam(initDataUnsafe) || '—'}</li>
            <li><b>user.id:</b> {user?.id ?? '—'}</li>
            <li><b>language:</b> {user?.language_code ?? '—'}</li>
          </ul>
        </div>
        <div style={{marginTop:16, display:'flex', gap:12}}>
          <button className="button" onClick={()=>tg?.showAlert('Готово!')}>Show Alert</button>
          <button className="button" onClick={()=>tg?.HapticFeedback.notificationOccurred('success')}>Haptic</button>
        </div>
      </div>

      <MainButton
        text="Primary Action"
        onClick={() => tg?.showPopup({ message: 'MainButton click!' })}
        visible
      />
    </div>
  )
}
