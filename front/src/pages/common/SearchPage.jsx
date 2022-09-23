import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AllToonList from "../../components/toonlist/AllToonList";
import ToonLoading from "../../components/toonlist/ToonLoading";
import { changeKeyword } from "../../features/toons/searchSlice";

export default function SearchPage() {
  const dispatch = useDispatch();

  const toonList = useSelector((state) => state.search.toonList);
  const word = useSelector((state) => state.search.word);
  const isLoad = useSelector((state) => state.search.isLoad);

  useEffect(() => {
    return () => {
      dispatch(changeKeyword(""));
    };
  }, [dispatch]);

  return (
    <Container>
      <PageBox>
        <HeaderBox>
          <PageTitle>'{word}'에 대한 검색 결과</PageTitle>
        </HeaderBox>
        {toonList.length ? (
          <ToonListBox>
            <AllToonList toons={toonList} />
          </ToonListBox>
        ) : isLoad ? (
          <ToonListBox>
            <ToonLoading num={10}></ToonLoading>
          </ToonListBox>
        ) : (
          <EmptyMsg>검색 결과가 존재하지 않습니다.</EmptyMsg>
        )}
      </PageBox>
    </Container>
  );
}

const Container = styled.div`
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  padding: 1vw 0;
  border: solid 2px;
  border-radius: 1rem;
  background-color: white;
`

const PageBox = styled.div`
  width: 96%;
  min-height: 38vw;
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
`;

const ToonListBox = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const EmptyMsg = styled.p`
  margin-top: 10vw;
  font-size: 1.5vw;
  font-weight: 600;
  text-align: center;
`;
