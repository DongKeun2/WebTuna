import { useSelector } from "react-redux";
import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import AudioBar from "./AudioBar";
import HamMenu from "./HamMenu";
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
      <RightBox>
        <AudioBar></AudioBar>
        <AccountMenuBox>
          <AccountMenu></AccountMenu>
        </AccountMenuBox>
        <HamBox>
          <HamMenu></HamMenu>
        </HamBox>
      </RightBox>
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
  width: 140px;
  @media screen and (max-width: 750px) {
    width: 100px;
  }
  height: auto;
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
`;

const RightBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const AccountMenuBox = styled.div`
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const HamBox = styled.div`
  @media screen and (min-width: 750px) {
    display: none;
  }
`;
export default HeaderBar;
