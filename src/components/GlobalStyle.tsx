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

  a {
    padding-bottom: 0.5em;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;

    &:hover {
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
      color: #fff;
    }
  }
`;

export default GlobalStyle;
