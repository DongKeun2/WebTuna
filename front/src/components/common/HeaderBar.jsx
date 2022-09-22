import { useSelector } from "react-redux";
import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";

function HeaderBar() {
  const isPossible = useSelector((state) => state.search.possibleSearch);

  return (
    <HeaderSt>
      <h1>로고</h1>
      {isPossible && <SearchBar></SearchBar>}
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
