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
      result.push(<div key={userInfo.data.view_webtoons[i].webtoon_id}>
        <ToonItem item={userInfo.data.view_webtoons[i]} />
      </div>);
    }
    return result;
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const RatingGraphData = {
    margintop: 100,
    marginleft: 30,
    width: 500,
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
    margintop: 50,
    marginleft: 150,
    width: 400,
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
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Profile>
          <UserBorder>
            <UserBack>
              <UserImage>
                <Border>
                  <img src={ProfileBorder} alt="테두리" width="250px" />
                </Border>
                <ProfileImage>
                  <img src={userImg} alt="프로필사진" width="150px" />
                </ProfileImage>
              </UserImage>
              <UserInfo>
                <Name>{userInfo.data.nickname}</Name>
                <Heart>
                  <HeartImage
                    src={CuteHeart}
                    alt="귀여운 하트"
                    width="30px"
                  ></HeartImage>
                  <HeartNumber>{userInfo.data.liked_webtoons.length}</HeartNumber>
                </Heart>
              </UserInfo>
              <Genre>#무협 #로맨스 #스포츠</Genre>
            </UserBack>
          </UserBorder>
          <TagTitle>♥찜한태그</TagTitle>
          <TagBorder>
            <TagBack>
              {userInfo.data.tags.length === 0 ? "텅~" : userInfo.data.tags.map((tag) => (
                <div key={tag.tag_id}>{tag.name}</div>
              ))}
            </TagBack>
          </TagBorder>
          <PreferenceTitle>♥찜한웹툰</PreferenceTitle>
          <PreferenceBack>
            <HeartWebToon>
              {userInfo.data.liked_webtoons.length === 0 ? "텅~" : userInfo.data.liked_webtoons.map((toon) => (
                <div key={toon.webtoon_id}>
                  <ToonItem item={toon} />
                </div>
              ))}

            </HeartWebToon>
          </PreferenceBack>
          <PreferenceTitle>♥최근에 본 웹툰</PreferenceTitle>
          <PreferenceBack>
            <ViewWebToon>
              {userInfo.data.view_webtoons.length === 0 ? "텅~" : viewWebtoonReverse()}
            </ViewWebToon>
          </PreferenceBack>
          <PreferenceTitle>♥{userInfo.data.nickname}님의 관심사</PreferenceTitle>
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
    </div>
  );
}

export default ProfilePage;

const Profile = styled.div``;

const UserBorder = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin: 0px 100px 0px 100px;
  height: 300px;
`;

const UserBack = styled.div`
  display: flex;
  background-color: #feec91;
  border: 2px solid black;
  border-radius: 20px;
  margin: 10px;
  height: 275px;
`;

const UserImage = styled.div`
  flex: 1;
  margin-left: 25px;
  margin-top: 18px;
  width: 200px;
  height: 200px;
`;

const Border = styled.div`
  position: absolute;
  z-index: 1;
`;

const ProfileImage = styled.div`
  position: absolute;
  z-index: 0;
  top: 203px;
  left: 198px;
`;

const UserInfo = styled.div`
  flex: 1;
  margin-top: 75px;
  margin-left: 20px;
  width: 200px;
  height: 200px;
`;

const Name = styled.h1`
  display: inline;
  font-size: 30pt;
`;

const Heart = styled.h3`
`;

const HeartImage = styled.img`
  display: inline;
`;

const HeartNumber = styled.div`
  display: inline;
  margin-left: 10px;
`;

const Genre = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  font-size: 30pt;
`;

const TagTitle = styled.div`
  font-size: 20pt;
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
`

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
