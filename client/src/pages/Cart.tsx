import BackButtonHandler from '../components/BackButtonHandler'
import TopBar from '../components/TopBar'

export default function Cart() {
  return (
    <div>
      <BackButtonHandler />
      <TopBar />
      <div className="container">
        <h2>Корзина</h2>
        <div className="card">Сумма, позиции, промокод и кнопка оплаты (openInvoice).</div>
      </div>
    </div>
  )
}
