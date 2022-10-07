import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MySwal from "../../components/common/SweetAlert";
import Loading from "../../components/common/Loading";
import { fetchtuntun, changeFocusTun } from "../../features/toons/tuntunSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import tuntunItem from "../../assets/tuntun/tuntunItem";
import "./toontoon.css";
import { hover } from "../../assets/cursor/cursorItem";

function ToonToonPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const toons = useSelector((state) => state.tuntun.tuntun);
  useEffect(() => {
    dispatch(changeCurrentpage("myeong"));
    if (!sessionStorage.getItem("token")) {
      MySwal.fire({
        title: "로그인 후 이용해주세요.",
        icon: "warning",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
        reverseButtons: true,
      });
      navigate("/login", { state: pathname });
    } else {
      setIsLoading(true);
      dispatch(fetchtuntun()).then(() => {
        setIsLoading(false);
      });
    }

    return () => dispatch(changeFocusTun(undefined));
  }, [navigate, pathname, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading text={"\u00A0 웹툰 잡아오는 중..."}></Loading>
      ) : (
        <ToonToonBox id="tuntun">
          {toons && <ToonList toons={toons} />}
        </ToonToonBox>
      )}
    </>
  );
}

const ToonToonBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
  margin-bottom: 8vw;
  @media screen and (max-width: 1500px) {
    gap: 10px;
  }
  @media screen and (max-width: 1100px) {
    gap: 5px;
  }
  @media screen and (max-width: 850px) {
    gap: 2vh;
  }
`;

function ToonList({ toons }) {
  let rows = [];
  for (let i = 0; i < Object.keys(toons).length; i = i + 2) {
    if (i + 1 <= Object.keys(toons).length) {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon type={i} toons={toons[i][0]} msg={toons[i][1]} />
          <RightToon
            type={i + 1}
            toons={toons[i + 1][0]}
            msg={toons[i + 1][1]}
          />
        </ToonListBox>
      );
    } else {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon type={i} toons={toons[i][0]} msg={toons[i][1]} />
        </ToonListBox>
      );
    }
  }
  return rows;
}

const ToonListBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: 1500px) {
    gap: 10px;
  }
  @media screen and (max-width: 1100px) {
    gap: 5px;
  }
  @media screen and (max-width: 850px) {
    gap: 2vh;
  }
`;

