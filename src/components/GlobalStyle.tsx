import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    background: #0b0c1d;
    font-family: "Courier New", monospace;
    color: #fff;
  }

  #root {
    height: 100vh;
  }

  p {
    line-height: 24px;
  }

  h2 {
    margin-bottom: 2em;
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
