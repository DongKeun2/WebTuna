import { createGlobalStyle } from "styled-components";
import cursor from "./assets/cursor/cursor1.png";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #D1E2FF;
    margin: 0;
    :hover {
      cursor:  url(${cursor}) 0 0, auto;
    }
  }
`;

export default GlobalStyle;
