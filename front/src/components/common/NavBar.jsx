<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Home from '../../assets/navbar/Home.png'
import All from '../../assets/navbar/All.png'
import PaintStyleRecommend from '../../assets/navbar/PaintStyleRecommend.png'
import ToonBTI from '../../assets/navbar/ToonBTI.png'
import ToonToonRecommend from '../../assets/navbar/ToonToonRecommend.png'
=======
import { Link, useNavigate } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 33411a0 (feat: 목록페이지, 검색페이지 박스 감싸기)
=======
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCurrentpage
} from "../../features/toons/navBarSlice";
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))
=======
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCurrentpage
} from "../../features/toons/navBarSlice";
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import Home from "../../assets/navbar/Home.png";
import All from "../../assets/navbar/All.png";
import PaintStyleRecommend from "../../assets/navbar/PaintStyleRecommend.png";
import ToonBTI from "../../assets/navbar/ToonBTI.png";
import ToonToonRecommend from "../../assets/navbar/ToonToonRecommend.png";
<<<<<<< HEAD
>>>>>>> 3be130a (fix: NavBar 반응형 수정)
=======
import { hover } from "../../assets/cursor/cursorItem";
>>>>>>> 68bf4c3 (feat: 프로필&상세페이지 제외 모든 페이지 커서 수정)

const Nav = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%; 
  background-color: #feec91;
  height: auto;
  border-top: solid 2px black;
  border-right: solid 2px black;
  border-left: solid 2px black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
<<<<<<< HEAD
`
=======
  z-index: 2;
`;
>>>>>>> 18ca83d (feat: 디테일 페이지 좌우 버튼 추가 (캐러셀))

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
  justify-content: space-evenly;
  @media screen and (max-width: 750px) {
    width: 38%;
    justify-content: space-around;
  }
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2px 5px;
  margin: 3px 0;
  border-radius: 30px;
  font-weight: 500;
<<<<<<< HEAD
=======
  @media screen and (min-width: 750px) {
    width: 150px;
  }
  @media screen and (max-width: 750px) {
    border-radius: 10px;
  }
  height: 100%;
  cursor: url(${hover}) 13 13, auto; 
`;

const ActiveItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2px 5px;
  margin: 3px 0;
  border-radius: 30px;
  font-weight: 600;
  background-color: #fddc35;
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
  @media screen and (min-width: 750px) {
    width: 150px;
  }
  @media screen and (max-width: 750px) {
    border-radius: 10px;
  }
  height: 100%;
  cursor: url(${hover}) 13 13, auto; 
`;

const ActiveItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2px 5px;
  margin: 3px 0;
  border-radius: 30px;
  font-weight: 600;
  background-color: #fddc35;
  @media screen and (min-width: 750px) {
    width: 150px;
  }
  @media screen and (max-width: 750px) {
    border-radius: 10px;
  }
  height: 100%;
  cursor: url(${hover}) 13 13, auto; 
`;
>>>>>>> eece598 (feat: NavBar 반응형 UI)

const Toontoon = styled.div`
  position: absolute;
  left: 50%;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  margin-left: -37.5px;
  bottom: 8px;
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))
=======
  margin-left: -37.5px;
  bottom: 8px;
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
  box-shadow: 4px 4px;
  border-radius: 100%;
  background-color: white;
>>>>>>> eece598 (feat: NavBar 반응형 UI)
  overflow: hidden;
<<<<<<< HEAD
<<<<<<< HEAD
`
=======
  cursor: pointer;
=======
  cursor: url(${hover}) 13 13, auto;
>>>>>>> 68bf4c3 (feat: 프로필&상세페이지 제외 모든 페이지 커서 수정)
`;
>>>>>>> 3be130a (fix: NavBar 반응형 수정)

const ToonImg = styled.img`
  width: 75px;
  height: 75px;
`;

const IconImg = styled.img`
  width: 40px;
  height: 40px;
`;

