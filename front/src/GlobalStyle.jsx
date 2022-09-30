import { createGlobalStyle } from "styled-components";
import { common, hover, input } from "./assets/cursor/cursorItem";

const GlobalStyle = createGlobalStyle`
  html {
    :hover {
      cursor:  url(${common}) 13 13, auto;
    }
  }
  body {
    background-color: #D1E2FF;
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
