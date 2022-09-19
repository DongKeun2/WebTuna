function ToonItem({ item }) {
  return (
    <div>
      <h3>{item.title}</h3>
      <h3>{item.author}</h3>
    </div>
  );
}

export default ToonItem;
