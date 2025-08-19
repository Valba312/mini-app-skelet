import { Link } from 'react-router-dom'
import { useTelegram } from '../hooks/useTelegram'

export default function TopBar() {
  const { colorScheme, user } = useTelegram()
  return (
    <div className="container" style={{paddingTop: 12, display: 'flex', alignItems: 'center', gap: 12, justifyContent:'space-between'}}>
      <div style={{fontWeight: 800}}>Mini App</div>
      <nav style={{display:'flex', gap:12}}>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  )
}
