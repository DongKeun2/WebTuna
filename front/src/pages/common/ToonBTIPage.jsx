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
import SelectBtn from "../../components/common/SelectBtn";
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
        return <button onClick={onNext}>시작하기</button>;
      case 5:
        return <ToonBTIResult setPage={setPage}></ToonBTIResult>;
      default:
        const questionItem = question.filter((item) => {
          return findQuestion(item);
        })[0];
        console.log(questionItem);
        return (
          <div>
            <ArrowBox>
              <QuestionTitle>{questionItem.question}</QuestionTitle>
            </ArrowBox>
            <SelectBtn onClick={() => onAnswer(1)}>
              {questionItem.option1}
            </SelectBtn>
            <SelectBtn onClick={() => onAnswer(0)}>
              {questionItem.option2}
            </SelectBtn>
          </div>
        );
    }
  }

  const [page, setPage] = useState(0);
  const question = useSelector((state) => state.toonBTI.question);
  return <div>{startToonBTI()}</div>;
}

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
          <h1>ToonBTI</h1>

          <p>{toonInfo.title}</p>
          <p>{toonInfo.summary}</p>
          <ImgBox>
            <ToonImg src={toonInfo.thumbnail} alt="thumbnail_image" />
          </ImgBox>
          <div>
            <SelectBtn>
              <ToonLink href={toonInfo.page}>웹툰 보러가기</ToonLink>
            </SelectBtn>
            <SelectBtn onClick={moveDetail}>상세정보 바로가기</SelectBtn>
            <SelectBtn
              onClick={() => {
                dispatch(addAnswer([]));
                setPage(0);
              }}
            >
              <RestartAltIcon />
              다시 하기
            </SelectBtn>
          </div>
        </ResultBox>
      </ToonBTIBox>
    </ArticleBox>
  );
}

const ArticleBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ToonBTIBox = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  background-color: #feec91;
  border: 3px solid black;
  border-radius: 10px;
  height: 790px;
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
`;

const ImgBox = styled.div`
  border: 5px solid black;
  border-radius: 10%;
  overflow: hidden;
`;

const ToonImg = styled.img`
  object-fit: cover;
`;

const ToonLink = styled.a`
  color: black;
  text-decoration: none;
`;
