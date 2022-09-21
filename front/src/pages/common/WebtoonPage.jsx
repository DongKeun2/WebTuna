import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchToonlist } from "../../features/toons/toonlistSlice"
import styled from 'styled-components'
import AllToonList from "../../components/toonlist/AllToonList"

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
          <h1>웹툰 목록 페이지</h1>
          <button>버튼</button>
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
          <h1>웹툰 목록 페이지</h1>
          <button>버튼</button>
        </HeaderBox>
        <ToonListBox>
          <EmptyBox></EmptyBox>
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

const ToonListBox = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`
const EmptyBox = styled.div`
  height: 60vh;
`

export default WebtoonPage;
