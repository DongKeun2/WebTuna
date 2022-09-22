import { useSelector } from "react-redux";

export default function SearchPage() {
  const toonList = useSelector((state) => state.search.toonList);

  function checkFetch() {
    console.log(toonList);
  }
  return (
    <div>
      <h1>검색 페이지 ^^</h1>
      <button onClick={checkFetch}>웹툰 들어왔니?</button>
      {toonList.length ? (
        <div>검색된 웹툰 목록~</div>
      ) : (
        <div>검색 결과 없어용</div>
      )}
    </div>
  );
}
