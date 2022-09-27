import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import items from "../../assets/banner/bannerItem";
import { changeState } from "../../features/toons/mainSlice";
import "./banner.css";
import { useEffect } from "react";

function Banner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeState(0));
  }, [dispatch]);

  return (
    <CarouselBox>
      <Carousel
        disableAnimation={true}
        disableEdgeSwiping={true}
        dragThreshold="5"
        animation="fade"
        afterSlide={(currentSlice) => {
          const bookMark = document.getElementsByClassName("dots");

          switch (currentSlice) {
            case 0:
              for (let i = 0; i <= 5; i++) {
                bookMark[i].style.backgroundColor = "white";
              }
              break;
            case 1:
              for (let i = 0; i <= 5; i++) {
                bookMark[i].style.backgroundColor = "pink";
              }
              break;
            case 2:
              for (let i = 0; i <= 5; i++) {
                bookMark[i].style.backgroundColor = "orange";
              }
              break;
            case 3:
              for (let i = 0; i <= 5; i++) {
                bookMark[i].style.backgroundColor = "black";
              }
              break;
            case 4:
              for (let i = 0; i <= 5; i++) {
                bookMark[i].style.backgroundColor = "yellow";
              }
              break;
            case 5:
              for (let i = 0; i <= 5; i++) {
                bookMark[i].style.backgroundColor = "skyblue";
              }
              break;

            default:
              break;
          }
          dispatch(changeState(currentSlice));
        }}
        autoplay={true}
        autoplayInterval={"3500"}
        wrapAround={true}
        renderCenterLeftControls={({ previousSlide }) => null}
        renderCenterRightControls={({ nextSlide }) => null}
        defaultControlsConfig={{
          pagingDotsContainerClassName: "dotsBox",
          pagingDotsClassName: "dots",
          pagingDotsStyle: {
            fill: "none",
            backgroundColor: "white",
            width: "100%",
            height: "115%",
            borderTop: "none",
            border: "3px solid black",
            borderRadius: "0px 0px 10px 10px",
          },
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </CarouselBox>
  );
}

function Item({ item }) {
  const state = useSelector((state) => state.main.currentState);

  function selectColor() {
    switch (state) {
      case 0:
        return "white";
      case 1:
        return "pink";
      case 2:
        return "orange";
      case 3:
        return "black";
      case 4:
        return "yellow";
      case 5:
        return "skyblue";
      default:
        break;
    }
    return "black";
  }

  return (
    <OuterBox color={selectColor()}>
      <ImgBox>
        <BannerImg src={item.img} alt="banner img" />
      </ImgBox>
    </OuterBox>
  );
}

const CarouselBox = styled.div`
  width: 85vw;
  height: 50vh;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 900px) {
    height: 30vh;
  }
  @media screen and (max-width: 650px) {
    height: 30vh;
  }
`;

const OuterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 47vh;
  background-color: ${(props) => props.color || "white"};
  border: 3px solid black;
  border-radius: 15px;
  @media screen and (max-width: 900px) {
    height: 26vh;
  }
  @media screen and (max-width: 650px) {
    height: 26vh;
  }
`;

const ImgBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  width: 98%;
  height: 44vh;
  overflow: hidden;
  @media screen and (max-width: 900px) {
    height: 23vh;
  }
  @media screen and (max-width: 650px) {
    height: 23vh;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export default Banner;
