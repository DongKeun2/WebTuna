import { useSelector } from "react-redux";
import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import logo from "./../../assets/logo/logo2.png";
import { useNavigate } from "react-router-dom";
import { hover } from "../../assets/cursor/cursorItem";

function HeaderBar() {
  const navigate = useNavigate();

  const isPossible = useSelector((state) => state.search.possibleSearch);

  return (
    <HeaderSt>
      <LogoBox onClick={() => navigate("/")}>
        <LogoImg src={logo} alt="logo_img" />
      </LogoBox>
      {isPossible && <SearchBar></SearchBar>}
      <AccountMenu></AccountMenu>
    </HeaderSt>
  );
}

const HeaderSt = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  width: 10vw;
  min-width: 100px;
  height: auto;
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default HeaderBar;
