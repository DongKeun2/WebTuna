<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
>>>>>>> 6f89415 (fix: 업로드한 이미지 결과페이지에 그래프 까지 띄웠음)
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
>>>>>>> 1d997a0 (feat: 모델 생성 실패 시 경고창 / 그림체 result페이지 cleanup 추가)
import { useNavigate } from "react-router-dom";
=======
import { useNavigate, useLocation, Navigate } from "react-router-dom";
>>>>>>> 6c63e1b (fix: upload 페이지 새로고침&뒤로가기 시 페이지 이동 구현)
import styled from "styled-components";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { cleanResultData } from "../../features/toons/uploadSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import ChartShow from "../../components/common/Chart";

function UploadResultPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toonInfo = useSelector((state) => state.upload.webtoonInfo);
  const probability = useSelector((state) => state.upload.probability);
  const [paintGraphData, setPaintGraphData] = useState();
  const { state } = useLocation();

  const PaintStyleData = {
    margintop: -3,
    width: 25,
    labels: [
      "동글납작",
      "반짝섬세",
      "깔끔단정",
      "터프투박",
      "단순캐릭",
      "요즘트렌디",
    ],
    datasets: [
      {
        type: "radar",
        label: "업로드한 이미지의 그림체",
        fill: true,
        backgroundColor: "#5fc4f67b",
        borderColor: "#29adf07d",
        pointBorderColor: "#4bbffa",
        pointBackgroundColor: "#65ccff",
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

  useEffect(() => {
    dispatch(changeCurrentpage("upload"));
    setTimeout(() => {
      setPaintGraphData([
        probability[0] / 2 + 15,
        probability[1] / 2 + 15,
        probability[2] / 2 + 15,
        probability[3] / 2 + 15,
        probability[4] / 2 + 15,
        probability[5] / 2 + 15,
      ]);
    }, 500);
    return () => {
      dispatch(cleanResultData(undefined));
    };
  }, [dispatch, probability]);

  function moveDetail() {
    navigate(`/detail/${toonInfo.webtoon_id}`);
  }

  if (!toonInfo || !state) {
    return <Navigate to="/upload" replace={true} />;
  } else {
    return (
      <Container>
        <PageBox>
          <ResultHeader>분석 결과</ResultHeader>
          <ChartShow
            data={PaintStyleData}
            options={PaintStyleOptions}
          ></ChartShow>
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
}
const Container = styled.div`
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  padding: 1vw 0;
  border: solid 2px;
  border-radius: 1rem;
  background-color: white;
`;

const PageBox = styled.div`
  width: 96%;
  min-height: 73vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5vw;
  border: solid 2px;
  border-radius: 0.8rem;
  background-color: #fff5c3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultHeader = styled.p`
  font-size: 1.8vw;
  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }
  font-weight: 700;
  margin-bottom: 5vw;
  text-align: center;
`;

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
`;

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
    margin-left: 0;
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
`;

const ResultSummary = styled.div`
  font-size: 1vw;
  height: 60%;
  padding: 10px 5px;
  padding-left: 16px;
  background-color: white;
  border: 2px solid;
  border-radius: 0.5vw;
  overflow: auto;
  @media screen and (max-width: 750px) {
    height: 80px;
    padding: 5px 8px;
    border-radius: 3px;
  }
  &::-webkit-scrollbar {
    width: 1vw;
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

const BtnGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 750px) {
    gap: 10px;
    margin-top: 20px;
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
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextAgain = styled.p`
  margin: 0;
`;

export default UploadResultPage;
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)
