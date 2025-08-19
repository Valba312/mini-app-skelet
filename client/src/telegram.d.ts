// Basic types to help TypeScript recognize Telegram WebApp API
export {}

declare global {
  interface TelegramWebAppThemeParams {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
    header_bg_color?: string
    section_bg_color?: string
    section_header_text_color?: string
    subtitle_text_color?: string
    destructive_text_color?: string
    bottom_bar_bg_color?: string
  }

  interface TelegramWebAppInitDataUnsafe {
    query_id?: string
    user?: any
    receiver?: any
    chat?: any
    start_param?: string
    can_send_after?: number
    auth_date?: number
    hash?: string
  }

  interface TelegramWebApp {
    initData: string
    initDataUnsafe: TelegramWebAppInitDataUnsafe
    colorScheme: 'light' | 'dark'
    themeParams: TelegramWebAppThemeParams
    isExpanded: boolean
    viewportHeight: number
    viewportStableHeight: number
    BackButton: {
      isVisible: boolean
      show(): void
      hide(): void
      onClick(cb: () => void): void
      offClick(cb: () => void): void
    }
    MainButton: {
      text: string
      isVisible: boolean
      isActive: boolean
      show(): void
      hide(): void
      enable(): void
      disable(): void
      setText(text: string): void
      onClick(cb: () => void): void
      offClick(cb: () => void): void
    }
    SettingsButton?: {
      isVisible: boolean
      show(): void
      hide(): void
      onClick(cb: () => void): void
      offClick(cb: () => void): void
    }
    HapticFeedback: {
      impactOccurred(style?: 'light'|'medium'|'heavy'|'rigid'|'soft'): void
      notificationOccurred(type?: 'error'|'success'|'warning'): void
      selectionChanged(): void
    }
    onEvent<T=any>(event: string, fn: (data?: T) => void): void
    offEvent<T=any>(event: string, fn: (data?: T) => void): void
    ready(): void
    expand(): void
    close(): void
    showAlert(message: string): void
    showPopup(params: { title?: string, message: string, buttons?: Array<{type?: 'ok'|'close'|'cancel'|'destructive'|'default', text?: string, id?: string}> }, cb?: (id?: string) => void): void
    openTelegramLink(url: string): void
    openLink(url: string): void
    setHeaderColor(color: string): void
    setBackgroundColor(color: string): void
  }

  interface Window {
    Telegram?: { WebApp: TelegramWebApp }
  }
}
