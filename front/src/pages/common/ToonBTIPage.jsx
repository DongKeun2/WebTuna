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
import { OuterBtn, SelectBtn } from "../../components/common/SelectBtn";
import Loading from "../../components/common/Loading";
import talkToon from "../../assets/test/tuntun4.png";

function ToonBTIPage() {
  const dispatch = useDispatch();

  useEffect(() => {
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
    console.log(newAnswer);
    dispatch(addAnswer(newAnswer));
    onNext(newAnswer);
  }

  function startToonBTI() {
    switch (page) {
      case 0:
        return (
          <PageBox>
            <ToonBox>
              <ToonBTITItle>ToonBTI</ToonBTITItle>
              <StartImgBox>
                <TunImg src={talkToon} alt="tuntun_img" />
              </StartImgBox>
              <OuterBtn onClick={onNext} active={true}>
                <SelectBtn active={true}>시작하기</SelectBtn>
              </OuterBtn>
            </ToonBox>
          </PageBox>
        );
      case 5:
        return <ToonBTIResult setPage={setPage}></ToonBTIResult>;
      default:
        const questionItem = question.filter((item) => {
          return findQuestion(item);
        })[0];
        console.log(questionItem);
        return (
          <PageBox>
            <ToonBox>
              <Header>
                <TalkBox>
                  <TalkImgBox>
                    <TalkImg src={talkToon} alt="thumbnail_image" />
                  </TalkImgBox>
                  <ArrowBox>
                    <QuestionTitle>{questionItem.question}</QuestionTitle>
                  </ArrowBox>
                </TalkBox>
              </Header>
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
            </ToonBox>
          </PageBox>
        );
    }
  }

  const [page, setPage] = useState(0);
  const question = useSelector((state) => state.toonBTI.question);
  return <div>{startToonBTI()}</div>;
}

const StartImgBox = styled.div`
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
  margin-left: 2vw;
`;

const ToonBTITItle = styled.p`
  margin-top: 2vw;
  font-size: 2.5vw;
  font-weight: 700;
  @media screen and (max-width: 750px) {
    margin-top: 20px;
    font-size: 20px;
    line-height: 0;
  }
`;

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
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  min-height: 73vh;
  @media screen and (min-width: 1100px) {
    min-height: 68vh;
  }
  padding: 0.5vw;
  padding-bottom: 100px;
  @media screen and (max-width: 750px) {
    padding-bottom: 70px;
  }
  @media screen and (min-width: 1240px) {
    padding-bottom: 80px;
  }
  border: solid 2px;
  border-radius: 0.8rem;
  background-color: #fff5c3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const TalkBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  width: 80%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const TalkImgBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
`;

const TalkImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArrowBox = styled.div`
  position: relative;
  padding: 0px 50px;
  height: 5vw;
  display: inline-block;
  background: #ffffff;
  border: 3px solid #feec91;
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
    border-right-color: #feec91;
    border-width: 20px;
    margin-top: -20px;
  }

  @media screen and (max-width: 600px) {
    width: 85%;
  }
`;

const QuestionTitle = styled.p`
  position: relative;
  top: -20%;
  font-size: 2vw;
  @media screen and (max-width: 600px) {
    top: 2%;
    font-size: 18px;
  }
`;

export default ToonBTIPage;

function ToonBTIResult({ setPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toonInfo = useSelector((state) => state.toonBTI.result);

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
    <ArticleBox>
      <ToonBTIBox>
        <ResultBox>
          <TitleBox>
            <h1>ToonBTI</h1>
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
                  dispatch(addAnswer([]));
                  setPage(0);
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
  border-radius: 10%;
  overflow: hidden;
`;

const ToonImg = styled.img`
  object-fit: cover;
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
