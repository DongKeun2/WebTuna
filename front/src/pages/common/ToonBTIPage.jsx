import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  addAnswer,
  fetchToonBTI,
  submitToonBTI,
} from "../../features/toons/toonBTISlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import { OuterBtn, SelectBtn } from "../../components/common/SelectBtn";
import Loading from "../../components/common/Loading";
import talkToon from "../../assets/toon/tunbti.png";

function ToonBTIPage() {
  sessionStorage.setItem("url", `/toonbti`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentpage("toonbti"));
    dispatch(fetchToonBTI());
    return () => {
      dispatch(addAnswer([]));
    };
  }, [dispatch]);

  function onNext(submitAnswer) {
    if (page === 4) {
      const data = {
        answer: submitAnswer,
      };
      dispatch(submitToonBTI(data));
    }
    setPage(page + 1);
  }

  function findQuestion(item) {
    if (item.question_id === page) {
      return item;
    }
  }

  const answerList = useSelector((state) => state.toonBTI.answer);
  function onAnswer(answer) {
    const newAnswer = [...answerList, answer];
    dispatch(addAnswer(newAnswer));
    onNext(newAnswer);
  }

  function startToonBTI() {
    switch (page) {
      case 0:
        return (
          <PageBox>
            <ToonBox>
              <ToonBTITitleBox>
                <ToonBTITItle>너에게 어울리는</ToonBTITItle>
                <ToonBTITItle>웹툰을 추천해줄게!</ToonBTITItle>
              </ToonBTITitleBox>
              <StartImgBox>
                <TunImg src={talkToon} alt="tuntun_img" />
              </StartImgBox>
              <StartBtn onClick={onNext}>시작하기</StartBtn>
            </ToonBox>
          </PageBox>
        );
      case 5:
        return <ToonBTIResult setPage={setPage}></ToonBTIResult>;
      default:
        const questionItem = question.filter((item) => {
          return findQuestion(item);
        })[0];
        return (
          <PageBox>
            <ToonBox>
              <ToonBTIBox>
                <TalkImgBox>
                  <TalkImg src={talkToon} alt="thumbnail_image" />
                </TalkImgBox>
                <Body>
                  <ArrowBox>
                    <QuestionTitle>{questionItem.question}</QuestionTitle>
                  </ArrowBox>
                  <OuterBtn active={true}>
                    <SelectBtn active={true} onClick={() => onAnswer(1)}>
                      {questionItem.option1}
                    </SelectBtn>
                  </OuterBtn>
                  <OuterBtn active={true}>
                    <SelectBtn active={true} onClick={() => onAnswer(0)}>
                      {questionItem.option2}
                    </SelectBtn>
                  </OuterBtn>
                </Body>
              </ToonBTIBox>
            </ToonBox>
          </PageBox>
        );
    }
  }

  const [page, setPage] = useState(0);
  const question = useSelector((state) => state.toonBTI.question);
  return <div>{startToonBTI()}</div>;
}

const PageBox = styled.div`
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  padding: 1vw 0;
  border: solid 2px;
  border-radius: 1rem;
  background-color: white;
`;

const ToonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  min-height: 73vh;
  @media screen and (min-width: 1100px) {
    min-height: 68vh;
  }
  padding-top: 3vw;
  padding-bottom: 70px;
  @media screen and (max-width: 750px) {
    padding-top: 20px;
    padding-bottom: 90px;
  }
  border: solid 2px;
  border-radius: 0.8rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #fff5c3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToonBTITitleBox = styled.div`
  position: relative;
  min-height: 50px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 0.5vw 2vw;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    padding: 10px 24px;
    gap: 0;
  }
  :after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    content: "";
    border: 27px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -13.3px;
    margin-bottom: -27px;
  }
  :before {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    content: "";
    border: 28px solid transparent;
    border-top-color: black;
    border-bottom: 0;
    margin-left: -14px;
    margin-bottom: -29.5px;
  }
`;

const ToonBTITItle = styled.p`
  font-size: 1.5vw;
  font-weight: 700;
  @media screen and (max-width: 750px) {
    font-size: 16px;
    line-height: 0;
  }
