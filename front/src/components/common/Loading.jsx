import styled, { keyframes } from "styled-components";
import loadingImg from "../../assets/test/cute.png";

function Loading() {
  return (
    <LoadingBox>
      <LoadingMsg>로딩중입니다</LoadingMsg>
      <ImgBox>
        <ProfileImg src={loadingImg} />
      </ImgBox>
    </LoadingBox>
  );
}

const LoadingBox = styled.div`
  display: flex;
  width: 100%;
  height: 790px;
`;

const LoadingMsg = styled.p`
  position: absolute;
  top: 55%;
  left: 40%;
  font-size: 40px;
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
  margin-top: -15%;
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
