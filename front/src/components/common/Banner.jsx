import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import items from "../../assets/banner/bannerItem";
import { changeState } from "../../features/toons/mainSlice";
import "./banner.css";
import { useEffect } from "react";
import { hover } from "../../assets/cursor/cursorItem";

function Banner() {
  const dispatch = useDispatch();

  useEffect(() => {
    const bookMark = document.getElementsByClassName("dots");
    bookMark[0].style.backgroundColor = "#ffe357";

    bookMark[1].style.backgroundColor = "#eea6a6";

    bookMark[2].style.backgroundColor = "#f79f52";

    bookMark[3].style.backgroundColor = "#212121";

    bookMark[4].style.backgroundColor = "#fdeede";

    bookMark[5].style.backgroundColor = "#129bda";

    dispatch(changeState(0));
  }, [dispatch]);

  return (
    <CarouselBox>
      <Carousel
        swiping={false}
        disableAnimation={true}
        dragging={false}
        disableEdgeSwiping={true}
        dragThreshold="5"
        animation="fade"
        afterSlide={(currentSlice) => {
          // const bookMark = document.getElementsByClassName("dots");

          // switch (currentSlice) {
          //   case 0:
          //     for (let i = 0; i <= 5; i++) {
          //       bookMark[i].style.backgroundColor = "white";
          //     }
          //     break;
          //   case 1:
          //     for (let i = 0; i <= 5; i++) {
          //       bookMark[i].style.backgroundColor = "pink";
          //     }
          //     break;
          //   case 2:
          //     for (let i = 0; i <= 5; i++) {
          //       bookMark[i].style.backgroundColor = "orange";
          //     }
          //     break;
          //   case 3:
          //     for (let i = 0; i <= 5; i++) {
          //       bookMark[i].style.backgroundColor = "black";
          //     }
          //     break;
          //   case 4:
          //     for (let i = 0; i <= 5; i++) {
          //       bookMark[i].style.backgroundColor = "yellow";
          //     }
          //     break;
          //   case 5:
          //     for (let i = 0; i <= 5; i++) {
          //       bookMark[i].style.backgroundColor = "skyblue";
          //     }
          //     break;

          //   default:
          //     break;
          // }
          dispatch(changeState(currentSlice));
        }}
        autoplay={true}
        autoplayInterval={"5000"}
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
            cursor: `url(${hover}) 13 13, auto`,
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
        return "#ffe357";
      case 1:
        return "#eea6a6";
      case 2:
        return "#f79f52";
      case 3:
        return "#212121";
      case 4:
        return "#fdeede";
      case 5:
        return "#129bda";
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
  width: 68vw;
  height: 50vh;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1250px) {
    width: 80vw;
    height: 40vh;
  }
  @media screen and (max-width: 900px) {
    width: 90vw;
    height: 30vh;
  }
`;

const OuterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 43vh;
  background-color: ${(props) => props.color || "white"};
  border: 3px solid black;
  border-radius: 15px;
  @media screen and (max-width: 1250px) {
    height: 33vh;
    border: 2px solid black;
  }
  @media screen and (max-width: 900px) {
    height: 23vh;
    /* border: 1px solid black; */
  }
`;

const ImgBox = styled.div`
  /* border: 2px solid black; */
  border-radius: 10px;
  width: 98%;
  height: 40vh;
  overflow: hidden;
  @media screen and (max-width: 1250px) {
    height: 31vh;
  }
  @media screen and (max-width: 900px) {
    height: 20vh;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export default Banner;
