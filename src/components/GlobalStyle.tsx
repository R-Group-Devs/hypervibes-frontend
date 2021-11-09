import { createGlobalStyle } from 'styled-components';
import DecimaMonoProLt from '../assets/fonts/DecimaMonoProLt.woff2';
import DecimaMonoProLtItalic from '../assets/fonts/DecimaMonoProLt-Italic.woff2';
import DecimaMonoPro from '../assets/fonts/DecimaMonoPro.woff2';
import DecimaMonoProBold from '../assets/fonts/DecimaMonoPro-Bold.woff2';
import DecimaMonoProItalic from '../assets/fonts/DecimaMonoPro-Italic.woff2';
import DecimaMonoProBoldItalic from '../assets/fonts/DecimaMonoPro-BoldItalic.woff2';
import ThreeSixOneSixGrammastileRegular from '../assets/fonts/3616Grammastile-Regular.woff2';
import bg from '../assets/images/bg.png';

export default createGlobalStyle`
  @font-face {
    font-family: 'Decima Mono';
    src: url(${DecimaMonoProLt}) format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Decima Mono';
    src: url(${DecimaMonoProLtItalic}) format('woff2');
    font-weight: 300;
    font-style: italic;
    font-display: block;
  }

  @font-face {
    font-family: 'Decima Mono';
    src: url(${DecimaMonoPro}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Decima Mono';
    src: url(${DecimaMonoProBold}) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Decima Mono';
    src: url(${DecimaMonoProItalic}) format('woff2');
    font-weight: 400;
    font-style: italic;
    font-display: block;
  }

  @font-face {
    font-family: 'Decima Mono';
    src: url(${DecimaMonoProBoldItalic}) format('woff2');
    font-weight: 600;
    font-style: italic;
    font-display: block;
  }

  @font-face {
    font-family: '3616 Grammastile';
    src: url(${ThreeSixOneSixGrammastileRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }

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
