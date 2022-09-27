import { useSelector } from "react-redux";
import styled from "styled-components";
import AllToonList from "./AllToonList";

function ConceptToons() {
  const toons = useSelector((state) => state.main.toons);
  const state = useSelector((state) => state.main.currentState);

  return (
    <ToonBox>
      <AllToonList toons={toons[state]}></AllToonList>
    </ToonBox>
  );
}

const ToonBox = styled.div`
  display: grid;
  width: 90%;
  margin-bottom: 70px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

export default ConceptToons;
