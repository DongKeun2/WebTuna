import { useSelector } from "react-redux";
import styled from "styled-components";
import AllToonList from "../../components/toonlist/AllToonList";

export default function SearchPage() {
  const toonList = useSelector((state) => state.search.toonList);
  const word = useSelector((state) => state.search.word);

  return (
    <PageBox>
      <HeaderBox>
        <PageTitle>'{word}'에 대한 검색 결과</PageTitle>
      </HeaderBox>
      {toonList.length ? (
        <ToonListBox>
          <AllToonList toons={toonList} />
        </ToonListBox>
      ) : (
        <EmptyBox>
          <h2>검색 결과 없어용</h2>
        </EmptyBox>
      )}
    </PageBox>
  );
}

const PageBox = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  border: solid 2px;
  border-radius: 0.8rem;
  background-color: #fff5c3;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.8vw;
`;

const PageTitle = styled.p`
  font-size: 1.8vw;
  font-weight: 700;
  margin-top: 2vw;
  margin-bottom: 2vw;
  margin-left: 1vw;
`

const ToonListBox = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const EmptyBox = styled.div`
  padding: 4vw;
  height: 60vh;
`;
