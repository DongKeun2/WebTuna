import { useEffect } from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

function ToonBTIPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToonBTI());
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
          <ArticleBox>
            <StartBox>
              <OuterBtn onClick={onNext} active={true} result={true}>
                <SelectBtn active={true} result={true}>
                  시작하기
                </SelectBtn>
              </OuterBtn>
            </StartBox>
          </ArticleBox>
        );
      case 5:
        return <ToonBTIResult setPage={setPage}></ToonBTIResult>;
      default:
        const questionItem = question.filter((item) => {
          return findQuestion(item);
        })[0];
        console.log(questionItem);
        return (
          <ArticleBox>
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
          </ArticleBox>
        );
    }
  }

  const [page, setPage] = useState(0);
  const question = useSelector((state) => state.toonBTI.question);
  return <div>{startToonBTI()}</div>;
}

const StartBox = styled.div`
  height: 300px;
`;

const ArrowBox = styled.div`
  position: relative;
  width: 500px;
  height: 100px;
  display: inline-block;
  background: #ffffff;
  border: 4px solid #feec91;
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
    border-width: 15px;
    margin-top: -15px;
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
    border-width: 21px;
    margin-top: -21px;
  }

  @media screen and (max-width: 600px) {
    width: 85%;
  }
`;

const QuestionTitle = styled.p`
  text-align: center;
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

  if (isLoading) {
    return <Loading></Loading>;
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
            <OuterBtn active={true} result={true}>
              <SelectBtn active={true} onClick={moveDetail}>
                상세정보 바로가기
              </SelectBtn>
            </OuterBtn>
            <OuterBtn active={true} result={true}>
              <SelectBtn
                active={true}
                result={true}
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
  height: 790px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  height: 790px;
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
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 600px) {
    gap: 20px;
  }
`;
