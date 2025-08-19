import { mountDevLog } from './utils/devlog'
mountDevLog()

import { ensureTelegram } from './utils/ensureTelegram'
ensureTelegram()

import React from 'react'
import ReactDOM from 'react-dom/client'
// ⬇️ используем BrowserRouter вместо HashRouter
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import { initTg } from './telegram'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

// инициализация Telegram SDK (ready/expand и т.п.)
initTg()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
