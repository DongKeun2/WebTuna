import ToonItem from "./ToonItem"

function AllToonList({toons}) {
  
  function checkInfo() {
    console.log(toons);
  }

  return (
    // <button onClick={checkInfo}>웹툰확인</button>
    toons.map(toon => (
      <div>
        <ToonItem item={toon} key={toon.id} />
        <button onClick={checkInfo}>웹툰확인</button>
      </div>
    ))
  );
}

export default AllToonList;
  