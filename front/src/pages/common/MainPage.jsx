import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Banner from "../../components/common/Banner";
import { fetchMain } from "../../features/toons/mainSlice";
import ConceptToons from "../../components/toonlist/ConceptToons";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMain());
  }, [dispatch]);

  return (
    <MainBox>
      <Banner></Banner>
      <ConceptToons></ConceptToons>
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -5vh;
  /* justify-content: center; */
  align-items: center;
`;

export default MainPage;
