import styled from 'styled-components'
import AllToonList from "../../components/toonlist/AllToonList"

function WebtoonPage() {
  return (
    <div>
      <h1>웹툰 목록 페이지</h1>
      <ToonListBox>
        <AllToonList />
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
