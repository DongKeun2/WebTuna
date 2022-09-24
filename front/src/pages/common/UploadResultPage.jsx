<<<<<<< HEAD
<<<<<<< HEAD
import { useSelector } from 'react-redux'

function UploadResultPage() {
  const webtoonInfo = useSelector(state => state.upload.webtoonInfo)

  return (
    <div>
      <h1>그림체추천 결과 페이지</h1>
    </div>
  )
}

export default UploadResultPage
=======
import { useSelector } from "react-redux";
=======
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
>>>>>>> 1d997a0 (feat: 모델 생성 실패 시 경고창 / 그림체 result페이지 cleanup 추가)
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { cleanResultData } from "../../features/toons/uploadSlice";

function UploadResultPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toonInfo = useSelector((state) => state.upload.webtoonInfo);

  useEffect(() => {
    return () => {
      dispatch(cleanResultData({}));
    };
  }, [dispatch]);

  function moveDetail() {
    navigate(`/detail/${toonInfo.webtoon_id}`);
  }

  return (
    <Container>
      <PageBox>
        <ResultHeader>분석 결과</ResultHeader>
        <ResultBox>
          <ImgBox>
            <ToonImg src={toonInfo.thumbnail} alt="thumbnail_image" />
          </ImgBox>
          <TitleBox>
            <ResultTitle>{toonInfo.title}</ResultTitle>
            <ResultSummary>{toonInfo.summary}</ResultSummary>
            <BtnGroup>
              <ResultBtn active={true} onClick={moveDetail}>
                상세 정보
              </ResultBtn>
              <ResultBtn
                active={true}
                onClick={() => {
                  navigate("/upload");
                }}
              >
                <FlexBox>
                  <RestartAltIcon />
                  <TextAgain>다시 하기</TextAgain>
                </FlexBox>
              </ResultBtn>
            </BtnGroup>
          </TitleBox>
        </ResultBox>
      </PageBox>
    </Container>
  );
}
const Container = styled.div`
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  padding: 1vw 0;
  border: solid 2px;
  border-radius: 1rem;
  background-color: white;
`

const PageBox = styled.div`
  width: 96%;
  min-height: 73vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  border: solid 2px;
  border-radius: 0.8rem;
  background-color: #FFF5C3;
  display: flex;
  flex-direction: column;
`

const ResultHeader = styled.p`
  font-size: 1.8vw;
  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }
  font-weight: 700;
  margin-bottom: 5vw;
  text-align: center;
`

const ResultBox = styled.div`
  width: 60%;
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
  margin-left: auto;
  margin-right: auto;
  display: flex;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
  justify-content: space-between;
`

const ImgBox = styled.div`
  border: 3px solid;
  width: 20vw;
  height: 20vw;
  min-width: 300px;
  min-height: 300px;
  @media screen and (max-width: 750px) {
    margin-left: auto;
    margin-right: auto;
  }
  background-color: white;
  border-radius: 10%;
  overflow: hidden;
`;

const ToonImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 3vw;
  @media screen and (max-width: 750px) {
    margin-top: 20px;
    gap: 10px;
  }
`;

const ResultTitle = styled.p`
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  @media screen and (max-width: 750px) {
    font-size: 16px;
    text-align: center;
  }
`

const ResultSummary = styled.div`
  font-size: 1vw;
  height: 60%;
  @media screen and (max-width: 750px) {
    height: 80px;
  }
  padding: 5px 8px;
  background-color: white;
  border: 2px solid;
  border-radius: 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BtnGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 750px) {
    gap: 10px;
    margin-bottom: 100px;
  }
`;

const ResultBtn = styled.button`
  width: 40%;
  @media screen and (max-width: 1100px) {
    width: 48%;
  }
  padding: 5px 0;
  background-color: #feec91;
  font-size: 0.8vw;
  font-weight: 700;
  border-radius: 12px;
  border: 6px solid white;
  cursor: pointer;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextAgain = styled.p`
  margin: 0;
`

export default UploadResultPage;
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)
