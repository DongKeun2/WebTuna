import { useSelector } from "react-redux";
import styled from "styled-components";
import AllToonList from "../../components/toonlist/AllToonList";

export default function SearchPage() {
  const toonList = useSelector((state) => state.search.toonList);

  function checkFetch() {
    console.log(toonList);
  }
  return (
    <PageBox>
      <HeaderBox>
        <h1>검색 결과</h1>
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
