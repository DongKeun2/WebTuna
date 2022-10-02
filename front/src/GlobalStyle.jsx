import { createGlobalStyle } from "styled-components";
import { common, hover, input } from "./assets/cursor/cursorItem";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }
  html {
    :hover {
      cursor:  url(${common}) 13 13, auto;
    }
  }
  body {
    background-color: #D1E2FF;
    font-family: 'Pretendard-Regular';
    margin: 0;
    :hover {
      cursor:  url(${common}) 13 13, auto;
    }
  }
  body input {
    cursor: url(${input}) 13 13, auto;
  }
  body a {
      cursor:  url(${hover}) 13 13, auto;
  }
  body button {
    cursor: url(${hover}) 13 13, auto;
  }
  .swal2-styled {
    cursor: url(${hover}) 13 13, auto !important;
  }
  .css-137ul40-MuiButtonBase-root-MuiIconButton-root {
    cursor: url(${hover}) 13 13, auto !important;
  }
  .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root {
    cursor: url(${hover}) 13 13, auto !important;
  }
`;

export default GlobalStyle;
