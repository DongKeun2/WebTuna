import { useParams } from "react-router-dom";

function DetailPage() {
  const { toonId } = useParams();
  return (
    <div>
      <h1>{toonId}번 웹툰 상세 페이지</h1>
    </div>
  );
}

export default DetailPage;
