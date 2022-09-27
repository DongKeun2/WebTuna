import styled from "styled-components";

const OuterBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  width: 400px;
  height: 100px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: ${(props) => (props.active ? "#feec91" : "white")};
  :hover {
    background-color: ${(props) => (props.active ? "white" : null)};
  }
  @media screen and (max-width: 600px) {
    width: 300px;
  }
`;

const SelectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  height: 90%;
  border-radius: 10px;
  background-color: ${(props) => (props.active ? "white" : "#feec91")};
  :hover {
    cursor: ${(props) => (props.active ? "pointer" : null)};
    background-color: ${(props) => (props.active ? "#feec91" : null)};
  }
`;

export { OuterBtn, SelectBtn };
