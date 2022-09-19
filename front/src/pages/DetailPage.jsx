import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { detail } from "../features/details/detailSlice";
import styled from "styled-components";
import ToonToonRecommend from "../assets/navbar/ToonToonRecommend.png"
import ChartShow from "../components/common/Chart";

function DetailPage() {
  const { toonId } = useParams();
  const dispatch = useDispatch();
  function getDetail() {
    dispatch(detail(toonId)).then(() => {
      console.log();
    });
  }
  getDetail();

  const PaintStyleData = {
    margintop: 50,
    marginleft: 50,
    width : 300,
    labels: ["순정", "무협", "양산형", "우산형", "우비형", "우리형"],
    datasets: [
      {
        type: "radar",
        label: "이 웹툰의 그림체 분석",
        fill: true,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [40.33, 32.17, 25.53, 17.53, 9.53, 23.0],
      },

    ],
  };

  const AgeGroupData = {
    margintop: 50,
    marginleft: 50,
    width : 300,
    labels: ["10대 남성", "20대 남성", "20대 여성", "10대 여성", "90대 중성",],
    datasets: [
      {
        type: "pie",
        label: "이 웹툰을 좋아하는 연령대",
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [40.33, 32.17, 25.53, 17.53, 9.53],
      },
    ],
  };

  const AgeGrouoOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '이 웹툰을 좋아하는 성별 연령 TOP5'
      }
    }
  }

  const RatingGraphData = {
    margintop: 50,
    marginleft: 175,
    width : 700,
    labels: ["★", "★★", "★★★", "★★★★", "★★★★★",],
    datasets: [
      {
        type: "bar",
        label: "이 웹툰의 별점 분포",
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [10,12,38,21,19],
      },
    ],
  };

  return (
    <BackBorder>
      <BackGround>
        <DetailZone>
          <Thumbnail>
            <ThumbnailImage src={ToonToonRecommend} alt="썸네일"></ThumbnailImage>
          </Thumbnail>
          <Info>
            <Title>웹툰제목</Title>
            <Author>작가이름</Author>
            <Rating>별점 ★★★★☆</Rating>
            <Genre>장르 노잼 꿀잼 핵꿀잼</Genre>
            <Day>?요일 연재 / </Day>
            <Total>총 ??회</Total>
          </Info>
          <SubInfo>
            <WebToonLink>
              <a href="https://www.naver.com/" target="_blank" rel="noreferrer">웹툰 보러가자</a>
            </WebToonLink>
            <Like>♥</Like>
            <Summary>줄거리다 귀찮으면 읽지 말던가</Summary>
          </SubInfo>
        </DetailZone>
        <TagZone>
          태그 컴포넌트로 뿌리기
        </TagZone>
        <PaintStyleRecommendZone>
          <h2>그림체가 비슷한 웹툰</h2>
          <PSRecommends>
            API 요청 보내고 받아서 그림체 기반 추천 뿌리자
          </PSRecommends>
        </PaintStyleRecommendZone>
        <SameAuthorRecommendZone>
          <h2>같은 작가의 다른 작품</h2>
          <SARecommends>
            API 요청 보내고 받아서 같은 작가의 다른 작품 뿌리자
          </SARecommends>
        </SameAuthorRecommendZone>
        <WebToonAnalysisZone>
          <h2>웹툰 분석</h2>
          <AnalysisBack>
            <Analysis>
              <PaintStyleAnalysis>
              <ChartTitle1>그림체 분석</ChartTitle1>
                <ChartShow data={PaintStyleData}></ChartShow>
              </PaintStyleAnalysis>
              <AgeGroupAnalysis>
              <ChartTitle1>연령대 분석</ChartTitle1>
                <ChartShow data={AgeGroupData} options={AgeGrouoOptions}></ChartShow>
              </AgeGroupAnalysis>
            </Analysis>
            <Graph>
              <RatingGraph>
                <ChartTitle2>별점 그래프</ChartTitle2>
                <ChartShow data={RatingGraphData}></ChartShow>
              </RatingGraph>
            </Graph>
          </AnalysisBack>

        </WebToonAnalysisZone>
      </BackGround>
    </BackBorder>
  );
}

const BackBorder = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin: 0px 100px 200px 100px;
  height: 2500px;
`;

const BackGround = styled.div`
  background-color: #feec91;
  border: 2px solid black;
  border-radius: 20px;
  margin: 20px 20px 200px 20px;
  height: 2455px;
`;

const DetailZone = styled.div`
  display: flex;
`;

const Thumbnail = styled.div`
  flex: 1;
  margin-left: 120px;
  margin-top: 100px;
`;

const ThumbnailImage = styled.img`
  width:300px;
  height:300px;
`;

const Info = styled.div`
  flex: 1;
  margin-top: 100px;
  margin-left: -100px;
`;

const SubInfo = styled.div`
  flex: 1;
  margin-top: 100px;
  margin-left: -50px;
`;


const Title = styled.h1`
  display: inline;
`;

const Author = styled.h1`
  display: inline;
  margin-left: 50px;
`;

const Rating = styled.h1`
  margin-top: 80px;
`;

const Genre = styled.h1`
`;

const Day = styled.h1`
  display: inline;
`;

const Total = styled.h1`
  display: inline;
`;

const WebToonLink = styled.div`
  display: inline;
`;

const Like = styled.div`
  display: inline;
  margin-left: 200px;
  font-size: 20pt;
  color:red;
`;

const Summary = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 100px;
  margin-right: 100px;
  padding-left:10px;
  padding-top:10px;
  height: 150px;
`;

const TagZone = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 100px;
  margin-left: 120px;
  margin-right: 100px;
  height: 100px;
`;

const PaintStyleRecommendZone = styled.div`
  margin-left: 120px;
  margin-right: 100px;
`;

const PSRecommends = styled.div`
  background-color: white;
  height: 300px;
`;

const SameAuthorRecommendZone = styled.div`
  margin-left: 120px;
  margin-right: 100px;
`;

const SARecommends = styled.div`
  background-color: white;
  height: 300px;
`;

const WebToonAnalysisZone = styled.div`
  margin-left: 120px;
  margin-right: 100px;
`;

const AnalysisBack = styled.div`
  height: 900px;
`;


const Analysis = styled.div`
  display: flex;
  background-color: white;
  height: 50%;
`

const PaintStyleAnalysis = styled.div`
  flex: 1;
  display: inline;
  float: center;
  background-color: white;
  height: 50%;
`

const AgeGroupAnalysis = styled.div`
  flex: 1;
  display: inline;
  float: center;
  background-color: white;
  height: 50%;
`
const Graph = styled.div`
  background-color: white;
  height: 50%;
`

const RatingGraph = styled.div`
`

const ChartTitle1 = styled.div`
padding-left: 50px;
padding-top: 50px;
`

const ChartTitle2 = styled.div`
padding-top: 20px;
margin-left: 500px;
`


export default DetailPage;
