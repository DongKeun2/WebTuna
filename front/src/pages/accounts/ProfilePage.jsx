import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChartShow from "../../components/common/Chart";
import ProfileBorder from "../../../src/assets/profilePage/ProfileBorder.png";
import Loading from "../../components/common/Loading";
import BookMark from "../../../src/assets/detail/BookMark.png";
import { profile } from "../../features/accounts/profileSlice";
import { getTags } from "../../features/toons/searchSlice";
import { tagLike } from "../../features/details/detailSlice";
import profileImgItem from "../../assets/profile/profileImgItem";
import ToonItem from "../../components/toonlist/ToonItem";
import ModalFrame from "../../components/common/ModalFrame";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [userImg, setUserImg] = useState();
  const [paintGraphData, setPaintGraphData] = useState();
  const [genreName, setgGenreName] = useState();
  const [genreValue, setgGenreValue] = useState();
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(1);
  const [slideCount, setSlideCount] = useState();
  const [unLikedTags, setUnLikedTags] = useState(); //검색가능한 데이터
  const [searchWord, setSearchWord] = useState("");
  const [filteredTags, setFilteredTags] = useState();

  let slide;

  function getUserInfo() {
    dispatch(profile()).then((res) => {
      console.log(res.payload);
      setUserInfo(res.payload);
      setUserImg(profileImgItem[res.payload.data.profile_image_id].img);
      let imageType = [];
      let gName = [];
      let gValue = [];
      let tempLikedTags = [];
      res.payload.data.tags.map((tag) => tempLikedTags.push(tag.tag_id));
      imageType.push(res.payload.image_type.image_type1);
      imageType.push(res.payload.image_type.image_type2);
      imageType.push(res.payload.image_type.image_type3);
      imageType.push(res.payload.image_type.image_type4);
      imageType.push(res.payload.image_type.image_type5);
      imageType.push(res.payload.image_type.image_type6);
      setPaintGraphData(imageType);
      Object.keys(res.payload.genre_list).map((key) => gName.push(key));
      setgGenreName(gName);
      Object.values(res.payload.genre_list).map((value) => gValue.push(value));
      setgGenreValue(gValue);
      setSlideCount(
        Math.ceil(Number(res.payload.data.liked_webtoons.length) / 4)
      );
      setIsLoading(false);
      console.log(res.payload.data.tags);
      dispatch(getTags()).then((tagres) => {
        let temp = tagres.payload;
        let tempUnLikedTags = [];
        tempUnLikedTags = temp.filter(
          (tag) => !tempLikedTags.includes(tag.tag_id)
        );
        setUnLikedTags(tempUnLikedTags);
        console.log(tempUnLikedTags);
      });
    });
  }

  // function getAllTags() {
  //   dispatch(getTags()).then((res) => {
  //     console.log(res.payload)
  //     let temp = [];
  //     Object.keys(res.payload).map((key) =>
  //       temp.push(key)
  //     )
  //     setAlltags(temp);
  //     for (const num in temp) {

  //     }

  //   })
  // }

  function viewdWebtoon() {
    const result = [];
    let size;
    userInfo.data.member_viewed_webtoons.length > 10
      ? (size = 10)
      : (size = userInfo.data.member_viewed_webtoons.length);
    for (let i = 0; i < size; i++) {
      result.push(
        <div key={userInfo.data.member_viewed_webtoons[i].webtoon.webtoon_id}>
          <ToonItem item={userInfo.data.member_viewed_webtoons[i].webtoon} />
        </div>
      );
    }
    return result;
  }

  function switchModal() {
    setModal((prev) => !prev);
  }

  function left() {
    slide = document.getElementById("slide");
    if (count === 1) {
      return;
    } else {
      let temp = Number(
        slide.style.left.substring(0, slide.style.left.length - 2)
      );
      slide.style.left = temp + 83 + "vw";
      setCount((prev) => prev - 1);
    }
  }

  function right() {
    slide = document.getElementById("slide");
    if (count === slideCount) {
      return;
    } else {
      let temp = Number(
        slide.style.left.substring(0, slide.style.left.length - 2)
      );
      slide.style.left = temp - 83 + "vw";
      setCount((prev) => prev + 1);
    }
  }

  function moveDetail(e) {
    navigate(`/detail/${e.target.parentNode.parentNode.id}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }

  function tagSwitch(e) {
    if (e.target.id) {
      dispatch(tagLike(e.target.id)).then((res) => {
        if (res.error) {
          console.log("태그 찜 실패");
        } else {
          getUserInfo();
          let tempFilteredTags = [];
          tempFilteredTags = unLikedTags.filter((unLikedTag) =>
            unLikedTag.name.includes(searchWord)
          );
          setFilteredTags(tempFilteredTags);
          setSearchWord("");
          console.log("태그 스위치~");
        }
      });
    } else {
      dispatch(tagLike(e.target.parentNode.id)).then((res) => {
        if (res.error) {
          console.log("태그 찜 실패");
        } else {
          getUserInfo();
          let tempFilteredTags = [];
          tempFilteredTags = unLikedTags.filter((unLikedTag) =>
            unLikedTag.name.includes(searchWord)
          );
          setFilteredTags(tempFilteredTags);
          setSearchWord("");
          console.log("태그 스위치~");
        }
      });
    }
  }

  function search(e) {
    setSearchWord(e.target.value);
    let tempFilteredTags = [];
    tempFilteredTags = unLikedTags.filter((unLikedTag) =>
      unLikedTag.name.includes(e.target.value)
    );
    setFilteredTags(tempFilteredTags);
    console.log(e.target.value);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const RatingGraphData = {
    margintop: 10,
    marginleft: 3,
    width: 30,
    labels: genreName,
    datasets: [
      {
        type: "doughnut",
        label: "선호하는 장르",
        fill: true,
        backgroundColor: ["tomato", "dodgerblue", "yellow"],
        borderColor: ["tomato", "dodgerblue", "yellow"],
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: genreValue,
      },
    ],
  };

  const PaintStyleData = {
    margintop: 5,
    marginleft: 15,
    width: 30,
    labels: ["순정", "무협", "양산형", "우산형", "우비형", "우리형"],
    datasets: [
      {
        type: "radar",
        label: "선호하는 그림체",
        fill: true,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: paintGraphData,
      },
    ],
  };

  return (
    <PageBox>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Profile>
          <UserBorder>
            <UserBack>
              <ImgBox>
                <BorderImg src={ProfileBorder} alt="테두리" />
                <ProfileImg src={userImg} alt="프로필사진" />
              </ImgBox>
              <UserInfo>
                <Name>{userInfo.data.nickname}</Name>
                <Heart>
                  <HeartNumber>
                    {userInfo.data.liked_webtoons.length}
                  </HeartNumber>
                </Heart>
              </UserInfo>
              <GenreZone>
                {userInfo.genre_list.length === 0 ||
                userInfo.genre_list === undefined
                  ? "텅~"
                  : Object.keys(userInfo.genre_list).map((key) => (
                      <Genre key={key}>#{key} </Genre>
                    ))}
              </GenreZone>
            </UserBack>
          </UserBorder>
          <TagTitleZone>
            <TagTitle>
              찜한 태그{" "}
              {userInfo.data.tags.length === 0
                ? null
                : `(${userInfo.data.tags.length})`}
            </TagTitle>
            <TagAddRemove onClick={switchModal}>태그 추가/제거</TagAddRemove>
          </TagTitleZone>
          {modal ? (
            <ModalFrame
              top="5vw"
              width="75%"
              height="auto"
              _handleModal={switchModal}
            >
              <ModalTitle>태그 추가/제거</ModalTitle>
              <LikedTagZone>
                {userInfo.data.tags.length === 0 ||
                userInfo.data.tags === undefined
                  ? "텅~"
                  : userInfo.data.tags.map((tag) => (
                      <LikedTag
                        key={tag.tag_id}
                        id={tag.tag_id}
                        onClick={tagSwitch}
                      >
                        <TagName>{tag.name}</TagName>
                        <MinusButton>-</MinusButton>
                      </LikedTag>
                    ))}
              </LikedTagZone>
              <Line></Line>
              <SearchBar
                placeholder="추가하고 싶은 태그를 입력하세요"
                value={searchWord}
                onChange={search}
              ></SearchBar>
              <FilterZone>
                {filteredTags === undefined || searchWord.length === 0
                  ? ""
                  : filteredTags.map((filteredTag) => (
                      <SearchTag
                        key={filteredTag.tag_id}
                        id={filteredTag.tag_id}
                        onClick={tagSwitch}
                      >
                        <TagName>{filteredTag.name}</TagName>
                        <PlusButton>+</PlusButton>
                      </SearchTag>
                    ))}
              </FilterZone>
            </ModalFrame>
          ) : null}
          <TagZone>
            {userInfo.data.tags.length === 0 || userInfo.data.tags === undefined
              ? "태그를 찜해주세요~"
              : userInfo.data.tags.map((tag) => (
                  <Tag key={tag.tag_id} id={tag.tag_id}>
                    <BookMarkImage src={BookMark} alt="북마크" />
                    <TagName>{tag.name}</TagName>
                  </Tag>
                ))}
          </TagZone>
          <WebToonTitleZone>
            <TagTitle>
              찜한 웹툰{" "}
              {userInfo.data.liked_webtoons.length === 0
                ? null
                : `(${userInfo.data.liked_webtoons.length})`}
            </TagTitle>
          </WebToonTitleZone>
          {slideCount >= 2 ? (
            <>
              {count === 1 ? null : <PrevBtn onClick={left}>좌</PrevBtn>}
              {count === slideCount ? null : (
                <NextBtn onClick={right}>우</NextBtn>
              )}
            </>
          ) : null}
          <LikedWebToonBack>
            <LikedWebToons id="slide">
              {userInfo.data.liked_webtoons.length === 0 ||
              userInfo.data.liked_webtoons === undefined ? (
                <div>찜한 웹툰이 없어요 ㅠ</div>
              ) : (
                userInfo.data.liked_webtoons.map((likedWebtoon) => (
                  <LikedWebToon
                    key={likedWebtoon.webtoon_id}
                    id={likedWebtoon.webtoon_id}
                  >
                    <ThumnailBox onClick={moveDetail}>
                      <LikedWebToonThumbnail
                        src={likedWebtoon.thumbnail}
                        alt="찜한 웹툰 이미지"
                      ></LikedWebToonThumbnail>
                    </ThumnailBox>
                    <ToonInfo>
                      <LikedWebToonTitle onClick={moveDetail}>
                        {likedWebtoon.title}
                      </LikedWebToonTitle>
                    </ToonInfo>
                  </LikedWebToon>
                ))
              )}
            </LikedWebToons>
          </LikedWebToonBack>
          <TagTitleZone>
            <TagTitle>최근에 본 웹툰</TagTitle>
          </TagTitleZone>
          <ViewWebToonBack>
            <ViewWebToon>
              {userInfo.data.member_viewed_webtoons.length === 0
                ? "웹툰좀 봐라"
                : viewdWebtoon()}
            </ViewWebToon>
          </ViewWebToonBack>
          <TagTitleZone>
            <TagTitle>{userInfo.data.nickname}님의 관심사</TagTitle>
          </TagTitleZone>
          <ChartBack>
            <ChartZone>
              <PreferGenre>
                {genreName === undefined || genreName.length === 0 ? (
                  "데이터가 부족해요!"
                ) : (
                  <ChartShow data={RatingGraphData}></ChartShow>
                )}
              </PreferGenre>
              <PreferPaintStyle>
                {paintGraphData === undefined || paintGraphData.length === 0 ? (
                  "데이터가 부족해요!"
                ) : (
                  <ChartShow data={PaintStyleData}></ChartShow>
                )}
              </PreferPaintStyle>
            </ChartZone>
          </ChartBack>
        </Profile>
      )}
    </PageBox>
  );
}

export default ProfilePage;

const PageBox = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10vw;
  padding: 0.5vw;
`;

const Profile = styled.div`
  margin: 0.65vw;
`;

const UserBorder = styled.div`
  border: 0.15vw solid black;
  background-color: white;
  border-radius: 1.5vw;
  height: 19.5vw;
`;

const UserBack = styled.div`
  display: flex;
  background-color: #feec91;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  margin: 0.65vw;
  height: 17.8vw;
`;

const ImgBox = styled.div`
  width: 18vw;
`;

const BorderImg = styled.img`
  position: absolute;
  margin-top: 1vw;
  margin-left: 2vw;
  width: 17vw;
  overflow: hidden;
  z-index: 1;
`;

const ProfileImg = styled.img`
  position: absolute;
  margin-top: 3.5vw;
  margin-left: 5.3vw;
  width: 11vw;
  height: 11vw;
  border-radius: 70%;
  object-fit: cover;
  z-index: 0;
`;

const UserInfo = styled.div`
  margin-top: 6vw;
  margin-left: 1vw;
  width: 20vw;
`;

const Name = styled.div`
  display: inline;
  font-size: 2.5vw;
  font-weight: 600;
`;

const Heart = styled.div`
  display: flex;
  margin-top: 1vw;
  margin-left: 0.2vw;
`;

const HeartNumber = styled.div`
  margin-left: 1vw;
  font-size: 2vw;
`;

const GenreZone = styled.div`
  width: 40vw;
  margin-left: 8vw;
  margin-top: 6vw;
  font-size: 2.5vw;
`;

const Genre = styled.div`
  display: inline;
`;

const TagTitleZone = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw 0vw 1vw 0vw;
`;

const TagTitle = styled.div`
  display: inline;
  font-size: 1.7vw;
  margin-top: 0.5vw;
  margin-left: 0.5vw;
`;

const TagZone = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 1.5vw;
  border: solid 0.15vw;
  border-top-left-radius: 1vw;
  border-bottom-left-radius: 1vw;
  border-bottom-right-radius: 1vw;
  background-color: #feec91;
`;

const TagAddRemove = styled.div`
  cursor: pointer;
  font-size: 1.5vw;
  padding: 0.25vw;
  z-index: 1;
  border: 0.1vw solid black;
  border-top-left-radius: 1vw;
  border-top-right-radius: 1vw;
  background-color: white;
  margin-top: 1.1vw;
  margin-bottom: -1.05vw;
  &:hover {
    background-color: pink;
  }
`;

const Tag = styled.div`
  display: flex;
  border: 0.1vw solid black;
  border-radius: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5vw;
  background-color: white;
`;

const SearchTag = styled.div`
  display: flex;
  cursor: pointer;
  border: 0.1vw solid black;
  border-radius: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5vw;
  transition: 0.5s;
  &:hover {
    background-color: pink;
  }
`;

const BookMarkImage = styled.img`
  flex: 1;
  width: 1.2vw;
  height: 2vw;
  padding-left: 1vw;
`;

const TagName = styled.div`
  flex: 1;
  margin-left: 0.8vw;
  margin-right: 0.8vw;
  margin-top: 0.2vw;
  font-size: 1.5vw;
`;

const MinusButton = styled.div`
  flex: 1;
  margin-left: 0.6vw;
  margin-right: 0.2vw;
  margin-top: -0.2vw;
  padding-right: 0.36vw;
  font-size: 2vw;
`;

const PlusButton = styled.div`
  flex: 1;
  margin-left: 0.38vw;
  margin-right: 0.2vw;
  margin-top: -0.2vw;
  font-size: 2vw;
`;

const ModalTitle = styled.div`
  margin-top: 2vw;
`;
const LikedTagZone = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 3vw;
`;

const Line = styled.div`
  border-top: 0.2vw solid black;
  width: 100%;
`;

const SearchBar = styled.input`
  margin-top: 3vw;
  width: 25vw;
  height: 3vw;
  font-size: 1.5vw;
`;

const FilterZone = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 3vw;
  padding: 1.5vw;
  border-top-left-radius: 1vw;
  border-bottom-left-radius: 1vw;
  border-bottom-right-radius: 1vw;
`;

const LikedTag = styled.div`
  display: flex;
  cursor: pointer;
  background-color: pink;
  border: 0.1vw solid black;
  border-radius: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5vw;
  transition: 0.5s;
  &:hover {
    background-color: white;
  }
`;

const WebToonTitleZone = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw 0vw 1vw 0vw;
`;

const PrevBtn = styled.div`
  cursor: pointer;
  position: absolute;
  margin-top: 7vw;
  margin-left: -1vw;
  font-size: 5vw;
  z-index: 1;
`;

const NextBtn = styled.div`
  cursor: pointer;
  position: absolute;
  margin-top: 7vw;
  margin-left: 84vw;
  font-size: 5vw;
  z-index: 1;
`;

const LikedWebToonBack = styled.div`
  display: flex;
  background-color: #feec91;
  height: 20vw;
  overflow: hidden;
  border-radius: 0.6vw;
  border: 0.15vw solid black;
`;

const LikedWebToons = styled.div`
  position: relative;
  display: flex;
  left: 0vw;
  background-color: #feec91;
  transition: all 1s;
`;

const LikedWebToon = styled.div`
  width: 16vw;
  margin-top: 1.5vw;
  margin-left: 4.75vw;
`;

const ThumnailBox = styled.div`
  background-color: white;
  width: 100%;
  height: 15vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  cursor: pointer;
`;

const LikedWebToonThumbnail = styled.img`
  object-fit: fill;
  width: 14vw;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
`;

const ToonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-bottom-left-radius: 0.8vw;
  border-bottom-right-radius: 0.8vw;
  cursor: pointer;
`;

const LikedWebToonTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;
const ViewWebToonBack = styled.div`
  display: flex;
  background-color: #feec91;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
`;

const ViewWebToon = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 2vw;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const ChartBack = styled.div`
  display: flex;
  background-color: #feec91;
  border: 0.15vw solid black;
  border-radius: 2vw;
`;

const ChartZone = styled.div`
  display: flex;
  background-color: white;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  margin: 1vw;
  width: 85vw;
  overflow: hidden;
`;

const PreferGenre = styled.div`
  flex: 1;
  margin-top: -7vw;
  background-color: white;
`;

const PreferPaintStyle = styled.div`
  flex: 1;
  margin-top: -3vw;
  margin-right: 10vw;
  margin-bottom: 3vw;
  background-color: white;
`;
