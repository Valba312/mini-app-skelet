import BackButtonHandler from '../components/BackButtonHandler'
import TopBar from '../components/TopBar'
import { useTelegram } from '../hooks/useTelegram'

export default function Profile() {
  const { user } = useTelegram()
  return (
    <div>
      <BackButtonHandler />
      <TopBar />
      <div className="container">
        <h2>Профиль</h2>
        <div className="card">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
