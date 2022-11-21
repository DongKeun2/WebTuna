import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchToonlist,
  addToonlist,
  changePage,
  changeFetchPossible,
} from "../../features/toons/toonlistSlice";
import {
  filterToons,
  changeFilterInfo,
  changePlatform,
  changeDay,
  changeGenre,
  changeTag,
  changeIsLoad,
  changePossibleFetch,
<<<<<<< HEAD
} from "../../features/toons/filterSlice";
<<<<<<< HEAD
import { changeCurrentpage } from "../../features/toons/navBarSlice";
=======
import { getTags } from "../../features/toons/searchSlice";
>>>>>>> f8cfcbc (feat: 필터에 태그 추가)
import styled from "styled-components";
import AllToonList from "../../components/toonlist/AllToonList";
import ModalFrame from "../../components/common/ModalFrame";
import ToonLoading from "../../components/toonlist/ToonLoading";
import Fish_0 from "../../assets/filter/fish0.png";
import Fish_1 from "../../assets/filter/fish1.png";
import Fish_2 from "../../assets/filter/fish2.png";
import Fish_3 from "../../assets/filter/fish3.png";
import Fish_4 from "../../assets/filter/fish4.png";
import Fish_5 from "../../assets/filter/fish5.png";
import { forbidden } from "../../assets/cursor/cursorItem";
=======
} from "../../features/toons/filterSlice"
import styled from 'styled-components'
import AllToonList from "../../components/toonlist/AllToonList"
import ModalFrame from "../../components/common/ModalFrame"
import ToonLoading from "../../components/toonlist/ToonLoading"
import MoveTop from "../../components/common/MoveTop"
import Fish_0 from "../../assets/filter/fish0.png"
import Fish_1 from "../../assets/filter/fish1.png"
import Fish_2 from "../../assets/filter/fish2.png"
import Fish_3 from "../../assets/filter/fish3.png"
import Fish_4 from "../../assets/filter/fish4.png"
import Fish_5 from "../../assets/filter/fish5.png"
>>>>>>> 9e0eee3 (feat: 무한스크롤 있는 페이지에 최상단 이동 버튼 추가)

