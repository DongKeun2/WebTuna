import styled, { keyframes } from "styled-components";
import loadingImg1 from "../../assets/toon/tunbti.png";
import loadingImg2 from "../../assets/toon/conanTun.png";

function Loading({ type, text }) {
  window.scrollTo(0, 0);
  return (
    <LoadingBox>
      <LoadingMsg>{text}</LoadingMsg>
      <ImgBox>
        {type === "upload" ? (
          <ProfileImg src={loadingImg2} />
        ) : (
          <ProfileImg src={loadingImg1} />
        )}
      </ImgBox>
    </LoadingBox>
  );
}

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 70vh;
`;

const LoadingMsg = styled.p`
  font-size: 3vw;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 25px;
  }
`;

const move = keyframes`
	0%{
    top: 45%;
  } 
  10% {
    top: 44%;
  }
  20% {
    top: 43%;
  }
  30%{
    top: 42%;
  }
  40%{
    top: 41%;
  }
  50%{
    top: 40%
  }
  60%{
    top: 41%;
  }
  70%{
    top: 42%
  }
  80%{
    top: 43%;
  }
  90%{
    top: 44%;
  }
  100%{
    top: 45%;
  }
`;

const ImgBox = styled.div`
  position: absolute;
  margin-top: -20vh;
  margin-left: -150px;
  top: 45%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 70%;
  overflow: hidden;
  animation: ${move} 1.3s 0.1s infinite; ;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Loading;
