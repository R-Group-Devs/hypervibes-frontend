import { createGlobalStyle } from 'styled-components';
import bg from '../assets/images/bg.png';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ::selection {
    background: #17ffe3;
    color: #000;
  }

  ::-moz-selection {
    background: #17ffe3;
    color: #000;
  }

  html {
    background: linear-gradient(#1c1c1c 20%, #183934 100%);
    background-size: cover;
    background-attachment: fixed;
  }

  body {
    margin: 0;
    background: url(${bg}) 0 0 no-repeat;
    background-size: cover;
    background-attachment: fixed;
    color: #fff;
  }

  body, button, input {
    font-family: "Decima Mono", "Courier New", monospace;
  }

  #root {
    min-height: 100vh;
  }

  p {
    line-height: 24px;
  }

  h2 {
    margin-bottom: 2em;
  }

  form {
    width: 100%;
  }

  a {
    padding-bottom: 0.5em;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;
