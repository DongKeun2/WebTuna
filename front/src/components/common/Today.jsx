import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  changeLuckyModal,
  changeIsPossibleModal,
} from "../../features/accounts/loginSlice";
import cardImg from "../../assets/card.jpg";
import close from "../../assets/detail/Close.png";
import { hover } from "../../assets/cursor/cursorItem";
import ToonItem from "../toonlist/ToonItem";

function Today() {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);

  const luckyMsg = useSelector((state) => state.login.luckyMsg);
  const luckyToon = useSelector((state) => state.login.luckyWebtoon);

  function switchModal() {
    dispatch(changeIsPossibleModal(false));
    dispatch(changeLuckyModal(false));
  }
  return (
    <ModalFrame _handleModal={switchModal}>
      {isSelected ? (
        <>
          <ModalTitle>당신의 오늘 운세!</ModalTitle>
          <ModalText>{luckyMsg}</ModalText>
          <ItemBox onClick={switchModal}>
            <ToonItem item={luckyToon[0]}></ToonItem>
          </ItemBox>
          <BtnBox>
            <OutBtn onClick={switchModal}>나가기</OutBtn>
          </BtnBox>
        </>
      ) : (
        <>
          <ModalTitle>당신의 운세를 확인해드립니다!</ModalTitle>
          <ModalText>마음에 드는 카드를 한 장 고르세요!</ModalText>
          <CardContainer>
            <CardBox onClick={() => setIsSelected(true)}>
              <CardImg src={cardImg} alt="card_back_img"></CardImg>
            </CardBox>
            <CardBox onClick={() => setIsSelected(true)}>
              <CardImg src={cardImg} alt="card_back_img"></CardImg>
            </CardBox>
            <CardBox onClick={() => setIsSelected(true)}>
              <CardImg src={cardImg} alt="card_back_img"></CardImg>
            </CardBox>
          </CardContainer>
          <BtnBox>
            <OutBtn onClick={switchModal}>안 할래요,,,</OutBtn>
          </BtnBox>
        </>
      )}
    </ModalFrame>
  );
}

export default Today;

const ModalTitle = styled.p`
  margin-top: 3vw;
  margin-bottom: 0;
  font-size: 2vw;
  @media screen and (max-width: 1100px) {
    font-size: 4vw;
  }
`;

const ModalText = styled.p`
  font-size: 1.5vw;
  margin-bottom: 2vw;
`;

const ItemBox = styled.div``;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const CardBox = styled.div`
  width: 15vw;
  height: auto;
  overflow: hidden;
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
  @media screen and (max-width: 1100px) {
    width: 20vw;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  bottom: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBlock = styled.div`
  position: fixed;
  border: 1px black solid;
  border-radius: 10px;
  padding: 0 1.5rem 5rem;
  background-color: white;
  top: 10rem;
  width: 70%;
  height: auto;
  animation: modal-show 1s;
  @media screen and (max-width: 1100px) {
    width: 90%;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Close = styled.img.attrs({
  src: close,
  width: 20,
})`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: url(${hover}) 13 13, auto;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnBox = styled.div``;

const OutBtn = styled.button`
  font-size: 20px;
  font-weight: bold;
  background-color: #feec91;
  padding: 10px 20px;
  border-radius: 15px;
  border: 3px solid white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: "50px";
  height: "30px";
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
`;

const ModalFrame = ({ _handleModal, children, ...rest }) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <Container>
      <Background />
      <ModalBlock {...rest}>
        <Close onClick={_handleModal} />
        <Contents>{children}</Contents>
      </ModalBlock>
    </Container>
  );
};
