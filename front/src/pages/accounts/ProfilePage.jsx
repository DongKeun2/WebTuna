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
import {
  changeCurrentUser,
  fetchInfo,
} from "../../features/accounts/loginSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import profileImgItem from "../../assets/profile/profileImgItem";
import ToonItem from "../../components/toonlist/ToonItem";
import ModalFrame from "../../components/common/ModalFrame";
import MoveTop from "../../components/common/MoveTop";
import Left from "../../../src/assets/detail/Left.png";
import Right from "../../../src/assets/detail/Right.png";
import Empty from "../../../src/assets/tuntunEmpty.png";
import MySwal from "../../components/common/SweetAlert";
import { hover } from "../../assets/cursor/cursorItem";
import "./ProfilePage.css";

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
  let slide;
  let myProfile;
  useSelector((state) => (myProfile = state.login.currentUser));
  const boxColor = ["#fea3a3", "#92d7fa", "#fffbaf"];
  let boxColorIndex = 0;
  const profileNumbers = [0, 1, 2, 3, 4, 5];
  function getUserInfo() {
    dispatch(profile()).then((res) => {
      setUserInfo(res.payload);
      setUserImg(profileImgItem[res.payload.data.profile_image_id].img);
      setProfileImageId(res.payload.data.profile_image_id);
      let imageType = [];
      let gName = [];
      let gValue = [];
      let total = 0;
      let tempLikedTags = [];
      res.payload.data.tags.map((tag) => tempLikedTags.push(tag.tag_id));
      imageType.push(res.payload.image_type.image_type1 / 2 + 15);
      imageType.push(res.payload.image_type.image_type2 / 2 + 15);
      imageType.push(res.payload.image_type.image_type3 / 2 + 15);
      imageType.push(res.payload.image_type.image_type4 / 2 + 15);
      imageType.push(res.payload.image_type.image_type5 / 2 + 15);
      imageType.push(res.payload.image_type.image_type6 / 2 + 15);
      setPaintGraphData(imageType);
      Object.keys(res.payload.genre_list).map((key) => gName.push(key));
      setgGenreName(gName);
      Object.values(res.payload.genre_list).map((value) => gValue.push(value));
      for (let i = 0; i < gValue.length; i++) {
        total += gValue[i];
      }
      for (let i = 0; i < gValue.length; i++) {
        gValue[i] = ((gValue[i] * 100) / total).toFixed(2);
      }

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
    setSearchWord("");
  }

  function left(e) {
    slide = document.getElementById("slide");
    let tempClassName = e.target.className;
    e.target.className += " disabledbutton";
    slide.className += " trans";
    if (count === 1) {
      return;
    } else {
      let temp = Number(
        slide.style.left.substring(0, slide.style.left.length - 2)
      );
      slide.style.left = temp + 83 + "vw";
      setCount((prev) => prev - 1);
      setTimeout(() => {
        slide.className = "LikedWebToons";
        e.target.className = tempClassName;
      }, 1000);
    }
  }

  function right(e) {
    slide = document.getElementById("slide");
    let tempClassName = e.target.className;
    e.target.className += " disabledbutton";
    slide.className += " trans";
    if (count === slideCount) {
      return;
    } else {
      let temp = Number(
        slide.style.left.substring(0, slide.style.left.length - 2)
      );
      slide.style.left = temp - 83 + "vw";
      setCount((prev) => prev + 1);
      setTimeout(() => {
        slide.className = "LikedWebToons";
        e.target.className = tempClassName;
      }, 1000);
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
        } else {
          getUserInfo();
          dispatch(fetchInfo()).then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.payload.user));
          });
          let tempFilteredTags = [];
          tempFilteredTags = unLikedTags.filter((unLikedTag) =>
            unLikedTag.name.includes(searchWord)
          );
          setFilteredTags(tempFilteredTags);
          setSearchWord("");
        }
      });
    } else {
      dispatch(tagLike(e.target.parentNode.id)).then((res) => {
        if (res.error) {
        } else {
          getUserInfo();
          dispatch(fetchInfo()).then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.payload.user));
          });
          let tempFilteredTags = [];
          tempFilteredTags = unLikedTags.filter((unLikedTag) =>
            unLikedTag.name.includes(searchWord)
          );
          setFilteredTags(tempFilteredTags);
          setSearchWord("");
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
  }

  function switchProfileModal() {
    setProfileModal((prev) => !prev);
  }

  function chooseProfile(e) {
    setProfileImageId(e.target.id);
  }

  function profileChange() {
    let data = { profile_image_id: profileImageId };
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

  useEffect(() => {
    dispatch(changeCurrentpage(""));
    getUserInfo();
  }, []);

  const RatingGraphData = {
    margintop: 5,
    marginleft: 0,
    width: 20,
    mwidth: 200,
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
    margintop: 3,
    marginleft: 0,
    width: 25,
    mwidth: 280,
    labels: [
      "동글납작",
      "반짝섬세",
      "깔끔단정",
      "터프투박",
      "단순캐릭",
      "요즘트렌디",
    ],
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
      tooltip: {
        enabled: true,
        usePointStyle: true,
        callbacks: {
          label: (data) => {
            return data.formattedValue + "%";
          },
        },
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
        suggestedMin: 0,
        suggestedMax: 70,
        pointLabels: {
        },
      },
    },
  };

  return (
    <PageBox>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <MoveTop></MoveTop>
          <Profile>
            <UserBorder>
              <UserBack>
                <UserInfo>
                  <BorderImg
                    src={ProfileBorder}
                    alt="테두리"
                    onClick={switchProfileModal}
                  />
                  <ProfileImg src={userImg} alt="프로필사진" />
                  {profileModal ? (
                    <ModalFrame
                      top="10vw"
                      width="75%"
                      height="auto"
                      _handleModal={switchProfileModal}
                    >
                      <ModalTitle>
                        마음에 드는 프로필 이미지를 골라주세요
                      </ModalTitle>
                      <Line></Line>
                      <ProfileZone>
                        {profileNumbers.map((profileNumber) =>
                          profileNumber === Number(profileImageId) ? (
                            <ChoosedProfileCandidate
                              src={profileImgItem[profileNumber].img}
                              id={profileNumber}
                              onClick={chooseProfile}
                              key={profileNumbers}
                            ></ChoosedProfileCandidate>
                          ) : (
                            <ProfileCandidate
                              src={profileImgItem[profileNumber].img}
                              id={profileNumber}
                              onClick={chooseProfile}
                              key={profileNumber}
                            ></ProfileCandidate>
                          )
                        )}
                      </ProfileZone>
                      <ChangeButton onClick={profileChange}>
                        {" "}
                        변경{" "}
                      </ChangeButton>
                    </ModalFrame>
                  ) : null}
                  <Name>{userInfo.data.nickname} 님의 관심사</Name>
                </UserInfo>
                <ChartZone>
                  <Analysis>
                    <GenreAnalysis>
                      <ChartTitle>선호하는 장르</ChartTitle>
                      <GenreBox>
                        {userInfo.genre_list.length === 0 ||
                        userInfo.genre_list === undefined
                          ? "텅~"
                          : Object.keys(userInfo.genre_list).map((key) => (
                            <PreferGenreSubTitle key={key}>
                              {key}
                              <Square
                                style={{
                                  backgroundColor: boxColor[boxColorIndex++],
                                }}
                              ></Square>
                            </PreferGenreSubTitle>
                          ))}
                      </GenreBox>
                      {genreName === undefined || genreName.length === 0 ? (
                        <PreferGenreEmpty>
                          <EmptyImg src={Empty} />
                          <Bubble>
                            웹툰을 찜 해주세요!
                          </Bubble>
                        </PreferGenreEmpty>
                      ) : (
                        <ChartShow
                          data={RatingGraphData}
                          options={RatingGraphOptions}
                        ></ChartShow>
                      )}
                    </GenreAnalysis>
                    <PaintAnalysis>
                      <ChartTitle>선호하는 그림체</ChartTitle>
                      <PreferGenreSubTitle>
                        {" "}
                        나는 어떤 그림체를 좋아할까?
                        <PaintSquare></PaintSquare>
                      </PreferGenreSubTitle>
                      <PreferPaintStyle>
                        {paintGraphData === undefined ||
                        paintGraphData.length === 0 ? (
                          "데이터가 부족해요!"
                        ) : (
                          <ChartShow
                            data={PaintStyleData}
                            options={PaintStyleOptions}
                          ></ChartShow>
                        )}
                      </PreferPaintStyle>
                    </PaintAnalysis>
                  </Analysis>
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
              <TagAddRemove onClick={switchTagModal}>
                <>태그 추가/제거</>
              </TagAddRemove>
            </TagTitleZone>
            {tagModal ? (
              <ModalFrame
                top="5vw"
                width="70%"
                height="auto"
                _handleModal={switchTagModal}
              >
                <ModalTitle>태그 추가/제거</ModalTitle>
                <LikedTagZone>
                  {userInfo.data.tags.length === 0 ||
                  userInfo.data.tags === undefined ? (
                    <LikedTagEmptyMessage>
                      추천에 반영될 태그를 검색 후 추가해 주세요!
                    </LikedTagEmptyMessage>
                  ) : (
                    userInfo.data.tags.map((tag) => (
                      <LikedTag
                        key={tag.tag_id}
                        id={tag.tag_id}
                        onClick={tagSwitch}
                      >
                        <TagName>{tag.name}</TagName>
                        <MinusButton>-</MinusButton>
                      </LikedTag>
                    ))
                  )}
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
              {userInfo.data.tags.length === 0 ||
              userInfo.data.tags === undefined ? (
                <LikedWebToonEmpty>
                  <EmptyImg src={Empty} />
                  <Bubble>찜한 태그가 없어요...</Bubble>
                </LikedWebToonEmpty>
              ) : (
                userInfo.data.tags.map((tag) => (
                  <Tag key={tag.tag_id} id={tag.tag_id}>
                    <BookMarkImage src={BookMark} alt="북마크" />
                    <TagName>{tag.name}</TagName>
                  </Tag>
                ))
              )}
            </TagZone>
            <WebToonTitleZone>
              <TagTitle>
                찜한 웹툰{" "}
                {userInfo.data.liked_webtoons.length === 0
                  ? null
                  : `(${userInfo.data.liked_webtoons.length})`}
              </TagTitle>
            </WebToonTitleZone>
            <LikedWebToonBack> 
              {userInfo.data.liked_webtoons.length === 0 ||
              userInfo.data.liked_webtoons === undefined ? (
                <LikedWebToonEmpty>
                  <EmptyImg src={Empty} />
                  <Bubble>찜한 웹툰이 없어요...</Bubble>
                </LikedWebToonEmpty>
              ) : (
                <Box>
                  {slideCount >= 2 ? (
                    <>
                      {count === 1 ? null : (
                        <PrevBtn src={Left} onClick={left} alt="좌"></PrevBtn>
                      )}
                      {count === slideCount ? null : (
                        <NextBtn src={Right} onClick={right} alt="우"></NextBtn>
                      )}
                    </>
                  ) : null}
                  <LikedBack>
                    <div className="LikedWebToons" id="slide">
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
                      ))}
                    </div>
                  </LikedBack>
                </Box>
              )}
            </LikedWebToonBack>
            <TagTitleZone>
              <TagTitle>최근에 본 웹툰</TagTitle>
            </TagTitleZone>
            <ViewWebToonBack>
              <ViewWebToon>
                {userInfo.data.member_viewed_webtoons.length === 0 ? (
                  <ViewWebToonEmpty>
                    <EmptyImg src={Empty} />
                    <Bubble>최근에 본 웹툰이 없어요...</Bubble>
                  </ViewWebToonEmpty>
                ) : (
                  viewdWebtoon()
                )}
              </ViewWebToon>
            </ViewWebToonBack>
          </Profile>
        </>
      )}
    </PageBox>
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
  margin-bottom: 8vw;
  @media screen and (max-width: 750px) {
    margin-bottom: 100px;
  }
  padding: 0.5vw;
