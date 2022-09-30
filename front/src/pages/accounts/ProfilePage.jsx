import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChartShow from "../../components/common/Chart";
import ProfileBorder from "../../../src/assets/profilePage/ProfileBorder.png";
import Loading from "../../components/common/Loading";
import BookMark from "../../../src/assets/detail/BookMark.png";
import { profile, profileImage } from "../../features/accounts/profileSlice";
import { getTags } from "../../features/toons/searchSlice";
import { tagLike } from "../../features/details/detailSlice";
import { changeCurrentUser } from "../../features/accounts/loginSlice";
import profileImgItem from "../../assets/profile/profileImgItem";
import ToonItem from "../../components/toonlist/ToonItem";
import ModalFrame from "../../components/common/ModalFrame";
import Left from "../../../src/assets/detail/Left.png";
import Right from "../../../src/assets/detail/Right.png";
import Empty from "../../../src/assets/tuntunEmpty.png";
import MySwal from "../../components/common/SweetAlert";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [userImg, setUserImg] = useState();
  const [paintGraphData, setPaintGraphData] = useState();
  const [genreName, setgGenreName] = useState();
  const [genreValue, setgGenreValue] = useState();
  const [tagModal, setTagModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [count, setCount] = useState(1);
  const [slideCount, setSlideCount] = useState();
  const [unLikedTags, setUnLikedTags] = useState(); //검색가능한 데이터
  const [searchWord, setSearchWord] = useState("");
  const [filteredTags, setFilteredTags] = useState();
  const [profileImageId, setProfileImageId] = useState(0);
  const [toolTipDisplay, setToolTipDisplay] = useState("none");
  let slide;
  let myProfile
  useSelector(
    (state) => myProfile = state.login.currentUser
  )
  const boxColor = ["#fea3a3", "#92d7fa", "#fffbaf"];
  let boxColorIndex = 0;
  const profileNumbers = [0, 1, 2, 3, 4, 5];
  function getUserInfo() {
    dispatch(profile()).then((res) => {
      console.log(res.payload);
      setUserInfo(res.payload);
      setUserImg(profileImgItem[res.payload.data.profile_image_id].img);
      setProfileImageId(res.payload.data.profile_image_id);
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
      dispatch(getTags()).then((tagres) => {
        let temp = tagres.payload;
        let tempUnLikedTags = [];
        tempUnLikedTags = temp.filter(
          (tag) => !tempLikedTags.includes(tag.tag_id)
        );
        setUnLikedTags(tempUnLikedTags);
      });
    });
  }

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

  function switchTagModal() {
    setTagModal((prev) => !prev);
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

  function switchProfileModal() {
    setProfileModal((prev) => !prev);
  }

  function chooseProfile(e) {
    console.log(e.target.id);
    setProfileImageId(e.target.id);
  }

  function profileChange() {
    let data = { profile_image_id: profileImageId }
    dispatch(profileImage(data)).then(() => {
      let tempMyProfile = JSON.stringify(myProfile);
      tempMyProfile = JSON.parse(tempMyProfile);
      tempMyProfile.profile_image_id = profileImageId;
      dispatch(changeCurrentUser(tempMyProfile));
      getUserInfo();
      MySwal.fire({
        title: "프로필 사진 변경 완료!",
        icon: "success",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
      setProfileModal(false);
    });
  }

  function toolTipOn() {
    setToolTipDisplay("");
  }

  function toolTipOff() {
    setToolTipDisplay("none");
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const RatingGraphData = {
    margintop: 0,
    marginleft: 11,
    width: 20,
    labels: genreName,
    datasets: [
      {
        type: "doughnut",
        label: "선호하는 장르",
        fill: true,
        backgroundColor: ["#fea3a3", "#92d7fa", "#fffbaf"],
        borderColor: ["#fea3a3", "#92d7fa", "#fffbaf"],
        pointBorderColor: "#fff",
        pointBackgroundColor: "#fff",
        data: genreValue,
      },
    ],
  };

  const PaintStyleData = {
    margintop: -1,
    marginleft: 8.5,
    width: 25,
    labels: ["동글납작", "반짝섬세", "깔끔단정", "터프투박", "단순캐릭", "요즘트렌디"],
    datasets: [
      {
        type: "radar",
        label: "선호하는 그림체",
        fill: true,
        backgroundColor: "#5fc4f67b",
        borderColor: "#29adf07d",
        pointBorderColor: "#4bbffa",
        pointBackgroundColor: "#65ccff",
        data: paintGraphData,
      },
    ],
  };

  const RatingGraphOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },

  };

  const PaintStyleOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {

        pointLabels: {
          font: {
            size: 20
          }
        }
      }
    }
  };

  return (
    <PageBox>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Profile>
          <UserBorder>
            <UserBack>
              <UserInfo>
                <ToolTip id="ToolTip" data={toolTipDisplay}>프사 바꿀래?</ToolTip>
                <BorderImg src={ProfileBorder} alt="테두리" onClick={switchProfileModal} onMouseEnter={toolTipOn} onMouseOut={toolTipOff} />
                <ProfileImg src={userImg} alt="프로필사진" />
                {profileModal ? (
                  <ModalFrame
                    top="10vw"
                    width="75%"
                    height="auto"
                    _handleModal={switchProfileModal}
                  >
                    <ModalTitle>마음에 드는 프로필 이미지를 골라주세요</ModalTitle>
                    <Line></Line>
                    <ProfileZone>{profileNumbers.map((profileNumber) => profileNumber === Number(profileImageId) ? <ChoosedProfileCandidate src={profileImgItem[profileNumber].img} id={profileNumber} onClick={chooseProfile} key={profileNumbers}></ChoosedProfileCandidate> : <ProfileCandidate src={profileImgItem[profileNumber].img} id={profileNumber} onClick={chooseProfile} key={profileNumber}></ProfileCandidate>)}</ProfileZone>
                    <ChangeButton onClick={profileChange}> 변경 </ChangeButton>
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
                <Name>{userInfo.data.nickname} 님의 관심사</Name>
              </UserInfo>
              <ChartZone>
                <ChartTitleZone>
                  <PreferGenreTitleZone>
                    <PreferGenreTitle>선호하는 장르</PreferGenreTitle>
                    <SubTitleZone>
                      {userInfo.genre_list.length === 0 ||
                        userInfo.genre_list === undefined
                        ? "텅~"
                        : Object.keys(userInfo.genre_list).map((key) => (
                          <PreferGenreSubTitle key={key}>{key}<Square style={{ backgroundColor: boxColor[boxColorIndex++] }}></Square></PreferGenreSubTitle>
                        ))}
                    </SubTitleZone>
                  </PreferGenreTitleZone>
                  <PreferPaintStyleTitleZone>
                    <PreferPaintStyleTitle>선호하는 그림체</PreferPaintStyleTitle>
                    <SubTitleZone>
                      <PreferGenreSubTitle> 나는 어떤 그림체를 좋아할까?<PaintSquare></PaintSquare></PreferGenreSubTitle>
                    </SubTitleZone>
                  </PreferPaintStyleTitleZone>
                </ChartTitleZone>
                <ChartsBox>
                  <ChartBox>
                    <PreferGenre>
                      {genreName === undefined || genreName.length === 0 ? (
                        <PreferGenreEmpty><EmptyImg src={Empty} /><Bubble>저희 사이트를 열심히 이용하지 않은 당신!!!!　　　 분석 받을 자격이 없습니다!</Bubble></PreferGenreEmpty>
                      ) : (
                        <ChartShow data={RatingGraphData} options={RatingGraphOptions}></ChartShow>
                      )}
                    </PreferGenre>
                  </ChartBox>
                  <ChartBox>
                    <PreferPaintStyle>
                      {paintGraphData === undefined || paintGraphData.length === 0 ? (
                        "데이터가 부족해요!"
                      ) : (
                        <ChartShow data={PaintStyleData} options={PaintStyleOptions}></ChartShow>
                      )}
                    </PreferPaintStyle>
                  </ChartBox>
                </ChartsBox>
              </ChartZone>
            </UserBack>
          </UserBorder>
          <TagTitleZone>
            <TagTitle>
              찜한 태그{" "}
              {userInfo.data.tags.length === 0
                ? null
                : `(${userInfo.data.tags.length})`}
            </TagTitle>
            <TagAddRemove onClick={switchTagModal}>태그 추가/제거</TagAddRemove>
          </TagTitleZone>
          {tagModal ? (
            <ModalFrame
              top="5vw"
              width="75%"
              height="auto"
              _handleModal={switchTagModal}
            >
              <ModalTitle>태그 추가/제거</ModalTitle>
              <LikedTagZone>
                {userInfo.data.tags.length === 0 ||
                  userInfo.data.tags === undefined
                  ? <LikedTagEmptyMessage>추천에 반영될 태그를 검색 후 추가해 주세요!</LikedTagEmptyMessage>
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
              ? <LikedWebToonEmpty><EmptyImg src={Empty} /><Bubble>찜한 태그가 없어요...</Bubble></LikedWebToonEmpty>
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
              {count === 1 ? null : <PrevBtn src={Left} onClick={left} alt="좌"></PrevBtn>}
              {count === slideCount ? null : (
                <NextBtn src={Right} onClick={right} alt="우"></NextBtn>
              )}
            </>
          ) : null}
          <LikedWebToonBack>
            {userInfo.data.liked_webtoons.length === 0 ||
              userInfo.data.liked_webtoons === undefined ? (
              <LikedWebToonEmpty><EmptyImg src={Empty} /><Bubble>찜한 웹툰이 없어요...</Bubble></LikedWebToonEmpty>
            ) :
              <LikedWebToons id="slide">
                {userInfo.data.liked_webtoons.map((likedWebtoon) => (
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
                ))}</LikedWebToons>
            }
          </LikedWebToonBack>
          <TagTitleZone>
            <TagTitle>최근에 본 웹툰</TagTitle>
          </TagTitleZone>
          <ViewWebToonBack>
            <ViewWebToon>
              {userInfo.data.member_viewed_webtoons.length === 0
                ? <ViewWebToonEmpty><EmptyImg src={Empty} /><Bubble>최근에 본 웹툰이 없어요...</Bubble></ViewWebToonEmpty>
                : viewdWebtoon()}
            </ViewWebToon>
          </ViewWebToonBack>
        </Profile>
      )
      }
    </PageBox >
  );
}

export default ProfilePage;


const EmptyImg = styled.img`
  width: 10vw;
  height: 10vw;
`;

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
`;

const UserBack = styled.div`
  background-color: #feec91;
  border: 0.15vw solid black;
  border-radius: 1.2vw;
  margin: 0.65vw;
`;

const BorderImg = styled.img`
  cursor: pointer;
  position: absolute;
  margin-top: 0.5vw;
  margin-left: 0.5vw;
  width: 7vw;
  overflow: hidden;
  z-index: 1;
`;

const ProfileImg = styled.img`
  margin-top: 1.2vw;
  margin-left: 1.7vw;
  width: 4.8vw;
  height: 4.8vw;
  border-radius: 70%;
  object-fit: cover;
  z-index: 0;
`;

const ChangeButton = styled.div`
  cursor: pointer;
  font-size: 1.5vw;
  padding: 0.25vw;
  border: 0.1vw solid black;
  border-radius: 1vw;
  background-color: white;
  margin-top: 1.1vw;
  &:hover {
    background-color: pink;
  }
`

const UserInfo = styled.div`
  display: flex;
`;

const ToolTip = styled.div`
display: ${(props) => props.data};
position: absolute;
padding: 0.3vw;
border-radius: 0.3vw;
background-color: #4f4f4fb4;
color:white;
margin-top: -1vw;
margin-left: 1.8vw;
font-size: 0.6vw;
z-index: 1;
transition: 0.3s;
`;

const Name = styled.div`
  font-size: 1.2vw;
  margin-top: 3vw;
  margin-left: 1vw;
  font-weight: 600;
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
  font-size: 1.5vw;
`;
const LikedTagZone = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 3vw;
`;

const LikedTagEmptyMessage = styled.div`
  font-size: 1.5vw;
`

const Line = styled.div`
  margin-top: 1vw;
  border-top: 0.2vw solid black;
  width: 100%;
`;

const ProfileZone = styled.div`
flex-flow: wrap; 
`;

const ChoosedProfileCandidate = styled.img`
  cursor: pointer;
  margin: 1.5vw;
  width: 8vw;
  height: 8vw;
  border-radius: 70%;
  border-width: 0.5vw;
  border-color: #89c4ff;
  border-style: solid;
  object-fit: cover;
  z-index: 0;
  `;

const ProfileCandidate = styled.img`
  cursor: pointer;
  margin: 2vw;
  width: 8vw;
  height: 8vw;
  border-radius: 70%;
  object-fit: cover;
  z-index: 0;
  transition: 0.3s;
  &:hover {
    transform:scale(1.3);
  }

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

const PrevBtn = styled.img`
  cursor: pointer;
  position: absolute;
  width: 3vw;
  margin-top: 7.5vw;
  margin-left: 0.5vw;
  z-index: 1;
`;

const NextBtn = styled.img`
  cursor: pointer;
  position: absolute;
  width: 3vw;
  margin-top: 7.5vw;
  margin-left: 84.5vw;
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

const LikedWebToonEmpty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items:center
`

const Bubble = styled.div`
  margin-top: 0vw;
  position: relative;
  font-size: 1.2vw;
  padding: 0px 50px;
  height: 8vh;
  display: inline-block;
  background: #ffffff;
  border: 3px solid black;
  border-radius: 10px;
  :after {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-right-color: #ffffff;
    border-width: 16px;
    margin-top: -16px;
  }
  :before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(254, 236, 145, 0);
    border-right-color: black;
    border-width: 20px;
    margin-top: -20px;
  }