const IconText = styled.p`
  width: 100px;
  margin: 0;
  text-align: center;
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentpage = useSelector((state) => state.navbar.currentpage) || "";

  function moveMain() {
    navigate(`/`);
    dispatch(changeCurrentpage("main"))
    window.scrollTo(0, 0);
  }

  function moveList() {
    navigate(`/webtoonList`);
    dispatch(changeCurrentpage("toons"))
    window.scrollTo(0, 0);
  }

  function moveToontoon() {
    sessionStorage.setItem("url", `/toontoon`);
    navigate(`/toontoon`);
    dispatch(changeCurrentpage(""))
    window.scrollTo(0, 0);
  }

  function moveUpload() {
    navigate(`/upload`);
    dispatch(changeCurrentpage("upload"))
    window.scrollTo(0, 0);
  }

  function moveToonbti() {
    navigate(`/toonbti`);
    dispatch(changeCurrentpage("toonbti"))
    window.scrollTo(0, 0);
  }

  return (
    <Nav>
      <Items>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        <LeftGroup>
          <Item onClick={moveMain}>
            <IconImg src={Home} alt="홈" />
            <IconText>홈</IconText>
>>>>>>> 3be130a (fix: NavBar 반응형 수정)
          </Item>
          <Item onClick={moveList}>
            <IconImg src={All} alt="전체 웹툰" />
            <IconText>전체 목록</IconText>
          </Item>
        </LeftGroup>
        <Toontoon onClick={moveToontoon}>
          <ToonImg src={ToonToonRecommend} alt="툰툰추천" />
        </Toontoon>
        <RightGroup>
          <Item onClick={moveUpload}>
            <IconImg src={PaintStyleRecommend} alt="명탐정 툰툰" />
            <IconText>명탐정 툰툰</IconText>
          </Item>
          <Item onClick={moveToonbti}>
            <IconImg src={ToonBTI} alt="툰비티아이" />
            <IconText>ToonBTI</IconText>
          </Item>
<<<<<<< HEAD
        </ItemGroup>
>>>>>>> eece598 (feat: NavBar 반응형 UI)
=======
        </RightGroup>
>>>>>>> 3be130a (fix: NavBar 반응형 수정)
=======
=======
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
        <ItemGroup>
          {currentpage === "main" ? (
            <ActiveItem onClick={moveMain}>
              <IconImg src={Home} alt="홈" />
              <IconText>홈</IconText>
            </ActiveItem>
          ) : (
            <Item onClick={moveMain}>
              <IconImg src={Home} alt="홈" />
              <IconText>홈</IconText>
            </Item>
          )}
          {currentpage === "toons" ? (
            <ActiveItem onClick={moveList}>
              <IconImg src={All} alt="전체 웹툰" />
              <IconText>전체 목록</IconText>
            </ActiveItem>
          ) : (
            <Item onClick={moveList}>
              <IconImg src={All} alt="전체 웹툰" />
              <IconText>전체 목록</IconText>
            </Item>
          )}
        </ItemGroup>
        <Tooltip title={`툰툰이의 추천 받기`} placement="right-start" arrow>
          <Toontoon onClick={moveToontoon}>
            <ToonImg src={ToonToonRecommend} alt="툰툰추천" />
          </Toontoon>
        </Tooltip>
        <ItemGroup>
          {currentpage === "upload" ? (
            <ActiveItem onClick={moveUpload}>
              <IconImg src={PaintStyleRecommend} alt="명탐정 툰툰" />
              <IconText>명탐정 툰툰</IconText>
            </ActiveItem>
          ) : (
            <Item onClick={moveUpload}>
              <IconImg src={PaintStyleRecommend} alt="명탐정 툰툰" />
              <IconText>명탐정 툰툰</IconText>
            </Item>
          )}
          {currentpage === "toonbti" ? (
            <ActiveItem onClick={moveToonbti}>
              <IconImg src={ToonBTI} alt="툰비티아이" />
              <IconText>ToonBTI</IconText>
            </ActiveItem>
          ) : (
            <Item onClick={moveToonbti}>
              <IconImg src={ToonBTI} alt="툰비티아이" />
              <IconText>ToonBTI</IconText>
            </Item>
          )}
        </ItemGroup>
<<<<<<< HEAD
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))
=======
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
      </Items>
    </Nav>
  )
}

export default NavBar
