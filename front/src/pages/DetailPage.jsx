import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  detail,
  noLoginDetail,
  webtoonLike,
  webtoonLog,
  webtoonRating,
  tagLike,
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
import MySwal from "../components/common/SweetAlert";

function DetailPage() {
  let { toonId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [webToonInfo, setWebToonInfo] = useState();
  const [otherWebToons, setOtherWebToons] = useState();
  const [paintGraphData, setPaintGraphData] = useState();
  const [ratingGraphData, setRatingGraphData] = useState();
  const [ratingCount, setRatingCount] = useState();
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(1);
  const [slideCount, setSlideCount] = useState();
  const [authors, setAuthors] = useState();
  // const [modalRating, setModalRating] = useState(5);
  const day = ["None", "월", "화", "수", "목", "금", "토", "일", "완결"];
  let userData = useSelector((state) => state.login.currentUser);
  let loginState = sessionStorage.getItem("token");
  let slide;

  function getDetail() {
    window.scrollTo(0, 0);
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
        setRatingCount(getRatingCount(res.payload.data));
        setOtherWebToons(res.payload.author_webtoons);
        setSlideCount(
          Math.ceil(Number(res.payload.author_webtoons.length) / 4)
        );
        let tempauthors = "";
        for (const num in res.payload.data.authors) {
          if (num > 0) {
            tempauthors += " / ";
            tempauthors += res.payload.data.authors[num].name;
          } else {
            tempauthors += res.payload.data.authors[num].name;
          }
        }
        setAuthors(tempauthors);
        setIsLoading(false);
        setTimeout(() => {
          slide = document.getElementById("slide");
          slide.style.left = "0vw";
          setCount(1);
        }, 50);
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
        setRatingCount(getRatingCount(res.payload.data));
        setOtherWebToons(res.payload.author_webtoons);
        setSlideCount(
          Math.ceil(Number(res.payload.author_webtoons.length) / 4)
        );
        let tempauthors = "";
        for (const num in res.payload.data.authors) {
          if (num > 0) {
            tempauthors += " / ";
            tempauthors += res.payload.data.authors[num].name;
          } else {
            tempauthors += res.payload.data.authors[num].name;
          }
        }
        setAuthors(tempauthors);
        setIsLoading(false);
        setTimeout(() => {
          slide = document.getElementById("slide");
          slide.style.left = "0vw";
          setCount(1);
        }, 50);
      });
    }
  }

  function getRatingCount(data) {
    let total = 0;
    for (let i = 0; i < 11; i++) {
      total += data.webtoon_rate[i];
    }

    return total;
  }

  function switchModal() {
    setModal((prev) => !prev);
  }

  function changeRating(e) {
    MySwal.fire({
      title: `${e.target.value}점 확실합니까?`,
      text: "한번 준 별점은 변경할 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#faaf00",
      cancelButtonColor: "gray",
      confirmButtonText: "O",
      cancelButtonText: "X",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          icon: "success",
          title: "별점이 반영되었습니다!",
          confirmButtonColor: "#faaf00",
        });
        let data = { toonId, rating: e.target.value };
        console.log(data);
        dispatch(webtoonRating(data)).then((res) => {
          if (res.error) {
            console.log("실패");
          } else {
            dispatch(fetchInfo()).then(() => {
              console.log("별점 주기 성공");
              getDetail();
            });
          }
        });
        setModal(false);
      }
    });
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
    if (loginState === null) {
      console.log("넌 로그인 안했으니까 로그 안남겨줄거야");
    } else {
      dispatch(webtoonLog(toonId)).then((res) => {
        if (res.error) {
          console.log("로그 남기기 실패");
        } else {
          dispatch(fetchInfo()).then(() => {
            console.log("로그 남기기 ㅋ");
          });
        }
      });
    }
    window.open(webToonInfo.data.page);
  }

  function moveDetail(e) {
    setIsLoading(true);
    toonId = e.target.parentNode.parentNode.id;
    navigate(`/detail/${toonId}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
    getDetail();
  }

  function tagSwitch(e) {
    if (e.target.id) {
      dispatch(tagLike(e.target.id)).then((res) => {
        if (res.error) {
          console.log("태그 찜 실패");
        } else {
          dispatch(fetchInfo()).then(() => {
            console.log("태그 스위치~");
          });
        }
      });
    } else {
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
  }

  function left() {
    slide = document.getElementById("slide");
    if (count === 1) {
      return;
    } else {
      let temp = Number(
        slide.style.left.substring(0, slide.style.left.length - 2)
      );
      slide.style.left = temp + 72 + "vw";
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
      slide.style.left = temp - 72 + "vw";
      setCount((prev) => prev + 1);
    }
  }

  function toLogin() {
    MySwal.fire({
      icon: 'warning',
      title: '로그인이 필요합니다!',
      confirmButtonColor: '#faaf00',
    })
    setTimeout(() => {
      navigate(`/login`);
    }, 100);
  }

  useEffect(() => {
    setIsLoading(true);
    getDetail();
  }, [toonId]);

  const PaintStyleData = {
    margintop: 3,
    marginleft: 3,
    width: 25,
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
    margintop: 3,
    marginleft: 3,
    width: 23,
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
    margintop: 5,
    marginleft: 15,
    width: 40,
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
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <PageBox>
          <BackGround>
            <DetailZone>
              <Thumbnail>
                <ThumbnailImage
                  src={webToonInfo.data.thumbnail}
                  alt="썸네일"
                ></ThumbnailImage>
              </Thumbnail>
              <Info>
                <TitleAuthor>
                  <Title>{webToonInfo.data.title}</Title>
                  <Author>{authors}</Author>
                </TitleAuthor>
                <RatingGenreDay>
                  <RatingZone>
                    별점 ★ {Math.round(webToonInfo.data.rating * 10) / 10} (
                    {ratingCount}명)
                    {loginState === null ? (
                      <RatingButton onClick={toLogin}>별점 주기</RatingButton>
                    ) : webToonInfo.is_rated === 1 ? (
                      <AlreadyRating>참여 완료</AlreadyRating>
                    ) : (
                      <RatingButton onClick={switchModal}>
                        별점 주기
                      </RatingButton>
                    )}
                    {modal ? (
                      <ModalFrame _handleModal={switchModal}>
                        <ModalTitle>당신의 별점은?</ModalTitle>
                        <StarZone>
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
                        </StarZone>
                      </ModalFrame>
                    ) : null}
                  </RatingZone>
                  <Genre>
                    {webToonInfo.data.genres.map(
                      (genre) => genre.genre_type + " "
                    )}
                  </Genre>
                  <Day>
                    {webToonInfo.data.days[0].day_id === 8
                      ? "완결 웹툰"
                      : webToonInfo.data.days.length === 1
                      ? `${day[webToonInfo.data.days[0].day_id]}요일 연재`
                      : webToonInfo.data.days
                          .slice(0, -1)
                          .map((dayy) => day[dayy.day_id]) +
                        " , " +
                        webToonInfo.data.days
                          .slice(-1)
                          .map((dayy) => day[dayy.day_id]) +
                        "요일 연재"}
                  </Day>
                </RatingGenreDay>
              </Info>
              <SubInfo>
                <WebToonLink>
                  {userData.liked_webtoons === undefined ? (
                    <EHeart
                      src={EmptyHeart}
                      alt="노찜"
                      onClick={toLogin}
                    ></EHeart>
                  ) : userData.liked_webtoons.includes(Number(toonId)) ? (
                    <FHeart
                      src={FullHeart}
                      alt="찜"
                      onClick={heartClick}
                    ></FHeart>
                  ) : (
                    <EHeart
                      src={EmptyHeart}
                      alt="노찜"
                      onClick={heartClick}
                    ></EHeart>
                  )}
                  <LinkButton onClick={logAndLink}>웹툰 보러가기</LinkButton>
                </WebToonLink>
                <Summary>{webToonInfo.data.summary}</Summary>
              </SubInfo>
            </DetailZone>
            <TagZone>
              {webToonInfo.data.tags.length === 0 ||
              webToonInfo.data.tags === undefined
                ? "텅~"
                : webToonInfo.data.tags.map((tag) =>
                    loginState === null ? (
                      <Tag key={tag.tag_id} id={tag.tag_id}>
                        <BookMarkImage src={BookMark} alt="북마크" />
                        <TagName>{tag.name}</TagName>
                      </Tag>
                    ) : userData.tags.includes(tag.tag_id) ? (
                      <LikedTag
                        key={tag.tag_id}
                        id={tag.tag_id}
                        onClick={tagSwitch}
                      >
                        <BookMarkImage src={BookMark} alt="북마크" />
                        <TagName>{tag.name}</TagName>
                        <MinusButton>-</MinusButton>
                      </LikedTag>
                    ) : (
                      <Tag key={tag.tag_id} id={tag.tag_id} onClick={tagSwitch}>
                        <BookMarkImage src={BookMark} alt="북마크" />
                        <TagName>{tag.name}</TagName>
                        <PlusButton>+</PlusButton>
                      </Tag>
                    )
                  )}
            </TagZone>
            <PaintStyleRecommendZone>
              <div>그림체가 비슷한 웹툰</div>
              <PSRecommends>
                {webToonInfo.similar_webtoon.length === 0 ||
                webToonInfo.similar_webtoon === undefined ? (
                  <div>그림체가 비슷한 웹툰이 없어요 ㅠ</div>
                ) : (
                  webToonInfo.similar_webtoon.map((similarWebtoon) => (
                    <OtherWebToon
                      key={similarWebtoon.webtoon_id}
                      id={similarWebtoon.webtoon_id}
                    >
                      <ImgBox onClick={moveDetail}>
                        <OtherWebToonThumbnail
                          src={similarWebtoon.thumbnail}
                          alt="같은 작가의 다른 작품 이미지"
                        ></OtherWebToonThumbnail>
                      </ImgBox>
                      <ToonInfo onClick={moveDetail}>
                        <OtherWebToonTitle>
                          {similarWebtoon.title}
                        </OtherWebToonTitle>
                        <OtherWebToonAuthor>
                          {similarWebtoon.author_name.length === 1
                            ? similarWebtoon.author_name[0]
                            : similarWebtoon.author_name
                                .slice(0, -1)
                                .map((author) => author) +
                              " / " +
                              similarWebtoon.author_name
                                .slice(-1)
                                .map((author) => author)}
                        </OtherWebToonAuthor>
                      </ToonInfo>
                    </OtherWebToon>
                  ))
                )}
              </PSRecommends>
            </PaintStyleRecommendZone>
            <SameAuthorRecommendZone>
              <div>같은 작가의 다른 작품</div>
              {slideCount >= 2 ? (
                <>
                  {count === 1 ? null : <PrevBtn onClick={left}>좌</PrevBtn>}
                  {count === slideCount ? null : (
                    <NextBtn onClick={right}>우</NextBtn>
                  )}
                </>
              ) : null}
              <SARecommendsBack>
                <SARecommends id="slide">
                  {otherWebToons.length === 0 || otherWebToons === undefined ? (
                    <div>작가님의 다른 작품이 없어요 ㅠ</div>
                  ) : (
                    otherWebToons.map((otherWebToon) => (
                      <OtherWebToon
                        key={otherWebToon.webtoon_id}
                        id={otherWebToon.webtoon_id}
                      >
                        <ImgBox onClick={moveDetail}>
                          <OtherWebToonThumbnail
                            src={otherWebToon.thumbnail}
                            alt="같은 작가의 다른 작품 이미지"
                            onClick={moveDetail}
                          ></OtherWebToonThumbnail>
                        </ImgBox>
                        <ToonInfo onClick={moveDetail}>
                          <OtherWebToonTitle onClick={moveDetail}>
                            {otherWebToon.title}
                          </OtherWebToonTitle>
                          <OtherWebToonAuthor onClick={moveDetail}>
                            {otherWebToon.author_name.length === 1
                              ? otherWebToon.author_name[0]
                              : otherWebToon.author_name
                                  .slice(0, -1)
                                  .map((author) => author) +
                                " / " +
                                otherWebToon.author_name
                                  .slice(-1)
                                  .map((author) => author)}
                          </OtherWebToonAuthor>
                        </ToonInfo>
                      </OtherWebToon>
                    ))
                  )}
                </SARecommends>
              </SARecommendsBack>
            </SameAuthorRecommendZone>
            <WebToonAnalysisZone>
              <div>웹툰 분석</div>
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
        </PageBox>
      )}
    </>
  );
}

const PageBox = styled.div`
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10vw;
  padding: 1vw 0;
  border: solid 2px;
  border-radius: 1rem;
  background-color: white;
`;

const BackGround = styled.div`
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  background-color: #fff5c3;
  border: solid 2px;
  border-radius: 0.8rem;
  padding-bottom: 5vw;
`;

const DetailZone = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;

const Thumbnail = styled.div`
  background-color: white;
  width: 20vw;
  height: 20vw;
  margin-left: 7.5vw;
  margin-top: 5vw;
`;

const ThumbnailImage = styled.img`
  object-fit: fill;
  width: 20vw;
  height: 20vw;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25vw;
  height: 20vw;
  margin-left: 2vw;
  margin-top: 5vw;
`;

const TitleAuthor = styled.div``;

const RatingGenreDay = styled.div``;

const Title = styled.div`
  vertical-align: top;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 2vw;
  font-weight: 600;
  margin-top: -0.5vw;
`;

const Author = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 1vw;
  font-size: 1.8vw;
`;

const RatingZone = styled.div`
  padding-top: 5vw;
  padding-bottom: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.5vw;
`;

const RatingButton = styled.div`
  display: inline;
  cursor: pointer;
  margin-left: 3vw;
  border: 1px solid black;
  border-radius: 0.6vw;
  background-color: white;
  padding: 0.3vw;
  &:hover {
    background-color: pink;
  }
`;

<<<<<<< HEAD
const ModalTitle = styled.div`
margin-top: 3vw;
font-size:2vw;
`

const StarZone = styled.div`
margin-top: 2vw;
=======
const AlreadyRating = styled.div`
  display: inline;
  margin-left: 3vw;
  font-size: 1.5vw;
  border: 1px solid black;
  border-radius: 0.6vw;
  background-color: lightgray;
  padding: 0.3vw;
<<<<<<< HEAD
>>>>>>> 36265cc (fix: 프로필 페이지 조금 수정)
`
=======
`;

const ModalTitle = styled.div`
  margin-top: 3vw;
  font-size: 2vw;
`;

const StarZone = styled.div`
  margin-top: 2vw;
`;
>>>>>>> c5f8629 (feat: 프로필 태그 추가 제거)

const Genre = styled.div`
  padding-bottom: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.5vw;
`;

const Day = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.5vw;
`;

const SubInfo = styled.div`
  flex: 3;
  height: 20vw;
  margin-top: 3vw;
`;

const WebToonLink = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border-radius: 1vw;
  width: 70%;
`;

const LinkButton = styled.div`
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.5vw;
  margin-right: 2vw;
  border: 0.05vw solid black;
  border-radius: 0.6vw;
  background-color: white;
  padding: 0.3vw;
  height: 2vw;
  &:hover {
    background-color: pink;
  }
`;

const FHeart = styled.img`
  cursor: pointer;
  width: 3.3vw;
  transition: 0.5s;
  &:hover {
    opacity: 0.5;
  }
`;

const EHeart = styled.img`
  cursor: pointer;
  width: 3.3vw;
  transition: 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`;

const Summary = styled.div`
  background-color: white;
  border: 0.1vw solid black;
  border-top-left-radius: 0.5vw;
  border-top-right-radius: 0.5vw;
  border-bottom-left-radius: 0.5vw;
  border-bottom-right-radius: 0.5vw;
  margin-top: 7vw;
  font-size: 1vw;
  padding: 0.5vw 0.8vw 1vw 0.8vw;
  width: 70%;
  height: 10vw;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.8vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bab9b9;
    border-radius: 3vw;
  }
  &::-webkit-scrollbar-track {
    background-color: #e7e4e4;
    border-radius: 3vw;
  }
`;

const TagZone = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 1.5vw;
  margin-top: 8vw;
  margin-left: 7.5vw;
  margin-right: 6.5vw;
  border: solid 0.1vw;
  border-radius: 1vw;
  background-color: white;
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

const Tag = styled.div`
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

const PaintStyleRecommendZone = styled.div`
  margin-left: 7.5vw;
  margin-right: 6.5vw;
  overflow: hidden;
`;

const PSRecommends = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.6vw;
  border: 0.1vw solid black;
  padding: 0.8vw;
  justify-content: space-between;
`;

const SameAuthorRecommendZone = styled.div`
  margin-left: 7.5vw;
  margin-right: 6.5vw;
`;

const PrevBtn = styled.div`
  cursor: pointer;
  position: absolute;
  margin-top: 7vw;
  margin-left: -4.5vw;
  font-size: 5vw;
  z-index: 1;
`;

const NextBtn = styled.div`
  cursor: pointer;
  position: absolute;
  margin-top: 7vw;
  margin-left: 73vw;
  font-size: 5vw;
  z-index: 1;
`;

const SARecommendsBack = styled.div`
  display: flex;
  background-color: white;
  overflow: hidden;
  border-radius: 0.6vw;
  border: 0.1vw solid black;
`;

const SARecommends = styled.div`
  position: relative;
  display: flex;
  left: 0vw;
  background-color: white;
  padding: 0.8vw;
  transition: all 1s;
`;

const OtherWebToon = styled.div`
  cursor: pointer;
  width: 14vw;
  margin-left: 2vw;
  margin-right: 2vw;
`;

const ImgBox = styled.div`
  background-color: white;
  width: 100%;
  height: 15vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  cursor: pointer;
`;

const OtherWebToonThumbnail = styled.img`
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
  margin-left: 7.5vw;
  margin-right: 6.5vw;
`;

const AnalysisBack = styled.div`
  border: 0.1vw solid black;
  border-radius: 0.6vw;
  height: 60vw;
`;

const Analysis = styled.div`
  border-radius: 0.6vw;
  display: flex;
  background-color: white;
  height: 30vw;
`;

const PaintStyleAnalysis = styled.div`
  flex: 1;
  display: inline;
  background-color: white;
  border-radius: 0.6vw;
  height: 30vw;
`;

const AgeGroupAnalysis = styled.div`
  border-radius: 0.6vw;
  flex: 1;
  display: inline;
  float: center;
  background-color: white;
  height: 30vw;
`;
const Graph = styled.div`
  border-radius: 0.6vw;
  background-color: white;
  height: 30vw;
`;

const RatingGraph = styled.div``;

const ChartTitle1 = styled.div`
  padding-left: 13vw;
  padding-top: 3vw;
`;

const ChartTitle2 = styled.div`
  padding-top: 5vw;
  margin-bottom: -3vw;
  margin-left: 33vw;
`;

export default DetailPage;
