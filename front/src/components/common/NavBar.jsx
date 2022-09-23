import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Home from '../../assets/navbar/Home.png'
import All from '../../assets/navbar/All.png'
import PaintStyleRecommend from '../../assets/navbar/PaintStyleRecommend.png'
import ToonBTI from '../../assets/navbar/ToonBTI.png'
import ToonToonRecommend from '../../assets/navbar/ToonToonRecommend.png'

const Nav = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%; //1920px
  background-color: #feec91;
  height: 4vw;
  min-height: 60px;
  padding-top: 0.5vh;
  border-top: solid 2px black;
  border-right: solid 2px black;
  border-left: solid 2px black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const Items = styled.div`
  width: 100%;
  text-align: center;
<<<<<<< HEAD
`

const LeftItem = styled.div`
  float: left;
  padding-top: 5px;
  padding-left: 200px;
  padding-right: 50px;
`

const RightItem = styled.div`
  float: right;
  padding-top: 5px;
  padding-left: 50px;
  padding-right: 155px;
`
=======
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemGroup = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Item = styled.div`
  @media screen and (min-width: 720px) {
    width: 150px;
  }
  height: 100%;
`;
>>>>>>> eece598 (feat: NavBar 반응형 UI)

const Toontoon = styled.div`
  position: absolute;
  left: 50%;
<<<<<<< HEAD
  margin-left: -50px;
<<<<<<< HEAD
=======
  bottom: 15px;
>>>>>>> 596aad8 (detail 페이지 수정)
  box-shadow: 5px 5px;
  border-radius: 50px;
=======
  margin-left: -45px;
  bottom: 1.3vh;
  box-shadow: 4px 4px;
  border-radius: 100%;
  background-color: white;
>>>>>>> eece598 (feat: NavBar 반응형 UI)
  overflow: hidden;
`

const ToonImg = styled.img`
  width: 90px;
  height: 90px;
`;

const IconImg = styled.img`
  @media screen and (max-width: 720px) {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

const IconText = styled.p`
  margin: 0;
  text-align: center;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;

function NavBar() {
  return (
    <Nav>
      <Items>
<<<<<<< HEAD
        <LeftItem>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div>
              <img src={Home} alt="홈" />
            </div>
            <div>홈</div>
          </Link>
        </LeftItem>
        <LeftItem>
          <Link to="/webtoonList" style={{ textDecoration: 'none' }}>
            <div>
              <img src={All} alt="전체 웹툰" />
            </div>
            <div>전체 목록</div>
          </Link>
        </LeftItem>
        <Toontoon>
          <Link to="/toontoon" style={{ textDecoration: 'none' }}>
            <img src={ToonToonRecommend} alt="툰툰추천" />
          </Link>
        </Toontoon>
        <RightItem>
          <Link to="/upload" style={{ textDecoration: 'none' }}>
            <div>
              <img src={PaintStyleRecommend} alt="그림체로 웹툰 검색" />
            </div>
            <div>그림체로 웹툰 검색</div>
          </Link>
        </RightItem>
        <RightItem>
          <Link to="/toonbti" style={{ textDecoration: 'none' }}>
            <div>
              <img src={ToonBTI} alt="툰비티아이" />
            </div>
            <div>ToonBTI</div>
          </Link>
        </RightItem>
=======
        <ItemGroup>
          <Item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconImg src={Home} alt="홈" />
              <IconText>홈</IconText>
            </Link>
          </Item>
          <Item>
            <Link to="/webtoonList" style={{ textDecoration: "none" }}>
              <IconImg src={All} alt="전체 웹툰" />
              <IconText>전체 목록</IconText>
            </Link>
          </Item>
        </ItemGroup>
        <Toontoon>
          <Link to="/toontoon" style={{ textDecoration: "none" }}>
            <ToonImg src={ToonToonRecommend} alt="툰툰추천" />
          </Link>
        </Toontoon>
        <ItemGroup>
          <Item>
            <Link to="/upload" style={{ textDecoration: "none" }}>
              <IconImg src={PaintStyleRecommend} alt="그림체로 웹툰 검색" />
              <IconText>그림체로 웹툰 검색</IconText>
            </Link>
          </Item>
          <Item>
            <Link to="/toonbti" style={{ textDecoration: "none" }}>
              <IconImg src={ToonBTI} alt="툰비티아이" />
              <IconText>ToonBTI</IconText>
            </Link>
          </Item>
        </ItemGroup>
>>>>>>> eece598 (feat: NavBar 반응형 UI)
      </Items>
    </Nav>
  )
}

export default NavBar
