import ToonItem from "./ToonItem"

function AllToonList({toons}) {
  return (
    toons.map(toon => (
      <div key={toon.webtoon_id}>
        <ToonItem item={toon} />
      </div>
    ))
  );
}

export default AllToonList;
  