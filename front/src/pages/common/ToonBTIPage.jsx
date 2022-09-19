import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToonBTI } from "../../features/toons/toonBTISlice";

function ToonBTIPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToonBTI());
  }, [dispatch]);

  function checkInfo() {
    console.log(info);
  }

  const [page, setPage] = useState();
  const info = useSelector((state) => state.toonBTI.info);
  return (
    <div>
      <h1>설문 페이지</h1>
      <button onClick={checkInfo}>설문확인</button>
    </div>
  );
}

export default ToonBTIPage;
