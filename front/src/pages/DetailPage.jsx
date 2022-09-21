import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detail } from "../features/details/detailSlice";
import styled from "styled-components";
import BookMark from "../assets/detail/BookMark.png";
import ChartShow from "../components/common/Chart";
import Loading from "../components/common/Loading";
import ModalFrame from "../components/common/ModalFrame";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import FullHeart from "../assets/detail/FullHeart.png";
import EmptyHeart from "../assets/detail/EmptyHeart.png";

function DetailPage() {
  const { toonId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [webToonInfo, setWebToonInfo] = useState();
  const [otherWebToons, setOtherWebToons] = useState();
  const [paintGraphData, setPaintGraphData] = useState();
  const [ratingGraphData, setRatingGraphData] = useState();
  const [averageRating, setAverageRating] = useState();
  const [modal, setModal] = useState(false);
  const [modalRating, setModalRating] = useState(3);
  // const [userData, setUserData] = useState();
  const day = ["None", "월", "화", "수", "목", "금", "토", "일", "완결"];
  const userData = useSelector((state) => state.login.currentUser);

  function getDetail() {
    dispatch(detail(toonId)).then((res) => {
      setWebToonInfo(res.payload);
      setPaintGraphData([
        res.payload.image_type1 / 2 + 15,
        res.payload.image_type2 / 2 + 15,
        res.payload.image_type3 / 2 + 15,
        res.payload.image_type4 / 2 + 15,
        res.payload.image_type5 / 2 + 15,
        res.payload.image_type6 / 2 + 15,
      ]);
      setRatingGraphData([
        res.payload.webtoon_rate[0],
        res.payload.webtoon_rate[1],
        res.payload.webtoon_rate[2],
        res.payload.webtoon_rate[3],
        res.payload.webtoon_rate[4],
        res.payload.webtoon_rate[5],
        res.payload.webtoon_rate[6],
        res.payload.webtoon_rate[7],
        res.payload.webtoon_rate[8],
        res.payload.webtoon_rate[9],
        res.payload.webtoon_rate[10],
      ]);
      setAverageRating(getAverageRating(res.payload));
      let tempArr = [];
      for (let i = 0; i < res.payload.authors.length; i++) {
        for (
          let j = 0;
          j < res.payload.authors[i].author_webtoons.length;
          j++
        ) {
          tempArr.push(res.payload.authors[i].author_webtoons[j]);
        }
      }
      let tempSet = [...new Set([...tempArr])];
      tempSet = tempSet.filter((temp) => temp.webtoon_id !== Number(toonId));
      setOtherWebToons(tempSet);
      // setUserData(JSON.parse(sessionStorage.getItem("userData")));
      setIsLoading(false);
      console.log(res.payload);
    });
  }

  function getAverageRating(data) {
    let average = 0;
    let total = 0;
    for (let i = 0; i < 10; i++) {
      average += data.webtoon_rate[i] * (0.5 * i);
      total += data.webtoon_rate[i];
    }
    if (total === 0) {
      return 0;
    }
    return average / total;
  }

  function switchModal() {
    setModal((prev) => !prev);
  }

  function changeRating(e) {
    setModalRating(e.target.value);
    setModal(false);
  }

  useEffect(() => {
    getDetail();
  }, []);

  const PaintStyleData = {
    margintop: 50,
    marginleft: 50,
    width: 300,
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
        data: paintGraphData,
      },
    ],
  };

  const PaintStyleOptions = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 70,
      },
    },
  };

  const AgeGroupData = {
    margintop: 50,
    marginleft: 50,
    width: 300,
    labels: ["10대 남성", "20대 남성", "20대 여성", "10대 여성", "90대 중성"],
    datasets: [
      {
        type: "pie",
        label: "이 웹툰을 좋아하는 연령대",
        fill: true,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
        position: "top",
      },
      title: {
        display: true,
        text: "이 웹툰을 좋아하는 성별 연령 TOP5",
      },
    },
  };

  const RatingGraphData = {
    margintop: 50,
    marginleft: 175,
    width: 700,
    labels: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    datasets: [
      {
        type: "bar",
        label: "이 웹툰의 별점 분포",
        fill: true,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: ratingGraphData,
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <BackBorder>
          <BackGround>
            <DetailZone>
              <Thumbnail>
                <ThumbnailImage
                  src={webToonInfo.thumbnail}
                  alt="썸네일"
                ></ThumbnailImage>
              </Thumbnail>
              <Info>
                <Title>{webToonInfo.title}</Title>
                <Author>
                  {webToonInfo.authors.map((author) => author.name + " ")}
                </Author>
                <RatingZone>
                  별점 ★ {averageRating.toFixed(1)}{" "}
                  <RatingButton onClick={switchModal}>별점 주기</RatingButton>
                  {modal ? (
                    <ModalFrame _handleModal={switchModal}>
                      <h1>빛나라 지식의 별</h1>
                      <Rating
                        name="half-rating"
                        defaultValue={5.0}
                        precision={0.5}
                        icon={
                          <StarIcon
                            style={{ width: "64px", height: "64px" }}
                          ></StarIcon>
                        }
                        emptyIcon={
                          <StarIcon
                            style={{
                              width: "64px",
                              height: "64px",
                            }}
                          />
                        }
                        onChange={changeRating}
                      />
                    </ModalFrame>
                  ) : null}
                </RatingZone>
                <Genre>
                  장르{" "}
                  {webToonInfo.genres.map((genre) => genre.genre_type + " ")}
                </Genre>
                <Day>
                  {webToonInfo.days[0].day_id === 8
                    ? "완결 웹툰"
                    : `${day[webToonInfo.days[0].day_id]}요일 연재`}
                </Day>
              </Info>
              <SubInfo>
                <WebToonLink>
                  <a href={webToonInfo.page} target="_blank" rel="noreferrer">
                    웹툰 보러가기
                  </a>
                </WebToonLink>
                <Like>
                  {userData.liked_webtoons.includes(Number(toonId)) ? (
                    <img src={FullHeart} alt="찜" width="50px"></img>
                  ) : (
                    <img src={EmptyHeart} alt="노찜" width="50px"></img>
                  )}
                </Like>
                <Summary>{webToonInfo.summary}</Summary>
              </SubInfo>
            </DetailZone>
            <TagZone>
              {webToonInfo.tags.map((tag) => (
                <Tag key={tag.tag_id}>
                  <BookMarkImage>
                    <img src={BookMark} alt="북마크" width="20px"></img>
                  </BookMarkImage>
                  <TagName>{tag.name}</TagName>
                </Tag>
              ))}
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
                {otherWebToons.length === 0 ? (
                  <h1>텅~</h1>
                ) : (
                  otherWebToons.map((otherWebToon) => (
                    <OtherWebToon key={otherWebToon.webtoon_id}>
                      <OtherWebToonImage>
                        <OtherWebToonThumbnail
                          src={otherWebToon.thumbnail}
                          alt="같은 작가의 다른 작품 이미지"
                        ></OtherWebToonThumbnail>
                      </OtherWebToonImage>
                      <OtherWebToonInfo>
                        <OtherWebToonTitle>
                          {otherWebToon.title}
                        </OtherWebToonTitle>
                        <OtherWebToonAuthor>
                          {otherWebToon.author_name.map(
                            (author) => author + " "
                          )}
                        </OtherWebToonAuthor>
                      </OtherWebToonInfo>
                    </OtherWebToon>
                  ))
                )}
              </SARecommends>
            </SameAuthorRecommendZone>
            <WebToonAnalysisZone>
              <h2>웹툰 분석</h2>
              <AnalysisBack>
                <Analysis>
                  <PaintStyleAnalysis>
                    <ChartTitle1>그림체 분석</ChartTitle1>
                    <ChartShow
                      data={PaintStyleData}
                      options={PaintStyleOptions}
                    ></ChartShow>
                  </PaintStyleAnalysis>
                  <AgeGroupAnalysis>
                    <ChartTitle1>연령대 분석</ChartTitle1>
                    <ChartShow
                      data={AgeGroupData}
                      options={AgeGrouoOptions}
                    ></ChartShow>
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
      )}
    </div>
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
  width: 300px;
  height: 300px;
`;

const Info = styled.div`
  flex: 1;
  margin-top: 100px;
  margin-left: -10%;
`;

const SubInfo = styled.div`
  flex: 1;
  margin-top: 100px;
  margin-left: -10%;
`;

const Title = styled.h2`
  display: inline;
`;

const Author = styled.h3``;

const RatingZone = styled.h2`
  margin-top: 80px;
`;

const RatingButton = styled.button`
  cursor: pointer;
  margin-left: 80px;
`;

const Genre = styled.h2``;

const Day = styled.h2`
  display: inline;
`;

const WebToonLink = styled.div`
  display: inline;
`;

const Like = styled.div`
  display: inline;
  margin-left: 200px;
  font-size: 20pt;
  color: red;
`;

const Summary = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 100px;
  margin-right: 100px;
  padding-left: 10px;
  padding-top: 10px;
  height: 150px;
`;

const TagZone = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 100px;
  margin-left: 120px;
  margin-right: 100px;
  height: 100px;
`;

const Tag = styled.div`
  width: auto;
  margin: 30px 30px 30px 100px;
  border: 1px solid black;
  border-radius: 20px;
`;

const BookMarkImage = styled.div`
  display: inline;
  padding-left: 20px;
`;

const TagName = styled.div`
  display: inline;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 18pt;
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
  display: flex;
  background-color: white;
  height: 300px;
`;

const OtherWebToon = styled.div`
  padding: 0.8vw;
  padding-bottom: 0.3vw;
`;

const OtherWebToonImage = styled.div`
  background-color: white;
  width: 100%;
  height: 15vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
`;

const OtherWebToonThumbnail = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
`;

const OtherWebToonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.2vw;
  padding-bottom: 0.2vw;
  background-color: white;
  border-bottom-left-radius: 0.8vw;
  border-bottom-right-radius: 0.8vw;
`;

const OtherWebToonTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;

const OtherWebToonAuthor = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1vw;
  font-weight: 500;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
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
`;

const PaintStyleAnalysis = styled.div`
  flex: 1;
  display: inline;
  float: center;
  background-color: white;
  height: 50%;
`;

const AgeGroupAnalysis = styled.div`
  flex: 1;
  display: inline;
  float: center;
  background-color: white;
  height: 50%;
`;
const Graph = styled.div`
  background-color: white;
  height: 50%;
`;

const RatingGraph = styled.div``;

const ChartTitle1 = styled.div`
  padding-left: 50px;
  padding-top: 50px;
`;

const ChartTitle2 = styled.div`
  padding-top: 20px;
  margin-left: 500px;
`;

export default DetailPage;
