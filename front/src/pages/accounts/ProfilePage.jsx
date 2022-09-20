import styled from "styled-components";
import ToonToonRecommend from "../../../src/assets/navbar/ToonToonRecommend.png"
import ChartShow from "../../components/common/Chart";
import ProfileBorder from "../../../src/assets/profile/ProfileBorder.png"
import Male from "../../../src/assets/profile/Male.png"
import Female from "../../../src/assets/profile/Female.png"

function ProfilePage() {

  const RatingGraphData = {
    margintop: 100,
    marginleft: 30,
    width: 700,
    labels: ["로맨스", "코미디", "판타지"],
    datasets: [
      {
        type: "bar",
        label: "선호하는 장르",
        fill: true,
        backgroundColor: [
          'tomato',
          'dodgerblue',
          'yellow',
        ],
        borderColor: [
          'tomato',
          'dodgerblue',
          'yellow',
        ],
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [50, 30, 20],
      },
    ],
  };

  const PaintStyleData = {
    margintop: 50,
    marginleft: 150,
    width: 500,
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
        data: [40.33, 32.17, 25.53, 17.53, 9.53, 23.0],
      },

    ],
  };

  return (
    <Profile>
      <UserBorder>
        <UserBack>
          <UserImage>
            <Border>
              <img src={ProfileBorder} alt="테두리" width="250px" />
            </Border>
            <ProfileImage>
              <img src={ToonToonRecommend} alt="프로필사진" width="150px" />
            </ProfileImage>
            <Age>
              29
            </Age>
          </UserImage>
          <UserInfo>
            <Name>참치마요</Name>
            <Gender>
              <img src={Male} Alt="남성" width="40px"></img>
            </Gender>
            <Rating>
              평가20
            </Rating>
          </UserInfo>
          <Genre>
            #무협 #로맨스 #스포츠
          </Genre>
        </UserBack>
      </UserBorder>
      <TagTitle>
        ♥찜한태그
      </TagTitle>
      <TagBorder>
        <TagBack>
          <h1>태그뿌리기</h1>
        </TagBack>
      </TagBorder>
      <PreferenceTitle>
        ♥찜한웹툰
      </PreferenceTitle>
      {/* <PreferenceBorder> */}
      <PreferenceBack>
        <HeartWebToon>
          <h1>찜한 웹툰 뿌리기</h1>
        </HeartWebToon>
        <ChartZone>
          <PreferGenre>
            <ChartShow data={RatingGraphData}></ChartShow>
          </PreferGenre>
          <PreferPaintStyle>
            <ChartShow data={PaintStyleData}></ChartShow>
          </PreferPaintStyle>
        </ChartZone>
      </PreferenceBack>
      {/* </PreferenceBorder> */}

    </Profile>
  );
}

export default ProfilePage;


const Profile = styled.div`
`;

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
  flex:1;
  margin-left: 25px;
  margin-top: 18px;
  width:200px;
  height:200px;
`;

const Border = styled.div`
  position: absolute;
  z-index:1;
`;

const ProfileImage = styled.div`
  position: absolute;
  z-index:0;
  top:203px;
  left:198px;
`;

const Age = styled.div`
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 30px;
  width:40px;
  height:40px;
  text-align:center;
  font-size: 20pt;
  position: absolute;
  z-index:2;
  top:320px;
  left:320px;
`;

const UserInfo = styled.div`
  flex:3;
  margin-top: 75px;
  margin-left: 20px;
  width:200px;
  height:200px;
`;

const Name = styled.h1`
  display: inline;
  font-size:30pt;
`;

const Gender = styled.div`
  display: inline;
  margin-left: 10px;
`;

const Rating = styled.h3`
  margin-top: px;
  margin-left:5px;
`;

const Genre = styled.div`
  flex:3;
  display:flex;
  align-items: center;
  font-size: 30pt;
`;

const TagTitle = styled.div`
  font-size: 20pt;
  border-radius: 20px;
  margin:20px 0px 20px 100px;
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

// const PreferenceBorder = styled.div`
// border: 2px solid black;
// border-radius: 20px;
// margin: 0px 100px 150px 100px;
// height: 1000px;
// `;

const PreferenceBack = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin: 0px 100px 150px 100px;
  height: 1200px;
  background-color: #feec91;
`;

const PreferenceTitle = styled.div`
  font-size: 20pt;
  border-radius: 20px;
  margin:20px 0px 20px 100px;
`;

const HeartWebToon = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: white;
  height:400px;
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