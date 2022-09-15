import styled from "styled-components";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";

function HeaderBar() {
  return (
    <HeaderSt>
      <h1>로고</h1>
      <SearchBar></SearchBar>
      <Avatar></Avatar>
    </HeaderSt>
  );
}

const HeaderSt = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

export default HeaderBar;
