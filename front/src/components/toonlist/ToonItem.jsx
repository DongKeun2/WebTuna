import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { hover } from "../../assets/cursor/cursorItem";

function ToonItem({ item, main, toontoon, today }) {
  // 작가 이름 추출
  let authors = "";
  for (const num in item.author_name) {
    if (num > 0) {
      authors += " / ";
      authors += item.author_name[num];
    } else {
      authors += item.author_name[num];
    }
  }

  const navigate = useNavigate();

  function moveDetail() {
    navigate(`/detail/${item.webtoon_id}`);
    window.scrollTo(0, 0);
  }

  return (
    <OneToon>
      <ImgBox
        main={main}
        toontoon={toontoon}
        today={today}
        onClick={moveDetail}
      >
        <ToonThumbnail src={item.thumbnail} alt="" />
      </ImgBox>
      <ToonInfo onClick={moveDetail}>
        <ToonTitle>{item.title}</ToonTitle>
        <ToonAuthor>{authors}</ToonAuthor>
      </ToonInfo>
    </OneToon>
  );
}

const OneToon = styled.div`
  padding: 0.8vw;
  padding-bottom: 0.3vw;
`;

const ImgBox = styled.div`
  background-color: white;
  width: 100%;
  height: ${(props) =>
    props.main
      ? "18vh"
      : props.toontoon
      ? "12vw"
      : props.today
      ? "20vh"
      : "15vw"};
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  cursor: url(${hover}) 13 13, auto;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const ToonThumbnail = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
`;

const ToonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.2vw;
  padding-bottom: 0.2vw;
  background-color: white;
  border-bottom-left-radius: 0.8vw;
  border-bottom-right-radius: 0.8vw;
  cursor: url(${hover}) 13 13, auto;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const ToonTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;

const ToonAuthor = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1vw;
  font-weight: 500;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;

export default ToonItem;