`;

const Profile = styled.div`
  margin: 0.65vw;
`;

const UserBorder = styled.div`
  border: 0.15vw solid black;
  background-color: #fff5c3;
  border-radius: 1.5vw;
`;

const UserBack = styled.div`
  background-color: #fff5c3;
  margin: 0.65vw;
`;

const BorderImg = styled.img`
  cursor: url(${hover}) 13 13, auto;
  position: absolute;
  width: 7vw;
  overflow: hidden;
  z-index: 1;
`;

const ProfileImg = styled.img`
  width: 4.8vw;
  height: 4.8vw;
  margin-left: 1.1vw;
  border-radius: 70%;
  object-fit: cover;
  z-index: 0;
`;

const ChangeButton = styled.div`
  background-color: #d1e2ff;
  padding: 0.6vw 2vw;
  @media screen and (max-width: 750px) {
    padding: 8px 16px;
    font-size: 11px;
  }
  border-radius: 12px;
  border: 0.2vw solid #d1e2ff;
  margin-top: 1.2vw;
  margin-bottom: 2vw;
  cursor: url(${hover}) 13 13, auto;
  &:hover {
    background-color: #99c0ff;
    border: 0.2vw solid #99c0ff;
  }
`;

const UserInfo = styled.div`
  position: relative;
  width: 96%;
  margin: 2vw auto 1.5vw;
  display: flex;
  align-items: center;
  gap: 1.5vw;
