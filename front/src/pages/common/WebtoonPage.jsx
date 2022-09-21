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
      <div>
        <h1>웹툰 목록 페이지</h1>
        <ToonListBox>
          <AllToonList toons={toons}/>
        </ToonListBox>
      </div>
    );
  } else {
    return (
      <div>
        <h1>웹툰 목록 페이지</h1>
        <ToonListBox>
          <EmptyBox></EmptyBox>
        </ToonListBox>
      </div>
    )
  }
}

const ToonListBox = styled.div`
  display: grid;
  width: 90%;
  margin-bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  border: solid 2px;
  border-radius: 0.5rem;
  background-color: #FFF5C3;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`
const EmptyBox = styled.div`
  height: 400px;
  margin-bottom: 80px;
  background-color: #FFF5C3;
`

export default WebtoonPage;
