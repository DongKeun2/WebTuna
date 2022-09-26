import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ChartShow from "../../components/common/Chart";
import ProfileBorder from "../../../src/assets/profilePage/ProfileBorder.png";
import Loading from "../../components/common/Loading";
import CuteHeart from "../../../src/assets/profilePage/CuteHeart.png";
import BookMark from "../../../src/assets/detail/BookMark.png";
import { profile } from "../../features/accounts/profileSlice";
import profileImgItem from "../../assets/profile/profileImgItem";
import ToonItem from "../../components/toonlist/ToonItem";

function ProfilePage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [userImg, setUserImg] = useState();
  const [paintGraphData, setPaintGraphData] = useState();
  const [genreName, setgGenreName] = useState();
  const [genreValue, setgGenreValue] = useState();

  function getUserInfo() {
    dispatch(profile()).then((res) => {
      setUserInfo(res.payload);
      setUserImg(profileImgItem[res.payload.data.profile_image_id].img);
      let imageType = [];
      let gName = [];
      let gValue = [];
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
      setIsLoading(false);
      console.log(res.payload);
    });
  }

  function viewdWebtoon() {
    const result = [];
    for (let i = 0; i < userInfo.data.member_viewed_webtoons.length; i++) {
      result.push(
        <div key={userInfo.data.member_viewed_webtoons[i].webtoon.webtoon_id}>
          <ToonItem item={userInfo.data.member_viewed_webtoons[i].webtoon} />
        </div>
      );
    }
    return result;
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
                  <HeartImage src={CuteHeart} alt="귀여운 하트" />
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
            <HeartImage2 src={CuteHeart} alt="귀여운 하트" />
            <TagTitle>찜한 태그</TagTitle>
          </TagTitleZone>
          <TagBorder>
            <TagBack>
              {userInfo.data.tags.length === 0 ||
              userInfo.data.tags === undefined
                ? "텅~"
                : userInfo.data.tags.map((tag) => (
                    <Tag key={tag.tag_id} id={tag.tag_id}>
                      <BookMarkImage src={BookMark} alt="북마크" />
                      <TagName>{tag.name}</TagName>
                    </Tag>
                  ))}
            </TagBack>
          </TagBorder>
          <TagTitleZone>
            <HeartImage2 src={CuteHeart} alt="귀여운 하트" />
            <TagTitle>찜한 웹툰</TagTitle>
          </TagTitleZone>
          <PreferenceBack>
            <HeartWebToon>
              {userInfo.data.liked_webtoons.length === 0
                ? "텅~"
                : userInfo.data.liked_webtoons.map((toon) => (
                    <div key={toon.webtoon_id}>
                      <ToonItem item={toon} />
                    </div>
                  ))}
            </HeartWebToon>
          </PreferenceBack>
          <TagTitleZone>
            <HeartImage2 src={CuteHeart} alt="귀여운 하트" />
            <TagTitle>최근에 본 웹툰</TagTitle>
          </TagTitleZone>
          <PreferenceBack>
            <ViewWebToon>
              {userInfo.data.member_viewed_webtoons.length === 0
                ? "텅~"
                : viewdWebtoon()}
            </ViewWebToon>
          </PreferenceBack>
          <TagTitleZone>
            <HeartImage2 src={CuteHeart} alt="귀여운 하트" />
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

const HeartImage = styled.img`
  width: 3vw;
  height: 3vw;
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
  margin: 1vw 0vw 1vw 0vw;
`;

const HeartImage2 = styled.img`
  display: inline;
  width: 3vw;
`;

const TagTitle = styled.div`
  display: inline;
  font-size: 1.7vw;
  margin-top: 0.5vw;
  margin-left: 0.5vw;
`;

const TagBorder = styled.div`
  border: 0.15vw solid black;
  background-color: white;
  border-radius: 1.5vw;
  height: 10vw;
`;

const TagBack = styled.div`
  display: flex;
  background-color: #feec91;
  border: 0.15vw solid black;
  border-radius: 1.5vw;
  margin: 0.65vw;
  height: 5.5vw;
  /* justify-content: space-between; */
  align-items: center;
  padding: 1.5vw;
`;

const Tag = styled.div`
  display: inline;
  background-color: white;
  border: 0.1vw solid black;
  height: 2.1vw;
  border-radius: 2vw;
  align-items: center;
  margin-left: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookMarkImage = styled.img`
  display: inline;
  width: 1.1rem;
  height: 1.7rem;
  padding-left: 1vw;
`;

const TagName = styled.div`
  display: inline;
  margin-left: 0.8vw;
  margin-right: 0.8vw;
  font-size: 1.5vw;
`;

const PreferenceBack = styled.div`
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

const HeartWebToon = styled.div`
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