`;

const Name = styled.div`
  font-size: 1.5vw;
  @media screen and (max-width: 1100px) {
    font-size: 1.4vw;
  }
  @media screen and (max-width: 750px) {
    font-size: 12px;
  }
`;

const TagTitleZone = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw 0vw 1vw 0vw;
`;

const TagTitle = styled.div`
  display: inline;
  margin-top: 1vw;
  margin-left: 1.5vw;
  font-size: 1.7vw;
  @media screen and (max-width: 1100px) {
    font-size: 1.5vw;
  }
  @media screen and (max-width: 750px) {
    font-size: 16px;
    margin-top: 20px;
  }
`;

const TagZone = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 1vw 0.8vw;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  background-color: #fff5c3;
`;

const TagAddRemove = styled.div`
  display: inline;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  font-size: 1.2vw;
  @media screen and (max-width: 1100px) {
    font-size: 10px;
  }
  margin-top: 0.4vw;
  padding: 0.4vw 1.6vw;
  border: 0.2vw solid #d1e2ff;
  border-radius: 1vw;
  background-color: white;
  cursor: url(${hover}) 13 13, auto;
  &:hover {
    background-color: #99c0ff;
    border: 0.2vw solid #99c0ff;
  }
`;

const Tag = styled.div`
  margin: 0.5vw;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  border: 0.15vw solid white;
  border-radius: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: white;
