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

  const toons = useSelector((state) => state.toonlist.toons);

  return (
    <div>
      <h1>웹툰 목록 페이지</h1>
      <ToonListBox>
        <AllToonList toons={toons}/>
      </ToonListBox>
    </div>
  );
}

const ToonListBox = styled.div`
  display: grid;
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  border: solid 2px;
  border-radius: 0.5rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`

export default WebtoonPage;
