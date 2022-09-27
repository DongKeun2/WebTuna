import styled from "styled-components";
import Banner from "../../components/common/Banner";

function MainPage() {
  return (
    <MainBox>
      <h1>메인 페이지</h1>
      <Banner></Banner>
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