`;

const SearchTag = styled.div`
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  cursor: url(${hover}) 13 13, auto;
  border: 0.15vw solid white;
  border-radius: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5vw;
  &:hover {
    background-color: #99c0ff;
  }
  margin: 0.5vw;
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
  @media screen and (max-width: 750px) {
    font-size: 12px;
    margin-top: 20px;
  }
`;
const LikedTagZone = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 2vw;
`;

const LikedTagEmptyMessage = styled.div`
  margin: 1.5vw 0;
  font-size: 1.4vw;
  @media screen and (max-width: 750px) {
    font-size: 14px;
    margin: 15px 0;
  }
`;

const Line = styled.div`
  margin-top: 1vw;
  border-top: 0.2vw solid black;
  width: 100%;
`;

const ProfileZone = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

const ChoosedProfileCandidate = styled.img`
  cursor: url(${hover}) 13 13, auto;
  margin: 2vw 1vw;
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
  cursor: url(${hover}) 13 13, auto;
  margin: 2vw 1vw;
  width: 8vw;
  height: 8vw;
  border: 0.5vw solid white;
  border-radius: 70%;
  object-fit: cover;
  z-index: 0;
  &:hover {
    transform: scale(1.3);
  }
`;

const SearchBar = styled.input`
  padding: 3px 8px;
  margin-top: 3vw;
  width: 70%;
  height: 3vw;
  font-size: 1.5vw;
  border-radius: 1vw;
`;

