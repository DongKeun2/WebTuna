import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";

function HeaderBar() {
  return (
    <HeaderSt>
      <h1>로고</h1>
      <SearchBar></SearchBar>
      <AccountMenu></AccountMenu>
    </HeaderSt>
  );
}

const HeaderSt = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

export default HeaderBar;
