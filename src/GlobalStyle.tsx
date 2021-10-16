import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #0b0c1d;
    font-family: "Courier New", monospace;
    color: #fff;
  }

  #root {
    height: 100vh;
  }
`;

export default GlobalStyle;
