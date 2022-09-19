import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, fetchToonBTI } from "../../features/toons/toonBTISlice";

function ToonBTIPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToonBTI());
  }, [dispatch]);

  function onNext() {
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
    onNext();
  }

  function startToonBTI() {
    switch (page) {
      case 0:
        return <button onClick={onNext}>시작하기</button>;
      case 5:
        return <div>끝남요</div>;
      default:
        const questionItem = question.filter((item) => {
          return findQuestion(item);
        })[0];
        console.log(questionItem);
        return (
          <div>
            <h2>{questionItem.question}</h2>
            <button onClick={() => onAnswer(1)}>{questionItem.option1}</button>
            <button onClick={() => onAnswer(2)}>{questionItem.option2}</button>
          </div>
        );
    }
  }

  const [page, setPage] = useState(0);
  const question = useSelector((state) => state.toonBTI.question);
  return (
    <div>
      <h1>설문 페이지</h1>
      페이지 : {page}
      {startToonBTI()}
    </div>
  );
}

export default ToonBTIPage;