const FilterZone = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 3vw;
  padding: 0 1.5vw 1.5vw;
  border-top-left-radius: 1vw;
  border-bottom-left-radius: 1vw;
  border-bottom-right-radius: 1vw;
`;

const LikedTag = styled.div`
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  cursor: url(${hover}) 13 13, auto;
  background-color: #d1e2ff;
  border: 0.15vw solid white;
  border-radius: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5vw;
  &:hover {
    background-color: #99c0ff;
  }
  margin: 0.5vw;
`;

const WebToonTitleZone = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw 0 0.5vw;
`;

const PrevBtn = styled.img`
  cursor: url(${hover}) 13 13, auto;
  position: absolute;
  width: 1.8vw;
  top: 9vw;
  left: 0.2vw;
  z-index: 1;
`;

const NextBtn = styled.img`
  cursor: url(${hover}) 13 13, auto;
  position: absolute;
  width: 1.8vw;
  top: 9vw;
  right: 0.2vw;
  z-index: 1;
`;

const LikedWebToonBack = styled.div`
  position: relative;
  display: flex;
  background-color: #fff5c3;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  background-color: #fff5c3;
  padding: 2vw 0.8vw;
  margin: 1vw 0vw 1vw 0vw;
  overflow: hidden;
`;

const Box = styled.div`
  width: 96%;
  margin: 0 auto;
`;

const LikedBack = styled.div`
  display: flex;
  overflow: hidden;
`;

const LikedWebToon = styled.div`
  cursor: url(${hover}) 13 13, auto;
  width: 15vw;
  margin: 0 1.6vw 0.2vw 0;
  border-radius: 0.8vw;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const LikedWebToonEmpty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Bubble = styled.div`
  margin-top: 0vw;
  margin-left: 1vw;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1.2vw;
  max-height: 80px;
  @media screen and (max-width: 1100px) {
    font-size: 1vw;
  }
  @media screen and (max-width: 750px) {
    font-size: 10px;
    margin-left: 15px;
  }
  padding: 16px 10px 20px;
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
`;

const ThumnailBox = styled.div`
  background-color: white;
  width: 100%;
  height: 15vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  cursor: url(${hover}) 13 13, auto;
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
  cursor: url(${hover}) 13 13, auto;
`;

const LikedWebToonTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  padding: 0.2vw 0.5vw;
`;
const ViewWebToonBack = styled.div`
  display: flex;
  background-color: #fff5c3;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
`;

const ViewWebToon = styled.div`
  display: grid;
  width: 100%;
  margin: 1.5vw 0.8vw 2vw;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const ViewWebToonEmpty = styled.div`
  height: 100%;
  width: 35vw;
  display: flex;
  align-items: center;
`;

const ChartZone = styled.div`
  background-color: white;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  margin: 1vw;
`;

const Analysis = styled.div`
  padding: 1vw;
  border-radius: 1vw;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const GenreAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vw;
  border-radius: 1vw;
`;

const ChartTitle = styled.div`
  font-size: 1.6vw;
  @media screen and (max-width: 1100px) {
    font-size: 1.4vw;
  }
  @media screen and (max-width: 750px) {
    font-size: 11px;
  }
`;

const GenreBox = styled.div`
  display: flex;
  justify-content: center;
`;

const PaintAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1vw;
  padding: 1vw;
`;

const PreferGenreSubTitle = styled.div`
  display: flex;
  font-size: 1vw;
  height: 1vw;
  margin: 1vw 0.5vw 0.5vw;
`;

const Square = styled.div`
  width: 1vw;
  height: 1vw;
  margin-left: 0.2vw;
`;

const PaintSquare = styled.div`
  width: 1vw;
  height: 1vw;
  margin-left: 0.4vw;
  background-color: #5fc4f67b;
  border: solid 0.15vw #29adf07d;
`;

const PreferGenreEmpty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const PreferPaintStyle = styled.div`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
