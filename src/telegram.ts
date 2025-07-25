declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}

interface WebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
  };
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  version: string;
  platform: string;
  isExpanded: boolean;
  expand(): void;
  close(): void;
  sendData(data: string): void;
  ready(): void;
  onEvent(eventType: string, callback: () => void): void;
  offEvent(eventType: string, callback: () => void): void;
}

export const tg = window.Telegram.WebApp;

export const initTelegram = () => {
  tg.ready();
  tg.expand();
  
  tg.onEvent('themeChanged', () => {
    const bgColor = tg.themeParams.bg_color ?? '#ffffff';
    const textColor = tg.themeParams.text_color ?? '#000000';
    document.documentElement.style.setProperty('--tg-theme-bg-color', bgColor);
    document.documentElement.style.setProperty('--tg-theme-text-color', textColor);
  });
  
  // Применяем тему сразу
  if (tg.themeParams) {
    const bgColor = tg.themeParams.bg_color ?? '#ffffff';
    const textColor = tg.themeParams.text_color ?? '#000000';
    document.documentElement.style.setProperty('--tg-theme-bg-color', bgColor);
    document.documentElement.style.setProperty('--tg-theme-text-color', textColor);
  }
};

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export const getUser = (): TelegramUser | null => {
  return tg.initDataUnsafe?.user || null;
};

export const getUserId = (): number | null => {
  return tg.initDataUnsafe?.user?.id || null;
};

export const getUserName = (): string => {
  const user = tg.initDataUnsafe?.user;
  if (!user) return 'Гость';
  
  return [user.first_name, user.last_name]
    .filter(Boolean)
    .join(' ');
};


export const getEffectiveUserId = (): number | null => {
  const telegramId = tg?.initDataUnsafe?.user?.id;
  if (telegramId) return telegramId;

  const fromUrl = new URLSearchParams(window.location.search).get("user_id");
  return fromUrl ? Number(fromUrl) : null;
};
