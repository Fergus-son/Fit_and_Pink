import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  }
`;