import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchToonlist, addToonlist, changePage, changeFetchPossible } from "../../features/toons/toonlistSlice"
import styled from 'styled-components'
import AllToonList from "../../components/toonlist/AllToonList"
import ModalFrame from "../../components/common/ModalFrame";
import ToonLoading from "../../components/toonlist/ToonLoading"
import Fish_0 from "../../assets/filter/fish0.png"

function WebtoonPage() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      page: 1,
    };
    dispatch(changePage(1));
    dispatch(changeFetchPossible(true));
    dispatch(fetchToonlist(data));
    window.scrollTo(0, 0);
  }, [dispatch]);

  const toons = useSelector((state) => state.toonlist.toons) || [];

  const [fetching, setFetching] = useState(false);
  const fetchPossible = useSelector((state) => state.toonlist.fetchPossible);
  const page = useSelector((state) => state.toonlist.page);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      !fetching &&
      fetchPossible
    ) {
      dispatch(changePage(page + 1));
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const fetchNextPage = async () => {
    setFetching(true);
    const data = {
      page: page+1,
    };
    dispatch(addToonlist(data)).then(() => {
      setFetching(false);
    });
  };
  
  function switchModal() {
    setModal((prev) => !prev);
  }

  return (
    <Container>
      <PageBox>
        <HeaderBox>
          <PageTitle>전체 웹툰 목록</PageTitle>
          <FilterBtn onClick={switchModal}>필터</FilterBtn>
          {modal ? (
            <ModalFrame top="1vw" width="75%" height="auto" _handleModal={switchModal}>
              <ModalContainer>
                <FilterBox>
                  <PlatformBox>
                    <GroupHeader>플랫폼</GroupHeader>
                    <PlatformGroup>
                      <PlatformBtn>네이버</PlatformBtn>
                      <PlatformBtn>카카오웹툰</PlatformBtn>
                      <PlatformBtn>카카오페이지</PlatformBtn>
                    </PlatformGroup>
                  </PlatformBox>
                  <DayBox>
                    <GroupHeader>요일</GroupHeader>
                    <DayGroup>
                      <DayBtn>월</DayBtn>
                      <DayBtn>화</DayBtn>
                      <DayBtn>수</DayBtn>
                      <DayBtn>목</DayBtn>
                      <DayBtn>금</DayBtn>
                      <DayBtn>토</DayBtn>
                      <DayBtn>일</DayBtn>
                      <DayBtn>완결</DayBtn>
                    </DayGroup>
                  </DayBox>
                  <GenreBox>
                    <GroupHeader>장르</GroupHeader>
                    <GenreGroup>
                      <GenreBtn>스토리</GenreBtn>
                      <GenreBtn>로맨스</GenreBtn>
                      <GenreBtn>판타지</GenreBtn>
                      <GenreBtn>드라마</GenreBtn>
                      <GenreBtn>스릴러</GenreBtn>
                      <GenreBtn>옴니버스</GenreBtn>
                      <GenreBtn>일상</GenreBtn>
                      <GenreBtn>액션</GenreBtn>
                      <GenreBtn>에피소드</GenreBtn>
                      <GenreBtn>무협/사극</GenreBtn>
                      <GenreBtn>스포츠</GenreBtn>
                      <GenreBtn>개그</GenreBtn>
                      <GenreBtn>감성</GenreBtn>
                      <GenreBtn>소년</GenreBtn>
                      <GenreBtn>BL</GenreBtn>
                    </GenreGroup>
                  </GenreBox>
                  <TagBox>
                    <GroupHeader>태그</GroupHeader>
                  </TagBox>
                </FilterBox>
                <ImgBox>
                  <FishingImg src={Fish_0}/>
                </ImgBox>
              </ModalContainer>
            </ModalFrame>
          ) : null}
        </HeaderBox>
        {toons.length ? (
          <ToonListBox>
            <AllToonList toons={toons} />
          </ToonListBox>
        ) : (
          <ToonListBox>
            <ToonLoading num={20} ></ToonLoading>
          </ToonListBox>
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

const ModalContainer = styled.div`
  width: 98%;
  @media screen and (max-width: 750px) {
    width: 80%;
  }
  height: 43vw;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid; */
  @media screen and (max-width: 750px) {
    height: auto;
    margin-top: 15px;
  }
`

const FilterBox = styled.div`
  width: 48%;
  @media screen and (max-width: 750px) {
    width: 98%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
  height: 100%;
  /* border: 1px solid blue; */
`

const PlatformBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 16%;
  @media screen and (max-width: 750px) {
    height: 70px;
  }
  /* border: 1px solid green; */
`

const DayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 24%;
  @media screen and (max-width: 750px) {
    height: 120px;
  }
  /* border: 1px solid pink; */
`

const GenreBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 32%;
  @media screen and (max-width: 750px) {
    height: 150px;
  }
  /* border: 1px solid yellow; */
`

const TagBox = styled.div`
  width: 100%;
  height: 28%;
  @media screen and (max-width: 750px) {
    height: 80px;
  }
  /* border: 1px solid gray; */
`

const PlatformGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PlatformBtn = styled.div`
  width: 30%;
  margin-bottom: 0.5vw;
  padding: 0.4vw 0;
  font-size: 12px;
  text-align: center;
  border: 1px solid #D1E2FF;
  border-radius: 0.3vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    border-radius: 5px;
  }
  cursor: pointer;
`

const DayGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const DayBtn = styled.div`
  width: 20%;
  margin-bottom: 0.8vw;
  padding: 0.3vw 0;
  font-size: 12px;
  text-align: center;
  border: 1px solid #D1E2FF;
  border-radius: 0.3vw;
  @media screen and (max-width: 750px) {
    padding: 0.4vw 0;
    font-size: 10px;
    margin-bottom: 8px;
    border-radius: 5px;
  }
  cursor: pointer;
`

const GenreGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const GenreBtn = styled.div`
  width: 19%;
  margin-bottom: 1vw;
  padding: 0.4vw 0;
  font-size: 11px;
  text-align: center;
  border: 1px solid #D1E2FF;
  border-radius: 0.3vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    padding: 0.5vw 0;
    margin-bottom: 8px;
    border-radius: 5px;
  }
  cursor: pointer;
`

const GroupHeader = styled.p`
  width: 100%;
  margin: 0.5vw auto;
  padding-bottom: 0.5vw;
  font-size: 1.5vw;
  @media screen and (max-width: 750px) {
    font-size: 12px;
  }
  font-weight: 600;
  border-bottom: 1px solid;
`

const ImgBox = styled.div`
  @media screen and (max-width: 750px) {
    display: none;
  }
  width: 48%;
  height: 100%;
  /* border: 1px solid red; */
`

const FishingImg = styled.img`
  width: 100%;
  height: 100%;
`

const ToonListBox = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`

export default WebtoonPage;