function WebtoonPage() {
  sessionStorage.setItem("url", "/webtoonlist");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changeCurrentpage("toons"));
    const data = {
      page: 1,
    };
    dispatch(
      changeFilterInfo({
        platform: [],
        day: [],
        genre: [],
        tag: [],
      })
    );
    dispatch(changePage(1));
    dispatch(changeFetchPossible(true));
    dispatch(fetchToonlist(data));
    window.scrollTo(0, 0);
  }, [dispatch]);

  const toons = useSelector((state) => state.toonlist.toons) || [];

  const [fetching, setFetching] = useState(false);
  const fetchPossible = useSelector((state) => state.toonlist.fetchPossible);
  const page = useSelector((state) => state.toonlist.page);
  const [allTags, setAllTags] = useState();
  const [noPickTags, setNoPickTags] = useState();
  const [searchedTags, setSearchedTags] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    dispatch(getTags()).then((res) => {
      console.log(res.payload);
      setAllTags(res.payload);
      setNoPickTags(res.payload);
    });
  }, [])

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
      page: page + 1,
    };
    dispatch(addToonlist(data)).then(() => {
      setFetching(false);
    });
  };

  const [modal, setModal] = useState(false);

  function switchModal() {
    setModal((prev) => !prev);
  }

  const filterInfo = useSelector((state) => state.filter.filterInfo);
  const platformList = useSelector((state) => state.filter.filterInfo.platform);
  const dayList = useSelector((state) => state.filter.filterInfo.day);
  const genreList = useSelector((state) => state.filter.filterInfo.genre);
  const tagList = useSelector((state) => state.filter.filterInfo.tag);

  const clickedNum = platformList.length + dayList.length + genreList.length + tagList.length;

  function changePlatformList(e) {
    dispatch(changePlatform(Number(e.target.value)));
  }

  function changeDayList(e) {
    dispatch(changeDay(Number(e.target.value)));
  }

  function changeGenreList(e) {
    dispatch(changeGenre(Number(e.target.value)));
  }

  function AddTagList(e) {
    let tempNoPickTags = noPickTags.filter((tag) => tag.tag_id !== Number(e.target.value));
    setNoPickTags(tempNoPickTags);
    dispatch(changeTag(Number(e.target.value)));
    setSearchWord("");
  }

  function RemoveTagList(e) {
    let tempNoPickTags = [...noPickTags, allTags[e.target.value - 1]];
    setNoPickTags(tempNoPickTags);
    dispatch(changeTag(Number(e.target.value)));
    setSearchWord("");
  }

  function submitFilter() {
    const data = {
      page: 1,
      checked: filterInfo,
    };
    sessionStorage.setItem("filterInfo", JSON.stringify(filterInfo));
    dispatch(changeIsLoad(true));
    dispatch(changePossibleFetch(true));
    dispatch(filterToons(data)).then((res) => {
      dispatch(changeIsLoad(false));
      navigate(`/filter`);
      window.scrollTo(0, 0);
    });
  }

  function search(e) {
    setSearchWord(e.target.value);
    console.log(e.target.value);
    let tempFilteredTags = [];
    tempFilteredTags = noPickTags.filter((allTag) =>
      allTag.name.includes(e.target.value)
    );
    setSearchedTags(tempFilteredTags);
  }

  return (
    <Container>
      <MoveTop></MoveTop>
      <PageBox>
        <HeaderBox>
          <PageTitle>전체 웹툰 목록</PageTitle>
          <FilterBtn onClick={switchModal}>필터</FilterBtn>
          {modal ? (
            <ModalFrame
              top="0.3vw"
              width="75%"
              height="auto"
              _handleModal={switchModal}
            >
              <ModalContainer>
                <FilterBox>
                  <PlatformBox>
                    <GroupHeader>플랫폼</GroupHeader>
                    <PlatformGroup>
                      <PlatformBtn
                        active={platformList.includes(1)}
                        onClick={changePlatformList}
                        value={1}
                      >
                        네이버
                      </PlatformBtn>
                      <PlatformBtn
                        active={platformList.includes(2)}
                        onClick={changePlatformList}
                        value={2}
                      >
                        카카오웹툰
                      </PlatformBtn>
                      <PlatformBtn
                        active={platformList.includes(3)}
                        onClick={changePlatformList}
                        value={3}
                      >
                        카카오페이지
                      </PlatformBtn>
                    </PlatformGroup>
                  </PlatformBox>
                  <DayBox>
                    <GroupHeader>요일</GroupHeader>
                    <DayGroup>
                      <DayBtn
                        active={dayList.includes(1)}
                        onClick={changeDayList}
                        value={1}
                      >
                        월
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(2)}
                        onClick={changeDayList}
                        value={2}
                      >
                        화
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(3)}
                        onClick={changeDayList}
                        value={3}
                      >
                        수
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(4)}
                        onClick={changeDayList}
                        value={4}
                      >
                        목
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(5)}
                        onClick={changeDayList}
                        value={5}
                      >
                        금
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(6)}
                        onClick={changeDayList}
                        value={6}
                      >
                        토
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(7)}
                        onClick={changeDayList}
                        value={7}
                      >
                        일
                      </DayBtn>
                      <DayBtn
                        active={dayList.includes(8)}
                        onClick={changeDayList}
                        value={8}
                      >
                        완결
                      </DayBtn>
                    </DayGroup>
                  </DayBox>
                  <GenreBox>
                    <GroupHeader>장르</GroupHeader>
                    <GenreGroup>
                      <GenreBtn
                        active={genreList.includes(1)}
                        onClick={changeGenreList}
                        value={1}
                      >
                        스토리
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(2)}
                        onClick={changeGenreList}
                        value={2}
                      >
                        로맨스
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(3)}
                        onClick={changeGenreList}
                        value={3}
                      >
                        판타지
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(4)}
                        onClick={changeGenreList}
                        value={4}
                      >
                        드라마
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(5)}
                        onClick={changeGenreList}
                        value={5}
                      >
                        스릴러
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(6)}
                        onClick={changeGenreList}
                        value={6}
                      >
                        옴니버스
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(7)}
                        onClick={changeGenreList}
                        value={7}
                      >
                        일상
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(8)}
                        onClick={changeGenreList}
                        value={8}
                      >
                        액션
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(9)}
                        onClick={changeGenreList}
                        value={9}
                      >
                        에피소드
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(10)}
                        onClick={changeGenreList}
                        value={10}
                      >
                        무협/사극
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(11)}
                        onClick={changeGenreList}
                        value={11}
                      >
                        스포츠
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(12)}
                        onClick={changeGenreList}
                        value={12}
                      >
                        개그
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(13)}
                        onClick={changeGenreList}
                        value={13}
                      >
                        감성
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(14)}
                        onClick={changeGenreList}
                        value={14}
                      >
                        소년
                      </GenreBtn>
                      <GenreBtn
                        active={genreList.includes(15)}
                        onClick={changeGenreList}
                        value={15}
                      >
                        BL
                      </GenreBtn>
                    </GenreGroup>
                  </GenreBox>
                  <TagBox>
                    <GroupHeader>태그<TagSaerchBar placeholder="추가히실 태그를 입력해주세요" onChange={search} value={searchWord}></TagSaerchBar></GroupHeader>
                    <PickTagGroup>{tagList.length === 0 ? <EmptyTag>선택된 태그가 없습니다</EmptyTag> : tagList.map((tag) => <PickTagBtn key={tag} onClick={RemoveTagList} value={tag}>{allTags[tag - 1].name}</PickTagBtn>)}</PickTagGroup>
                    <SearchTagGroup>{searchWord === "" ? null : searchedTags.map((searchTag) =>
                      <TagBtn
                        key={searchTag.tag_id}
                        onClick={AddTagList}
                        value={searchTag.tag_id}
                      >{searchTag.name}</TagBtn>)}</SearchTagGroup>
                  </TagBox>
                </FilterBox>
                <ImgBox>
                  {clickedNum >= 5 ? (
                    <FishingImg src={Fish_5} />
                  ) : clickedNum === 4 ? (
                    <FishingImg src={Fish_4} />
                  ) : clickedNum === 3 ? (
                    <FishingImg src={Fish_3} />
                  ) : clickedNum === 2 ? (
                    <FishingImg src={Fish_2} />
                  ) : clickedNum === 1 ? (
                    <FishingImg src={Fish_1} />
                  ) : (
                    <FishingImg src={Fish_0} />
                  )}
                </ImgBox>
              </ModalContainer>
              <SubmitBtn
                active={clickedNum > 0 ? true : false}
                onClick={clickedNum > 0 ? submitFilter : null}
              >
                확인
              </SubmitBtn>
            </ModalFrame>
          ) : null}
        </HeaderBox>
        {toons.length ? (
          <ToonListBox>
            <AllToonList toons={toons} />
          </ToonListBox>
        ) : (
          <ToonListBox>
            <ToonLoading num={20}></ToonLoading>
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
`;

const PageBox = styled.div`
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  border: solid 2px;
  border-radius: 0.8rem;
  background-color: #fff5c3;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.8vw;
  padding-right: 0.8vw;
`;

const PageTitle = styled.p`
  font-size: 1.8vw;
  font-weight: 700;
  margin-top: 2vw;
  margin-bottom: 2vw;
  margin-left: 1vw;
`;

const FilterBtn = styled.button`
  font-size: 1vw;
  font-weight: 700;
  padding: 0.8vw 2vw;
  margin-right: 1vw;
  background-color: white;
  text-align: center;
  border: 3px solid #d1e2ff;
  border-radius: 0.8vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    border-radius: 8px;
  }
`;

const ModalContainer = styled.div`
  width: 98%;
  height: 43vw;
  margin-top: 0.5vw;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 750px) {
    width: 80%;
    height: auto;
    margin-top: 15px;
  }
