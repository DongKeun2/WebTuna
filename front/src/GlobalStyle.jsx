import { createGlobalStyle } from "styled-components";
import { common } from "./assets/cursor/cursorItem";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #D1E2FF;
    margin: 0;
    :hover {
      cursor:  url(${common}) 0 0, auto;
    }
  }
`;

export default GlobalStyle;
