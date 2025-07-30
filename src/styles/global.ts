import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}

body, html, #root {
  width: 100%;
  min-width: 100vw;
  overflow-x: hidden;
}
`;

export default GlobalStyles;