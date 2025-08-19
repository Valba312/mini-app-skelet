import BackButtonHandler from '../components/BackButtonHandler'
import TopBar from '../components/TopBar'
import { tg } from '../telegram'

export default function Settings() {
  return (
    <div>
      <BackButtonHandler />
      <TopBar />
      <div className="container">
        <h2>Настройки</h2>
        <div className="card" style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <button className="button" onClick={()=>tg?.openTelegramLink('https://t.me/BotFather')}>Open BotFather</button>
          <button className="button" onClick={()=>tg?.setBackgroundColor('#000000')}>BG → #000</button>
          <button className="button" onClick={()=>tg?.setBackgroundColor('#ffffff')}>BG → #fff</button>
        </div>
      </div>
    </div>
  )
}
