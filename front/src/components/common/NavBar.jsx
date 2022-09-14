import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <h1>네비게이션바</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/webtoonList">웹툰목록페이지</Link>
        </li>
        <li>
          <Link to="/toontoon">툰툰추천페이지</Link>
        </li>
        <li>
          <Link to="/quiz">퀴즈</Link>
        </li>
        <li>
          <Link to="/profile">프로필</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