function LeftToon({ toons, type, msg }) {
  const dispatch = useDispatch();

  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  const [isHover, setIsHover] = useState(false);
  const isFocus = useSelector((state) => state.tuntun.focusTun);

  function onClickHandler() {
    if (type === 0 && (!userInfo.liked_webtoons?.length || !toons.length)) {
      dispatch(changeFocusTun(undefined));
      MySwal.fire({
        title: "유저 기반 추천 불가!",
        html: "맘에 드는 웹툰을 찜해보세요! <br/>찜한 목록을 기반으로 추천을 해드립니다! ",
        icon: "info",
        width: "50vw",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
    } else if (
      type === 2 &&
      (!userInfo.liked_webtoons?.length || !toons.length)
    ) {
      dispatch(changeFocusTun(undefined));
      MySwal.fire({
        title: "장르 기반 추천 불가!",
        html: "맘에 드는 웹툰을 찜해보세요! <br/>찜한 목록을 기반으로 추천을 해드립니다! ",
        icon: "info",
        width: "50vw",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
    } else if (type === 4 && (!toons.length || toons.length < 3)) {
      MySwal.fire({
        title: "추천 불가!",
        html: "회원님과 비슷한 나이, 연령대의 유저가 없습니다!<br/>  회원님이 기준이 되어주세요!",
        icon: "info",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
    } else {
      dispatch(changeFocusTun(type));
    }
  }

  return (
    <>
      {isFocus === type && (
        <LeftTitleBox>
          <LeftTitle>{msg}</LeftTitle>
        </LeftTitleBox>
      )}
      <LeftBox>
        <LeftOuterBox>
          <LeftContentBox>
            <LeftInnerBox>
              <LeftBackBox>
                <LeftItemBox
                  onClick={onClickHandler}
                  onMouseOver={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  {isFocus === type ? (
                    <Carousel
                      wrapAround={true}
                      disableEdgeSwiping={true}
                      slidesToShow={3}
                      scrollMode="remainder"
                      slidesToScroll={3}
                      cellSpacing={1}
                      cellAlign="center"
                      renderCenterLeftControls={({ previousSlide }) => (
                        <LeftButton>
                          <ArrowBackIosIcon
                            fontSize="large"
                            onClick={previousSlide}
                          ></ArrowBackIosIcon>
                        </LeftButton>
                      )}
                      renderCenterRightControls={({ nextSlide }) => (
                        <RightButton>
                          <ArrowForwardIosIcon
                            fontSize="large"
                            onClick={nextSlide}
                          ></ArrowForwardIosIcon>
                        </RightButton>
                      )}
                    >
                      {toons.map((toon) => {
                        return <ToonItem key={toon.webtoon_id} item={toon} />;
                      })}
                    </Carousel>
                  ) : isHover ? (
                    <ImgBox>
                      <TunImg
                        src={tuntunItem[type]?.hover}
                        alt="tun_hover_img"
                      />
                    </ImgBox>
                  ) : (
                    <ImgBox>
                      <TunImg
                        src={tuntunItem[type]?.common}
                        alt="tun_common_img"
                      />
                    </ImgBox>
                  )}
                </LeftItemBox>
              </LeftBackBox>
            </LeftInnerBox>
          </LeftContentBox>
        </LeftOuterBox>
      </LeftBox>
    </>
  );
}

const LeftBox = styled.div`
  align-self: start;
  width: 80vw;
  min-width: 80vw;
  height: 17vw;
  @media screen and (max-width: 850px) {
    width: 100vw;
    height: 20vh;
  }
`;

const LeftTitleBox = styled.div`
  width: fit-content;
  border-radius: 10px;
  padding: 0 1vw;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 1vw;
  font-size: 2vw;
  @media screen and (max-width: 850px) {
    margin-left: 1vh;
    font-size: 3vw;
  }
`;
const LeftTitle = styled.p`
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  font-weight: bold;
  color: #feec91;
  text-align: center;
  padding: 0;
  margin: 1vw 0 0;
  @media screen and (max-width: 850px) {
    vertical-align: bottom;
  }
`;

const LeftOuterBox = styled.div`
  height: 17vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  background: linear-gradient(-110deg, transparent 13vw, black 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, black, 0);
  }
`;

const LeftContentBox = styled.div`
  height: 17vw;
  width: 99.5%;
  height: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  background: linear-gradient(-110deg, transparent 13vw, white 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, white, 0);
  }
`;

const LeftInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 97%;
  background: black;
  background: linear-gradient(-110deg, transparent 13vw, black 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, black, 0);
  }
`;

const LeftBackBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 99.5%;
  height: 97%;
  background: linear-gradient(-110deg, transparent 13vw, #feec91 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, #feec91, 0);
  }
`;

const LeftItemBox = styled.div`
  width: 65vw;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(-110deg, transparent 13vw, white, 0);

  :hover {
    cursor: url(${hover}) 13 13, auto;
  }

  @media screen and (max-width: 850px) {
    width: 84vw;
    background: linear-gradient(-110deg, transparent 17vw, white, 0);
  }
`;

function RightToon({ toons, type, msg }) {
  const dispatch = useDispatch();

  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  const [isHover, setIsHover] = useState(false);
  const isFocus = useSelector((state) => state.tuntun.focusTun);

  function onClickHandler() {
    if (type === 3 && (userInfo.tags?.length < 3 || !toons.length)) {
      dispatch(changeFocusTun(undefined));
      MySwal.fire({
        title: "태그 기반 추천 불가!",
        text: "태그를 세 개 이상 찜해보세요!",
        icon: "info",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
    } else if (!toons?.length) {
      dispatch(changeFocusTun(undefined));
      MySwal.fire({
        title: "추천 불가!",
        text: "왜인지 모르지만 추천 받을 웹툰이 없습니다!",
        icon: "info",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
    } else {
      dispatch(changeFocusTun(type));
    }
  }
  return (
    <RightContainer>
      {isFocus === type && (
        <RightTitleBox>
          <RightTitle>{msg}</RightTitle>
        </RightTitleBox>
      )}
      <RightBox>
        <RightOuterBox>
          <RightContentBox>
            <RightInnerBox>
              <RightBackBox>
                {isFocus === type ? (
                  <RightItemBox onMouseLeave={() => setIsHover(false)}>
                    <Carousel
                      wrapAround={true}
                      disableEdgeSwiping={true}
                      slidesToShow={3}
                      scrollMode="remainder"
                      slidesToScroll={3}
                      cellSpacing={1}
                      cellAlign="center"
                      renderCenterLeftControls={({ previousSlide }) => (
                        <LeftButton>
                          <ArrowBackIosIcon
                            fontSize="large"
                            onClick={previousSlide}
                          ></ArrowBackIosIcon>
                        </LeftButton>
                      )}
                      renderCenterRightControls={({ nextSlide }) => (
                        <RightButton>
                          <ArrowForwardIosIcon
                            fontSize="large"
                            onClick={nextSlide}
                          ></ArrowForwardIosIcon>
                        </RightButton>
                      )}
                    >
                      {toons.map((toon) => {
                        return <ToonItem key={toon.webtoon_id} item={toon} />;
                      })}
                    </Carousel>
                  </RightItemBox>
                ) : isHover ? (
                  <RightImgBox
                    onClick={onClickHandler}
                    onMouseLeave={() => setIsHover(false)}
                  >
                    <ImgBox>
                      <TunImg
                        src={tuntunItem[type]?.hover}
                        alt="tun_hover_img"
                      />
                    </ImgBox>
                  </RightImgBox>
                ) : (
                  <RightImgBox
                    onMouseOver={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                  >
                    <ImgBox>
                      <TunImg
                        src={tuntunItem[type]?.common}
                        alt="tun_common_img"
                      />
                    </ImgBox>
                  </RightImgBox>
                )}
              </RightBackBox>
            </RightInnerBox>
          </RightContentBox>
        </RightOuterBox>
      </RightBox>
    </RightContainer>
  );
}

const RightContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: flex-end;
  @media screen and (max-width: 1500px) {
    gap: 10px;
  }
  @media screen and (max-width: 1100px) {
    gap: 5px;
  }
  @media screen and (max-width: 850px) {
    gap: 2vh;
  }
`;

const RightTitleBox = styled.div`
  border-radius: 10px;
  padding: 0 1vw;
  width: fit-content;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 1vw;
  font-size: 2vw;
  @media screen and (max-width: 850px) {
    margin-left: 1vh;
    font-size: 3vw;
  }
`;

const RightTitle = styled.p`
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  color: #eea6a6;
  font-weight: bold;
  text-align: center;
  padding: 0;
  margin: 1vw 0 0;
  @media screen and (max-width: 850px) {
    vertical-align: bottom;
  }
`;

const RightImgBox = styled.div`
  display: flex;
  justify-content: end;
  width: 65vw;
  height: 100%;
  background: linear-gradient(110deg, transparent 13vw, white, 0);

  :hover {
    cursor: url(${hover}) 13 13, auto;
  }

  @media screen and (max-width: 850px) {
    width: 84vw;
    background: linear-gradient(-110deg, transparent 17vw, white, 0);
  }
`;

const RightBox = styled.div`
  align-self: flex-end;
  width: 80vw;
  height: 17vw;
  text-align: end;
  min-width: 80vw;
  @media screen and (max-width: 850px) {
    width: 100vw;
    height: 20vh;
  }
`;

const RightOuterBox = styled.div`
  height: 17vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  background: linear-gradient(110deg, transparent 13vw, black 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, black, 0);
  }
`;

const RightContentBox = styled.div`
  height: 17vw;
  width: 99.5%;
  height: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  background: linear-gradient(110deg, transparent 13vw, white 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, white, 0);
  }
`;

const RightInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 97%;
  background: black;
  background: linear-gradient(110deg, transparent 13vw, black 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, black, 0);
  }
`;

const RightBackBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 99.5%;
  height: 97%;
  background: linear-gradient(110deg, transparent 13vw, #eea6a6 0);
  @media screen and (max-width: 850px) {
    background: linear-gradient(-110deg, transparent 17vw, #eea6a6, 0);
  }
`;

const RightItemBox = styled.div`
  width: 65vw;
  height: 100%;
  background: linear-gradient(110deg, transparent 13vw, white, 0);

  :hover {
    cursor: url(${hover}) 13 13, auto;
  }

  @media screen and (max-width: 850px) {
    width: 84vw;
    background: linear-gradient(-110deg, transparent 17vw, white, 0);
  }
`;

export default ToonToonPage;

const ImgBox = styled.div`
  width: 99%;
  height: 100%;
`;

const TunImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

function ToonItem({ item }) {
  let authors = "";
  for (const num in item.author_name) {
    if (num > 0) {
      authors += " / ";
      authors += item.author_name[num];
    } else {
      authors += item.author_name[num];
    }
  }

  const navigate = useNavigate();

  function moveDetail() {
    navigate(`/detail/${item.webtoon_id}`);
    window.scrollTo(0, 0);
  }

  return (
    <ToonContainer>
      <OneTun>
        <ImageBox onClick={moveDetail}>
          <ToonThumbnail src={item.thumbnail} alt="" />
        </ImageBox>
        <ToonInfo onClick={moveDetail}>
          <ToonTitle>{item.title}</ToonTitle>
          <ToonAuthor>{authors}</ToonAuthor>
        </ToonInfo>
      </OneTun>
    </ToonContainer>
  );
}

const ToonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const OneTun = styled.div`
  width: 80%;
`;

const ImageBox = styled.div`
  background-color: white;
  width: 100%;
  height: 10vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  cursor: url(${hover}) 13 13, auto;
  @media screen and (max-width: 850px) {
    height: 13vh;
  }
`;

const ToonThumbnail = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const ToonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.2vw;
  padding-bottom: 0.2vw;
  background-color: white;
  border-bottom-left-radius: 0.8vw;
  border-bottom-right-radius: 0.8vw;
  cursor: url(${hover}) 13 13, auto;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const ToonTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;

const ToonAuthor = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1vw;
  font-weight: 500;
  margin: 0;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;

const LeftButton = styled.button`
  padding: 10px;
  margin-left: -0.5vw;
  background-color: transparent;
  border: none;
  opacity: 85%;
  :hover {
    cursor: url(${hover}) 13 13, auto;
    opacity: 100%;
  }
  > * {
    color: black;
    font-size: large;
  }
`;

const RightButton = styled.button`
  padding: 10px;
  margin-right: -1vw;
  background-color: transparent;
  border: none;
  opacity: 85%;
  :hover {
    cursor: url(${hover}) 13 13, auto;
    opacity: 100%;
  }
  > * {
    color: black;
    font-size: large;
  }
`;