`;

const FilterBox = styled.div`
  width: 48%;
  @media screen and (max-width: 750px) {
    width: 98%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
  height: 100%;
`;

const PlatformBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 16%;
  @media screen and (max-width: 750px) {
    height: 70px;
  }
`;

const DayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 24%;
  @media screen and (max-width: 750px) {
    height: 120px;
  }
`;

const GenreBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 32%;
  @media screen and (max-width: 750px) {
    height: 150px;
  }
`;

const TagBox = styled.div`
  width: 100%;
  height: 28%;
  @media screen and (max-width: 750px) {
    height: 80px;
  }
`;

const PlatformGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PlatformBtn = styled.button`
  background-color: ${(props) => (props.active ? "#D1E2FF" : "white")};
  width: 30%;
  margin-bottom: 0.5vw;
  padding: 0.4vw 0;
  font-size: 12px;
  text-align: center;
  border: 1px solid #d1e2ff;
  border-radius: 0.3vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    border-radius: 5px;
  }
`;

const DayGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const DayBtn = styled.button`
  background-color: ${(props) => (props.active ? "#D1E2FF" : "white")};
  width: 21%;
  margin-bottom: 0.8vw;
  padding: 0.3vw 0;
  font-size: 12px;
  text-align: center;
  border: 1px solid #d1e2ff;
  border-radius: 0.3vw;
  @media screen and (max-width: 750px) {
    padding: 0.4vw 0;
    font-size: 10px;
    margin-bottom: 8px;
    border-radius: 5px;
  }
`;

const GenreGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const GenreBtn = styled.button`
  background-color: ${(props) => (props.active ? "#D1E2FF" : "white")};
  width: 19%;
  margin-bottom: 1vw;
  padding: 0.4vw 0;
  font-size: 11px;
  text-align: center;
  border: 1px solid #d1e2ff;
  border-radius: 0.3vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    padding: 0.5vw 0;
    margin-bottom: 8px;
    border-radius: 5px;
  }
`;

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
`;

const TagSaerchBar = styled.input`
  margin-top:1vw;
  width: 10vw;
  border-radius: 0.2vw;
  float: right;
`

const PickTagGroup = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  border-bottom: 1px solid;
`

const EmptyTag = styled.div`
  font-size:0.8vw;
`

const PickTagBtn = styled.button`
  background-color: #D1E2FF;
  width: 19%;
  margin-bottom: 0.5vw;
  margin-right:0.3vw;
  padding: 0.4vw 0;
  font-size: 11px;
  text-align: center;
  border: 1px solid #d1e2ff;
  border-radius: 0.3vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    padding: 0.5vw 0;
    margin-bottom: 8px;
    border-radius: 5px;
  }
  `;

const SearchTagGroup = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  `;

const TagBtn = styled.button`
  background-color: white;
  width: 19%;
  margin-bottom: 0.5vw;
  margin-right:0.3vw;
  padding: 0.4vw 0;
  font-size: 11px;
  text-align: center;
  border: 1px solid #d1e2ff;
  border-radius: 0.3vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 750px) {
    font-size: 10px;
    padding: 0.5vw 0;
    margin-bottom: 8px;
    border-radius: 5px;
  }
`

const ImgBox = styled.div`
  @media screen and (max-width: 750px) {
    display: none;
  }
  width: 48%;
  height: 100%;
`;

const FishingImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SubmitBtn = styled.button`
  background-color: ${(props) => (props.active ? "#feec91" : "#e2e8f0")};
  font-weight: ${(props) => (props.active ? "700" : "500")};
  padding: 0.6vw 2vw;
  @media screen and (max-width: 750px) {
    padding: 8px 16px;
  }
  border-radius: 12px;
  border: 6px solid white;
  margin-top: 1vw;
  margin-bottom: 0.5vw;
  width: "50px";
  height: "30px";
  cursor: ${(props) => !props.active && `url(${forbidden}) 13 13, auto`};
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

export default WebtoonPage;
