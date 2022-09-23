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
import { OuterBtn, SelectBtn } from "../../components/common/SelectBtn";
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
    <ArticleBox>
      <ToonBTIBox>
        <ResultBox>
          <TitleBox>
            <h1>짜란~</h1>
            <p>{toonInfo.title}</p>
            <p>{toonInfo.summary}</p>
          </TitleBox>
          <ImgBox>
            <ToonImg src={toonInfo.thumbnail} alt="thumbnail_image" />
          </ImgBox>
          <BtnGroup>
            <OuterBtn active={true}>
              <SelectBtn active={true} onClick={moveDetail}>
                상세정보 바로가기
              </SelectBtn>
            </OuterBtn>
            <OuterBtn active={true}>
              <SelectBtn
                active={true}
                onClick={() => {
                  navigate("/upload");
                }}
              >
                <RestartAltIcon />
                다시 하기
              </SelectBtn>
            </OuterBtn>
          </BtnGroup>
        </ResultBox>
      </ToonBTIBox>
    </ArticleBox>
  );
}

const ArticleBox = styled.div`
  display: flex;
  gap: 50px;
  height: 750px;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    gap: 20px;
  }
`;

const ToonBTIBox = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  background-color: #feec91;
  border: 3px solid black;
  border-radius: 10px;
  height: 750px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ResultBox = styled.div`
  display: flex;
  border: 3px solid black;
  border-radius: 10px;
  margin-top: 30px;
  height: 100%;
  width: 98%;
  background-color: white;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 600px) {
    gap: 10px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgBox = styled.div`
  border: 5px solid black;
  width: 300px;
  height: 300px;
  border-radius: 10%;
  overflow: hidden;
`;

const ToonImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export default UploadResultPage;
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)
