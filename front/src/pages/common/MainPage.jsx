import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Banner from "../../components/common/Banner";
import { fetchMain } from "../../features/toons/mainSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import ConceptToons from "../../components/toonlist/ConceptToons";

function MainPage() {
  sessionStorage.setItem("url", `/`);
  const dispatch = useDispatch();

  const toons = useSelector((state) => state.main.toons);
  const isLoading = useSelector((state) => state.main.isLoading);

  useEffect(() => {
    dispatch(changeCurrentpage("main"));
    dispatch(fetchMain());
  }, [dispatch]);

  return (
    <MainBox>
      <Banner></Banner>
      {isLoading && <ConceptToons toons={toons}></ConceptToons>}
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -1vh;
  align-items: center;
`;

export default MainPage;
