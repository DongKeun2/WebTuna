import styled from "styled-components";
import { hover, forbidden } from "../../assets/cursor/cursorItem";

const OuterBtn = styled.div`
  box-shadow: 2px 3px 2px rgba(0,0,0,0.5);  
  border: 0.3vw solid white;
  border-radius: 0.6vw;
  background-color: #d1e2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 100px;
  cursor: url(${hover}) 13 13, auto;
  &:hover {
    background-color: #99c0ff;
    border: 0.3vw solid #99c0ff;
  }
  @media screen and (max-width: 600px) {
    width: 300px;
  }
`;

const SelectBtn = styled.div`  
  background-color: #d1e2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  height: 90%;
  border-radius: 10px;
  background-color: ${(props) => (props.active ? "#d1e2ff" : "white")};
  :hover {
    cursor: ${(props) =>
    props.active
      ? `url(${hover}) 13 13, auto`
      : `url(${forbidden}) 13 13, auto`};
    background-color: ${(props) => (props.active ? "#99c0ff;" : null)};
  }
`;

export { OuterBtn, SelectBtn };
