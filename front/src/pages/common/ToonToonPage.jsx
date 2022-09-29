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
import tuntunItem from "../../assets/tuntun/tuntunItem";
import "./toontoon.css";

function ToonToonPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const toons = useSelector((state) => state.tuntun.tuntun);
  useEffect(() => {
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
        <Loading text={"웹툰 잡아오는 중..."}></Loading>
      ) : (
        <ToonToonBox>{toons && <ToonList toons={toons} />}</ToonToonBox>
      )}
    </>
  );
}

const ToonToonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function ToonList({ toons }) {
  let rows = [];
  console.log(Object.keys(toons).length);
  for (let i = 0; i < Object.keys(toons).length; i = i + 2) {
    if (i + 1 <= Object.keys(toons).length) {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon type={i} toons={toons[i]} />
          <RightToon type={i + 1} toons={toons[i + 1]} />
        </ToonListBox>
      );
    } else {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon type={i} toons={toons[i]} />
        </ToonListBox>
      );
    }
  }
  return rows;
}

const ToonListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

function LeftToon({ toons, type }) {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(false);
  const isFocus = useSelector((state) => state.tuntun.focusTun);

  function onClickHandler() {
    dispatch(changeFocusTun(type));
  }

  return (
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
                    <TunImg src={tuntunItem[type]?.hover} alt="tun_hover_img" />
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
  );
}

const LeftBox = styled.div`
  align-self: start;
  width: 80vw;
  height: 17vw;
`;

const LeftOuterBox = styled.div`
  height: 17vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  background: linear-gradient(-110deg, transparent 100px, black 0);
`;

const LeftContentBox = styled.div`
  height: 17vw;
  width: 99.5%;
  height: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  background: linear-gradient(-110deg, transparent 100px, white 0);
`;

const LeftInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 97%;
  background: black;
  background: linear-gradient(-110deg, transparent 100px, black 0);
`;

const LeftBackBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 99.5%;
  height: 97%;
  background: linear-gradient(-110deg, transparent 100px, #feec91 0);
`;

const LeftItemBox = styled.div`
  width: 70vw;
  height: 100%;
  /* overflow: hidden; */
  background: linear-gradient(-110deg, transparent 100px, white, 0);

  @media screen and (max-width: 1290px) {
    width: 68vw;
  }
  @media screen and (max-width: 1090px) {
    width: 66vw;
  }
  @media screen and (max-width: 910px) {
    width: 63vw;
  }
  @media screen and (max-width: 850px) {
    width: 60vw;
  }
  @media screen and (max-width: 700px) {
    width: 55vw;
  }
  @media screen and (max-width: 500px) {
    width: 50vw;
  }
  @media screen and (max-width: 400px) {
    width: 45vw;
  }
  @media screen and (max-width: 400px) {
    width: 40vw;
  }
`;

function RightToon({ toons, type }) {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(false);
  const isFocus = useSelector((state) => state.tuntun.focusTun);
  return (
    <RightBox>
      <RightOuterBox>
        <RightContentBox>
          <RightInnerBox>
            <RightBackBox>
              <RightItemBox
                onClick={() => dispatch(changeFocusTun(type))}
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
                    <TunImg src={tuntunItem[type]?.hover} alt="tun_hover_img" />
                  </ImgBox>
                ) : (
                  <ImgBox>
                    <TunImg
                      src={tuntunItem[type]?.common}
                      alt="tun_common_img"
                    />
                  </ImgBox>
                )}
              </RightItemBox>
            </RightBackBox>
          </RightInnerBox>
        </RightContentBox>
      </RightOuterBox>
    </RightBox>
  );
}

const RightBox = styled.div`
  align-self: flex-end;
  width: 80vw;
  height: 17vw;
  text-align: end;
`;

const RightOuterBox = styled.div`
  height: 17vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  background: linear-gradient(110deg, transparent 100px, black 0);
`;

const RightContentBox = styled.div`
  height: 17vw;
  width: 99.5%;
  height: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  background: linear-gradient(110deg, transparent 100px, white 0);
`;

const RightInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 97%;
  background: black;
  background: linear-gradient(110deg, transparent 100px, black 0);
`;

const RightBackBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 99.5%;
  height: 97%;
  background: linear-gradient(110deg, transparent 100px, #eea6a6 0);
`;

const RightItemBox = styled.div`
  width: 70vw;
  height: 97%;
  /* overflow: hidden; */
  background: linear-gradient(110deg, transparent 100px, white, 0);
  @media screen and (max-width: 1290px) {
    width: 68vw;
  }
  @media screen and (max-width: 1090px) {
    width: 66vw;
  }
  @media screen and (max-width: 910px) {
    width: 63vw;
  }
  @media screen and (max-width: 850px) {
    width: 60vw;
  }
  @media screen and (max-width: 700px) {
    width: 55vw;
  }
  @media screen and (max-width: 500px) {
    width: 50vw;
  }
  @media screen and (max-width: 400px) {
    width: 45vw;
  }
  @media screen and (max-width: 400px) {
    width: 40vw;
  }
`;

export default ToonToonPage;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
`;

const TunImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

function ToonItem({ item }) {
  // 작가 이름 추출
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
  cursor: pointer;
`;

const ToonThumbnail = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
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
  cursor: pointer;
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
    cursor: pointer;
    opacity: 100%;
  }
  > * {
    color: white;
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
    cursor: pointer;
    opacity: 100%;
  }
  > * {
    color: white;
    font-size: large;
  }
`;
