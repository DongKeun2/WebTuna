import ToonItem from "./ToonItem";

function AllToonList({ toons, main }) {
  return toons.map((toon) => (
    <div key={toon.webtoon_id}>
      <ToonItem main={main} item={toon} />
    </div>
  ));
}

export default AllToonList;
