// import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

function ToonItem({ item }) {
  
  // 작가 이름 추출
  let authors = ''
  for (const num of Array(item.authors.length).keys()) {
    if (num > 0) {
      authors += ' / '
      authors += item.authors[num].name
    } else {
      authors += item.authors[num].name
    }
  }

  const navigate = useNavigate();

  function moveDetail() {
    navigate(`/detail/${item.webtoon_id}`);
  }

  return (
    <div onClick={moveDetail}>
      <img src={item.thumbnail} alt="" />
      <h3>{item.title}</h3>
      <p>{authors}</p>
    </div>
  );
}

export default ToonItem;
