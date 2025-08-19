import BackButtonHandler from '../components/BackButtonHandler'
import TopBar from '../components/TopBar'
import { useThemeHeader } from '../hooks/useTheme'

export default function Catalog() {
  useThemeHeader('secondary_bg_color')
  return (
    <div>
      <BackButtonHandler />
      <TopBar />
      <div className="container">
        <h2>Каталог</h2>
        <div className="card">Здесь будет список товаров/услуг.</div>
      </div>
    </div>
  )
}
