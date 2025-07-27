import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Базовые сбросы и ограничения */
  html, body, #root {
    min-width: 340px !important;
    width: 100vw;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* Принудительное масштабирование для очень маленьких экранов */
  @media (max-width: 350px) {
    html {
      transform: scale(0.9);
      transform-origin: top left;
      width: 350px;
    }

    body {
      width: 350px;
      overflow-x: auto;
    }
  }

  /* Дополнительные адаптивные стили */
  @media (max-width: 768px) {
    /* Можно добавить мобильные стили */
  }
`;

export default GlobalStyles;