`

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

const ViewWebToonEmpty = styled.div`
height: 100%;
  width: 35vw;
  display: flex;
  align-items:center
  
`

const ChartZone = styled.div`
  background-color: white;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  margin: 1vw;
  height: 30vw;
  overflow: hidden;
`;

const ChartTitleZone = styled.div`
  display: flex;
  margin-top: 1vw;
`;

const PreferGenreTitleZone = styled.div`
  flex:1;
  text-align: center;
`;

const PreferGenreTitle = styled.div`
    font-size: 1.5vw;
    margin-bottom:1vw;
`;

const SubTitleZone = styled.div`
  display: flex;
  margin-bottom: 1.5vw;
  justify-content: center;
`

const PreferGenreSubTitle = styled.div`
    display: flex;
  font-size: 1vw;
  height:1vw;
  margin: 0.5vw;
`;

const Square = styled.div`
  width: 1vw;
  height: 1vw;
  margin-left: 0.2vw;
`;

const PreferPaintStyleTitleZone = styled.div`
  flex:1;
  text-align: center;
  font-size: 1.5vw;
`

const PreferPaintStyleTitle = styled.div`
  font-size: 1.5vw;
  margin-bottom:1vw;
`

const PaintSquare = styled.div`
  width: 1vw;
  height: 1vw;
  margin-left: 0.4vw;
  background-color: #5fc4f67b;
  border: solid 0.15vw #29adf07d;
`

const ChartsBox = styled.div`
display: flex;
`

const ChartBox = styled.div`
  flex: 1;
  background-color: white;
  height: 27.5vw;
`;

const PreferGenre = styled.div`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const PreferGenreEmpty = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 5vw;
  display: flex;
`;

const PreferPaintStyle = styled.div`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
