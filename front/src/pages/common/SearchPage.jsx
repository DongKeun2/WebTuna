import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AllToonList from "../../components/toonlist/AllToonList";
import ToonLoading from "../../components/toonlist/ToonLoading";
import MoveTop from "../../components/common/MoveTop";
import {
  changeKeyword,
  changePages,
  addToons,
  searchToons,
  changeIsLoad,
  changeWord,
  changePossibleFetch,
} from "../../features/toons/searchSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const location = decodeURI(useLocation().pathname.split("/")[2]);

  const [fetching, setFetching] = useState(false);
  const possibleFetch = useSelector((state) => state.search.possibleFetch);
  const pages = useSelector((state) => state.search.pages);
  const keyword = useSelector((state) => state.search.keyword);
  sessionStorage.setItem("url", `/search/${keyword}`);
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
      !fetching &&
      possibleFetch
    ) {
      dispatch(changePages(pages + 1));
      fetchNextPage();
    }
  };
  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const fetchNextPage = async () => {
    setFetching(true);
    const data = {
      keyword,
      pages: pages + 1,
    };
    dispatch(addToons(data)).then(() => {
      setFetching(false);
    });
  };

  const toonList = useSelector((state) => state.search.toonList);
  const word = useSelector((state) => state.search.word);
  const isLoad = useSelector((state) => state.search.isLoad);

  useEffect(() => {
    dispatch(changeCurrentpage(""));
    dispatch(changeKeyword(location));
    dispatch(changeWord(location));
    const data = {
      pages: 1,
      keyword: location,
    };
    dispatch(changeIsLoad(true));
    dispatch(changePossibleFetch(true));
    dispatch(searchToons(data)).then(() => {
      dispatch(changeIsLoad(false));
    });
    return () => {
      dispatch(changeKeyword(""));
    };
  }, [dispatch, location]);

  return (
    <Container>
      <MoveTop></MoveTop>
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
`;

const PageBox = styled.div`
  width: 96%;
  min-height: 40vw;
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
  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const EmptyMsg = styled.p`
  margin-top: 10vw;
  font-size: 1.5vw;
  font-weight: 600;
  text-align: center;
`;
