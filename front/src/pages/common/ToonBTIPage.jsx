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
      console.log(data);
      dispatch(submitToonBTI(data)).then(() => {});
    }
    setPage(page + 1);
    console.log(question);
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
  return (
    <div>
      <h1>설문 페이지</h1>
      {startToonBTI()}
    </div>
  );
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
  const dispatch = useDispatch();
  const toonInfo = useSelector((state) => state.toonBTI.result);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <p>링크</p>
      <a href={toonInfo.page}>웹툰 보러가기</a>
      <div>
        <p>제목</p>
        <p>{toonInfo.title}</p>
      </div>
      <div>
        <p>썸네일</p>
        <img src={toonInfo.thumbnail} alt="thumbnail_image" />
      </div>
      <div>
        <p>줄거리</p>
        <p>{toonInfo.summary}</p>
      </div>
      <div>
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
    </div>
  );
}