`;

const StartImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vh;
  min-width: 320px;
  min-height: 320px;
  overflow: hidden;
`;

const TunImg = styled.img`
  width: 315px;
  height: 315px;
  object-fit: fill;
`;

const StartBtn = styled.button`
  background-color: #feec91;
  font-size: 1.2vw;
  font-weight: 700;
  padding: 15px 30px;
  border-radius: 12px;
  border: 6px solid white;
  margin-top: 20px;
  width: "50px";
  height: "30px";
  @media screen and (max-width: 750px) {
    font-size: 12px;
  }
`;

const ToonBTIBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TalkImgBox = styled.div`
  width: 30vw;
  min-width: 100px;
  height: auto;
  @media screen and (max-width: 1100px) {
    width: 25vw;
  }
`;

const TalkImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ArrowBox = styled.div`
  position: relative;
  padding: 0px 50px;
  height: 8vh;
  display: inline-block;
  background: #ffffff;
  border: 3px solid black;
  border-radius: 10px;
  :after {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-right-color: #ffffff;
    border-width: 16px;
    margin-top: -16px;
  }
  :before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(254, 236, 145, 0);
    border-right-color: black;
    border-width: 20px;
    margin-top: -20px;
  }
  @media screen and (max-width: 750px) {
    height: 6vh;
  }
`;

const QuestionTitle = styled.p`
  position: relative;
  font-size: 2vh;
  @media screen and (max-width: 750px) {
    font-size: 1.8vh;
  }
`;

export default ToonBTIPage;

function ToonBTIResult({ setPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toonInfo = useSelector((state) => state.toonBTI.result);
  const summary = useSelector((state) => state.toonBTI.info);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  function moveDetail() {
    navigate(`/detail/${toonInfo.webtoon_id}`);
  }

  function toonBTIText() {
    return "웹툰 취향을 분석하는 중..";
  }

  if (isLoading) {
    return <Loading text={toonBTIText()}></Loading>;
  }
  return (
    <PageBox>
      <ToonBox>
        <ResultHeader>이런 웹툰은 어때요?</ResultHeader>
        <ResultBox>
          <TitleBox>
            <ResultSummary>{summary}</ResultSummary>
            <ResultTitle>{toonInfo.title}</ResultTitle>
          </TitleBox>
          <ImgBox>
            <ToonImg src={toonInfo.thumbnail} alt="thumbnail_image" />
          </ImgBox>
          <BtnGroup>
            <ResultBtn active={true} onClick={moveDetail}>
              상세 정보
            </ResultBtn>
            <ResultBtn
              active={true}
              onClick={() => {
                dispatch(addAnswer([]));
                setPage(0);
              }}
            >
              <FlexBox>
                <RestartAltIcon />
                <TextAgain>다시 하기</TextAgain>
              </FlexBox>
            </ResultBtn>
          </BtnGroup>
        </ResultBox>
      </ToonBox>
    </PageBox>
  );
}

const ResultHeader = styled.p`
  margin-top: 0;
  margin-bottom: 3vw;
  font-size: 1.6vw;
  font-weight: 700;
  @media screen and (max-width: 750px) {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const ResultBox = styled.div`
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    gap: 10px;
  }
`;

const ResultTitle = styled.p`
  padding: 2vw 0;
  padding-bottom: 1vw;
  text-align: center;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0;
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
`;

const ResultSummary = styled.div`
  font-size: 2vw;
  padding: 5px 8px;
  text-overflow: ellipsis;
  @media screen and (max-width: 750px) {
    font-size: 20px;
  }
`;

const BtnGroup = styled.div`
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  gap: 3vw;
  margin-top: 2.5vw;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    width: 60%;
    gap: 20px;
    margin-top: 30px;
    margin-bottom: 40px;
  }
`;

const ResultBtn = styled.button`
  width: 40%;
  @media screen and (max-width: 1100px) {
    width: 48%;
  }
  padding: 10px 0;
  @media screen and (max-width: 750px) {
    padding: 5px 0;
  }
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
