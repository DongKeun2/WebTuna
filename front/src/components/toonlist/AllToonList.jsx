import ToonItem from "./ToonItem"

function AllToonList() {
  const toons = [
    {
      id: 1,
      title: "제목 1",
      author: "작가 1"
    },
    {
      id: 2,
      title: "제목 2",
      author: "작가 2"
    },
    {
      id: 3,
      title: "제목 3",
      author: "작가 3"
    }, 
  ];
  return (
    toons.map(toon => (
      <ToonItem item={toon} key={toon.id} />
    ))
  );
}

export default AllToonList;
  