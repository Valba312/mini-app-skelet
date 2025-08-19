# Telegram Mini App — Каркас (React + Vite + TypeScript) 🎯

Готовый шаблон мини‑приложения Telegram, чтобы быстро «всунуть» логику из ТЗ позже.

## Что внутри
- React + TypeScript + Vite
- React Router (HashRouter — без настройки сервера)
- Обёртка над Telegram WebApp API, хук `useTelegram`
- Реакция на тему/цвета Telegram + CSS‑переменные
- Примеры Main/Back/Settings кнопок, Haptic, события `themeChanged`
- Чтение `start_param` и `initDataUnsafe`
- Клиентский `api.ts` для запросов с `initData` (для бэкенд‑валидации)
- Мини бэкенд (Express) с проверкой подписи initData (см. `/server`)

## Быстрый старт
1. Установи зависимости клиента:
   ```bash
   cd client
   npm i
   cp .env.example .env  # при необходимости
   npm run dev
   ```

2. Бэкенд (валидация initData):
   ```bash
   cd ../server
   npm i
   cp .env.example .env
   # Заполни BOT_TOKEN из @BotFather
   npm run dev
   ```

3. Свяжи фронт и бэкенд:
   - В `client/.env` укажи `VITE_BACKEND_URL=http://localhost:8787` (или свой хост).
   - Для запуска внутри Telegram используй **https** и публичный домен.

## Как запустить в Telegram
- В HTML уже подключен скрипт `telegram-web-app.js`.
- Создай бота в @BotFather → укажи Web App URL (меню **Bot Settings → Configure Mini App** или через `/setmenubutton`).
- Для inline‑кнопок используй тип `web_app`.
- Для прямой ссылки: `https://t.me/<bot>?startapp=<param>` — параметр попадёт в `start_param`.

## Безопасность (важно)
- На сервер отправляй **только** `Telegram.WebApp.initData` (сырой query string), а не `initDataUnsafe`.
- На сервере проверяй подпись по алгоритму Telegram (реализовано в `/server/validateInitData.js`).

Полезные поля:
- `tg.initDataUnsafe.user` — данные пользователя
- `tg.initData` — строка для валидации на бэкенде
- `tg.themeParams` и CSS‑переменные (`--tg-*`) — для темизации

Удачи! 🚀
