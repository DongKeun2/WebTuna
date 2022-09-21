import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function ToonItem({ item }) {
  
  // 작가 이름 추출
  let authors = ''
  for (const num in item.author_name) {
    if (num > 0) {
      authors += ' / '
      authors += item.author_name[num]
    } else {
      authors += item.author_name[num]
    }
  }

  const navigate = useNavigate();

  function moveDetail() {
    navigate(`/detail/${item.webtoon_id}`);
  }

  return (
    <OneToon onClick={moveDetail}>
      <ImgBox>
        <ToonThumbnail src={item.thumbnail} alt="" />
      </ImgBox>
      <ToonInfo>
        <ToonTitle>{item.title}</ToonTitle>
        <ToonAuthor>{authors}</ToonAuthor>
      </ToonInfo>
    </OneToon>
  );
}

const OneToon = styled.div`
  height: 93%;
  padding: 0.8vw;
  padding-bottom: 0.3vw;
`

const ImgBox = styled.div`
  width: 100%;
  height: 15vw;
`

const ToonThumbnail = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`

const ToonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ToonTitle = styled.p`
  font-size: 1.3vw;
  font-weight: 600;
  margin-top: 0.2vw;
  margin-bottom: 0;
`

const ToonAuthor = styled.p`
  font-size: 1vw;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0.2vw;
`

export default ToonItem;
