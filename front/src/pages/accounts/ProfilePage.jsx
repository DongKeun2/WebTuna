import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ChartShow from "../../components/common/Chart";
import ProfileBorder from "../../../src/assets/profilePage/ProfileBorder.png";
import Loading from "../../components/common/Loading";
import CuteHeart from "../../../src/assets/profilePage/CuteHeart.png";
import { profile } from "../../features/accounts/profileSlice";
import profileImgItem from "../../assets/profile/profileImgItem";
import ToonItem from "../../components/toonlist/ToonItem";

function ProfilePage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [userImg, setUserImg] = useState();
  const [paintGraphData, setPaintGraphData] = useState();

  function getUserInfo() {
    dispatch(profile()).then((res) => {
      setUserInfo(res.payload);
      setUserImg(profileImgItem[res.payload.data.profile_image_id].img);
      let temp = [];
      temp.push(res.payload.image_type.image_type1);
      temp.push(res.payload.image_type.image_type2);
      temp.push(res.payload.image_type.image_type3);
      temp.push(res.payload.image_type.image_type4);
      temp.push(res.payload.image_type.image_type5);
      temp.push(res.payload.image_type.image_type6);
      setPaintGraphData(temp);
      setIsLoading(false);
      console.log(res.payload);
    });
  }

  function viewWebtoonReverse() {
    const result = [];
    for (let i = userInfo.data.view_webtoons.length - 1; i >= 0; i--) {
      result.push(
        <div key={userInfo.data.view_webtoons[i].webtoon_id}>
          <ToonItem item={userInfo.data.view_webtoons[i]} />
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
    width: 50,
    labels: ["로맨스", "코미디", "판타지"],
    datasets: [
      {
        type: "bar",
        label: "선호하는 장르",
        fill: true,
        backgroundColor: ["tomato", "dodgerblue", "yellow"],
        borderColor: ["tomato", "dodgerblue", "yellow"],
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [50, 30, 20],
      },
    ],
  };

  const PaintStyleData = {
    margintop: 5,
    marginleft: 15,
    width: 40,
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
                  <HeartImage src={CuteHeart} alt="귀여운 하트"></HeartImage>
                  <HeartNumber>
                    {userInfo.data.liked_webtoons.length}
                  </HeartNumber>
                </Heart>
              </UserInfo>
              <Genre>{userInfo.genre_list}</Genre>
            </UserBack>
          </UserBorder>
          <TagTitle>♥찜한태그</TagTitle>
          <TagBorder>
            <TagBack>
              {userInfo.data.tags.length === 0
                ? "텅~"
                : userInfo.data.tags.map((tag) => (
                    <div key={tag.tag_id}>{tag.name}</div>
                  ))}
            </TagBack>
          </TagBorder>
          <PreferenceTitle>♥찜한웹툰</PreferenceTitle>
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
          <PreferenceTitle>♥최근에 본 웹툰</PreferenceTitle>
          <PreferenceBack>
            <ViewWebToon>
              {userInfo.data.view_webtoons.length === 0
                ? "텅~"
                : viewWebtoonReverse()}
            </ViewWebToon>
          </PreferenceBack>
          <PreferenceTitle>
            ♥{userInfo.data.nickname}님의 관심사
          </PreferenceTitle>
          <ChartBack>
            <ChartZone>
              <PreferGenre>
                <ChartShow data={RatingGraphData}></ChartShow>
              </PreferGenre>
              <PreferPaintStyle>
                <ChartShow data={PaintStyleData}></ChartShow>
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

const Genre = styled.div`
  width: 40vw;
  margin-left: 8vw;
  margin-top: 6vw;
  font-size: 2.5vw;
`;

const TagTitle = styled.div`
  font-size: 1.7vw;
  border-radius: 20px;
  margin: 20px 0px 20px 100px;
`;

const TagBorder = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin: 0px 100px 0px 100px;
  height: 150px;
`;

const TagBack = styled.div`
  background-color: #feec91;
  border: 2px solid black;
  border-radius: 20px;
  margin: 10px;
  height: 125px;
`;

const PreferenceBack = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin: 0px 100px 50px 100px;
  background-color: #feec91;
`;

const ViewWebToon = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const PreferenceTitle = styled.div`
  font-size: 20pt;
  border-radius: 20px;
  margin: 20px 0px 20px 100px;
`;

const HeartWebToon = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 70px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const ChartBack = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin: 0px 100px 150px 100px;
  background-color: #feec91;
`;

const ChartZone = styled.div`
  display: flex;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 50px;
  background-color: white;
  margin: 20px;
  height: 670px;
`;

const PreferGenre = styled.div`
  flex: 1;
  margin-top: 50px;
  background-color: white;
  margin: 20px;
  height: 620px;
`;

const PreferPaintStyle = styled.div`
  flex: 1;
  margin-top: 50px;
  background-color: white;
  margin: 20px;
  height: 620px;
`;
