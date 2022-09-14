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
          <Link to="/recommend">추천페이지</Link>
        </li>
        <li>
          <Link to="/WebtoonList">웹툰목록페이지</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
