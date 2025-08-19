// Валидация initData по официальной документации Telegram
// Алгоритм: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
import crypto from 'crypto'

/**
 * @param {string} initData Raw query string from Telegram.WebApp.initData
 * @param {string} botToken Bot token from @BotFather
 * @returns {boolean}
 */
export function validateInitData(initData, botToken) {
  if (!initData || !botToken) return false

  const urlParams = new URLSearchParams(initData)
  const hash = urlParams.get('hash')
  if (!hash) return false

  // Build data_check_string: all keys except hash/signature, sorted, joined by \n
  const pairs = []
  for (const [key, value] of urlParams.entries()) {
    if (key === 'hash' || key === 'signature') continue
    pairs.push(`${key}=${value}`)
  }
  pairs.sort()
  const dataCheckString = pairs.join('\n')

  // secret_key = HMAC_SHA256(bot_token, "WebAppData")
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()

  const computed = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(hash, 'hex'))
  } catch {
    return false
  }
}
