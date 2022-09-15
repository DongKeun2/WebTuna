import { Link } from "react-router-dom";
import styled from 'styled-components';

function NavBar() {

  const Nav = styled.div`
position: fixed;
bottom: 0;
width: 100%; //1920px
left: 0;
background-color: #FEEC91;
height: 65px;
border-top: solid 2px black;
border-right: solid 2px black;
border-left: solid 2px black;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
`;

  const Items = styled.div`
width: 100%;
text-align: center;
`;

  const LeftItem = styled.div`
float:left;
padding-top: 5px;
padding-left: 200px;
padding-right: 100px;
`;

  const RightItem = styled.div`
float:right;
padding-top: 5px;
padding-left: 100px;
padding-right: 200px;
`;

  const Toontoon = styled.div`
  position: absolute;
  left:46%;
  bottom: 15px;
  box-shadow: 5px 5px;
  border-radius: 50px;
  overflow: hidden;
  `

  return (
    <Nav>
      <Items>
        <LeftItem>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div><img src={'./images/Home.png'} alt="홈" /></div>
            <div>홈</div>
          </Link>
        </LeftItem>
        <LeftItem>
          <Link to="/webtoonList" style={{ textDecoration: "none" }}>
            <div><img src={'./images/All.png'} alt="전체 웹툰" /></div>
            <div>전체 목록</div>
          </Link>
        </LeftItem>
        <Toontoon>
          <Link to="/toontoon" style={{ textDecoration: "none" }}>
            <img src={'./images/ToonToonRecommend.png'} alt="툰툰추천" />
          </Link>
        </Toontoon>
        <RightItem>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div><img src={'./images/PaintStyleRecommend.png'} alt="그림체로 웹툰 검색" /></div>
            <div>그림체로 웹툰 검색</div>
          </Link>
        </RightItem>
        <RightItem>
          <Link to="/mbti" style={{ textDecoration: "none" }}>
            <div><img src={'./images/ToonBTI.png'} alt="툰비티아이" /></div>
            <div>ToonBTI</div>
          </Link>
        </RightItem>
      </Items>
    </Nav>
  );


}



export default NavBar;
