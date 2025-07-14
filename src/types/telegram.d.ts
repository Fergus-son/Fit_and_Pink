export {};

declare global {
  interface Window {
    Telegram: TelegramWebApp;
  }

  interface TelegramWebApp {
    WebApp: WebApp;
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
  }
}
