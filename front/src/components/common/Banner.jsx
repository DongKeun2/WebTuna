import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import items from "../../assets/banner/bannerItem";
import { changeState } from "../../features/toons/mainSlice";

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  opacity: 60%;
  :hover {
    cursor: pointer;
    opacity: 90%;
  }
  > * {
    color: white;
    font-size: large;
  }
`;

function Banner() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.main.currentState);
  return (
    <CarouselBox>
      <Carousel
        animation="zoom"
        afterSlide={(currentSlice) => {
          dispatch(changeState(currentSlice));
        }}
        autoplay={true}
        autoplayInterval={"3500"}
        wrapAround={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <Button>
            <ArrowBackIosIcon
              fontSize="large"
              onClick={previousSlide}
            ></ArrowBackIosIcon>
          </Button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <Button>
            <ArrowForwardIosIcon
              fontSize="large"
              onClick={nextSlide}
            ></ArrowForwardIosIcon>
          </Button>
        )}
        defaultControlsConfig={{
          pagingDotsStyle: {
            padding: "0px 3px",
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
  return (
    <OuterBox>
      <ImgBox>
        <BannerImg src={item.img} alt="banner img" />
      </ImgBox>
    </OuterBox>
  );
}

const CarouselBox = styled.div`
  width: 85vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 47vh;
  background-color: white;
  border: 3px solid black;
  border-radius: 15px;
`;

const ImgBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  width: 98%;
  height: 44vh;
  overflow: hidden;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export default Banner;
