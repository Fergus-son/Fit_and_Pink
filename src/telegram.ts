export const tg = window.Telegram.WebApp;

export const initTelegram = () => {
  tg.ready();
  tg.expand();
};
