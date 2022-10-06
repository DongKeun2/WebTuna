import { useSelector } from "react-redux";
import styled from "styled-components";
import AllToonList from "./AllToonList";

function ConceptToons({ toons }) {
  const state = useSelector((state) => state.main.currentState);

  return (
    <ToonBox>
      <AllToonList main="main" toons={toons[state]}></AllToonList>
    </ToonBox>
  );
}

const ToonBox = styled.div`
  display: grid;
  width: 75%;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media screen and (max-width: 930px) {
    margin-bottom: 100px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: 650px) {
    margin-bottom: 100px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export default ConceptToons;
