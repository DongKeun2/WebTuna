import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  detail,
  noLoginDetail,
  webtoonLike,
  webtoonLog,
  webtoonRating,
  tagLike
} from "../features/details/detailSlice";
import { fetchInfo } from "../features/accounts/loginSlice";
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
  let { toonId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [webToonInfo, setWebToonInfo] = useState();
  const [otherWebToons, setOtherWebToons] = useState();
  const [paintGraphData, setPaintGraphData] = useState();
  const [ratingGraphData, setRatingGraphData] = useState();
  const [averageRating, setAverageRating] = useState();
  const [modal, setModal] = useState(false);
  // const [modalRating, setModalRating] = useState(5);
  const day = ["None", "월", "화", "수", "목", "금", "토", "일", "완결"];
  let userData = useSelector((state) => state.login.currentUser);
  let loginState = sessionStorage.getItem("token");
  const navigate = useNavigate();

  function getDetail() {
    if (!loginState) {
      dispatch(noLoginDetail(toonId)).then((res) => {
        console.log(res.payload.is_rated + "비로그인");
        console.log(res.payload);
        setWebToonInfo(res.payload);
        setPaintGraphData([
          res.payload.data.image_type1 / 2 + 15,
          res.payload.data.image_type2 / 2 + 15,
          res.payload.data.image_type3 / 2 + 15,
          res.payload.data.image_type4 / 2 + 15,
          res.payload.data.image_type5 / 2 + 15,
          res.payload.data.image_type6 / 2 + 15,
        ]);
        setRatingGraphData([
          res.payload.data.webtoon_rate[0],
          res.payload.data.webtoon_rate[1],
          res.payload.data.webtoon_rate[2],
          res.payload.data.webtoon_rate[3],
          res.payload.data.webtoon_rate[4],
          res.payload.data.webtoon_rate[5],
          res.payload.data.webtoon_rate[6],
          res.payload.data.webtoon_rate[7],
          res.payload.data.webtoon_rate[8],
          res.payload.data.webtoon_rate[9],
          res.payload.data.webtoon_rate[10],
        ]);
        setAverageRating(getAverageRating(res.payload.data));
        setOtherWebToons(res.payload.author_webtoons);
        setIsLoading(false);
      });
    } else {
      dispatch(detail(toonId)).then((res) => {
        console.log(res.payload.is_rated + "로그인");
        console.log(res.payload);
        setWebToonInfo(res.payload);
        setPaintGraphData([
          res.payload.data.image_type1 / 2 + 15,
          res.payload.data.image_type2 / 2 + 15,
          res.payload.data.image_type3 / 2 + 15,
          res.payload.data.image_type4 / 2 + 15,
          res.payload.data.image_type5 / 2 + 15,
          res.payload.data.image_type6 / 2 + 15,
        ]);
        setRatingGraphData([
          res.payload.data.webtoon_rate[0],
          res.payload.data.webtoon_rate[1],
          res.payload.data.webtoon_rate[2],
          res.payload.data.webtoon_rate[3],
          res.payload.data.webtoon_rate[4],
          res.payload.data.webtoon_rate[5],
          res.payload.data.webtoon_rate[6],
          res.payload.data.webtoon_rate[7],
          res.payload.data.webtoon_rate[8],
          res.payload.data.webtoon_rate[9],
          res.payload.data.webtoon_rate[10],
        ]);
        setAverageRating(getAverageRating(res.payload.data));
        setOtherWebToons(res.payload.author_webtoons);
        setIsLoading(false);
      });
    }
  }

  function getAverageRating(data) {
    let sum = 0;
    let total = 0;
    for (let i = 0; i < 11; i++) {
      sum += data.webtoon_rate[i] * (0.5 * i);
      total += data.webtoon_rate[i];
    }
    if (total === 0) {
      return 0;
    }
    return sum / total;
  }

  function switchModal() {
    setModal((prev) => !prev);
  }

  function changeRating(e) {
    // setModalRating(e.target.value);
    let data = { toonId, rating: e.target.value };
    console.log(data);
    dispatch(webtoonRating(data)).then((res) => {
      if (res.error) {
        console.log("실패");
      } else {
        dispatch(fetchInfo()).then(() => {
          console.log("평점 주기 성공");
          getDetail();
        });
      }
    });

    setModal(false);
  }

  function heartClick() {
    dispatch(webtoonLike(toonId)).then((res) => {
      if (res.error) {
        console.log("하트 실패");
      } else {
        dispatch(fetchInfo()).then(() => {
          console.log("하트 스위치~");
        });
      }
    });
  }

  function logAndLink() {
    dispatch(webtoonLog(toonId)).then((res) => {
      if (res.error) {
        console.log("로그 남기기 실패");
      } else {
        dispatch(fetchInfo()).then(() => {
          console.log("로그 남기기 ㅋ");
        });
      }
    });
    window.open(webToonInfo.data.page);
  }

  function moveDetail(e) {
    toonId = e.target.parentNode.id;
    navigate(`/detail/${toonId}`);
    getDetail();
  }

  function tagSwitch(e) {
    dispatch(tagLike(e.target.parentNode.id)).then((res) => {
      if (res.error) {
        console.log("태그 찜 실패");
      } else {
        dispatch(fetchInfo()).then(() => {
          console.log("태그 스위치~");
        });
      }
    });
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
                  src={webToonInfo.data.thumbnail}
                  alt="썸네일"
                ></ThumbnailImage>
              </Thumbnail>
              <Info>
                <Title>{webToonInfo.data.title}</Title>
                <Author>
                  {webToonInfo.data.authors.map((author) => author.name + " ")}
                </Author>
                <RatingZone>
                  별점 ★ {averageRating.toFixed(1)}{" "}
                  {loginState === null || webToonInfo.is_rated === 1 ? null : (
                    <RatingButton onClick={switchModal}>별점 주기</RatingButton>
                  )}
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
                  {webToonInfo.data.genres.map(
                    (genre) => genre.genre_type + " "
                  )}
                </Genre>
                <Day>
                  {webToonInfo.data.days[0].day_id === 8
                    ? "완결 웹툰"
                    : `${day[webToonInfo.data.days[0].day_id]}요일 연재`}
                </Day>
              </Info>
              <SubInfo>
                <WebToonLink>
                  <LinkButton onClick={logAndLink}>웹툰 보러가기</LinkButton>
                </WebToonLink>
                <Like>
                  {userData.liked_webtoons ===
                    undefined ? null : userData.liked_webtoons.includes(
                      Number(toonId)
                    ) ? (
                    <FHeart
                      src={FullHeart}
                      alt="찜"
                      width="50px"
                      onClick={heartClick}
                    ></FHeart>
                  ) : (
                    <EHeart
                      src={EmptyHeart}
                      alt="노찜"
                      width="50px"
                      onClick={heartClick}
                    ></EHeart>
                  )}
                </Like>
                <Summary>{webToonInfo.data.summary}</Summary>
              </SubInfo>
            </DetailZone>
            <TagZone>
              {webToonInfo.data.tags.map((tag) => (
                <Tag key={tag.tag_id} id={tag.tag_id}>
                  <BookMarkImage>
                    <img src={BookMark} alt="북마크" width="20px"></img>
                  </BookMarkImage>
                  <TagName>{tag.name}</TagName>
                  {loginState === null ? null : userData.tags.includes(tag.tag_id) ? <MinusButton onClick={tagSwitch}>-</MinusButton> : <PlusButton onClick={tagSwitch}>+</PlusButton>}
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
                {(otherWebToons.length === 0 || otherWebToons === undefined) ? (
                  <h1>텅~</h1>
                ) : (
                  otherWebToons.map((otherWebToon) => (
                    <OtherWebToon
                      key={otherWebToon.webtoon_id}
                      id={otherWebToon.webtoon_id}
                    >
                      <OtherWebToonThumbnail
                        src={otherWebToon.thumbnail}
                        alt="같은 작가의 다른 작품 이미지"
                        onClick={moveDetail}
                      ></OtherWebToonThumbnail>
                      <OtherWebToonTitle onClick={moveDetail}>
                        {otherWebToon.title}
                      </OtherWebToonTitle>
                      <OtherWebToonAuthor onClick={moveDetail}>
                        {otherWebToon.author_name.map((author) => author + " ")}
                      </OtherWebToonAuthor>
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

const RatingButton = styled.div`
  display: inline;
  cursor: pointer;
  margin-left: 80px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  padding: 5px;
  &:hover {
    background-color: skyblue;
  }
`;

const Genre = styled.h2``;

const Day = styled.h2`
  display: inline;
`;

const WebToonLink = styled.div`
  display: inline;
`;

const LinkButton = styled.div`
  display: inline;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  padding: 5px;
  &:hover {
    background-color: skyblue;
  }
`;

const Like = styled.div`
  display: inline;
  margin-left: 200px;
  font-size: 20pt;
  color: red;
`;

const FHeart = styled.img`
&:hover {
  opacity:0.5;
}
`;

const EHeart = styled.img`
&:hover {
  transform: scale(1.2);
}
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

const TagToggle = styled.div`
  display: inline;
`

const MinusButton = styled.div`
display: inline;
font-size: 20pt;
`

const PlusButton = styled.div`
display: inline;
font-size: 20pt;
`

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

const OtherWebToonThumbnail = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
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
