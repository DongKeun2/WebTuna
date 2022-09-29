import { useSelector } from "react-redux";
import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import logo from "./../../assets/logo2.png";

function HeaderBar() {
  const isPossible = useSelector((state) => state.search.possibleSearch);

  return (
    <HeaderSt>
      <LogoBox>
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
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default HeaderBar;
