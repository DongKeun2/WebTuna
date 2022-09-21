import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchToonlist } from "../../features/toons/toonlistSlice"
import styled from 'styled-components'
import AllToonList from "../../components/toonlist/AllToonList"
import Loading from "../../components/common/Loading";

function WebtoonPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToonlist());
  }, [dispatch]);

  const toons = useSelector((state) => state.toonlist.toons) || [];

  if (toons.length > 0) {
    return (
      <PageBox>
        <HeaderBox>
          <PageTitle>전체 웹툰 목록</PageTitle>
          <FilterBtn>필터</FilterBtn>
        </HeaderBox>
        <ToonListBox>
          <AllToonList toons={toons}/>
        </ToonListBox>
      </PageBox>
    );
  } else {
    return (
      <PageBox>
        <HeaderBox>
          <PageTitle>전체 웹툰 목록</PageTitle>
          <FilterBtn>필터</FilterBtn>
        </HeaderBox>
        <ToonListBox>
          <Loading></Loading>
        </ToonListBox>
      </PageBox>
    )
  }
}

const PageBox = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  border: solid 2px;
  border-radius: 0.8rem;
  background-color: #FFF5C3;
`

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.8vw;
  padding-right: 0.8vw;
`

const PageTitle = styled.p`
  font-size: 1.8vw;
  font-weight: 700;
  margin-top: 2vw;
  margin-bottom: 2vw;
  margin-left: 1vw;
`

const FilterBtn = styled.button`
  font-size: 1vw;
  width: 8vw;
  height: 2.5vw;
  margin-right: 1vw;
  cursor: pointer;
`

const ToonListBox = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`

export default WebtoonPage;
