import { createGlobalStyle } from "styled-components";
import { common, hover, input } from "./assets/cursor/cursorItem";

const GlobalStyle = createGlobalStyle`
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
  body button {
    cursor: url(${hover}) 13 13, auto;
  }
`;

export default GlobalStyle;
