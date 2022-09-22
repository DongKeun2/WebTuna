import styled from "styled-components";
import searchIcon from "../../assets/test/searchIcon.png";

function SearchBar() {
  function submitKeyword(e) {
    e.preventDefault();
    console.log("검색중");
  }
  return (
    <SearchBox>
      <SearchForm onSubmit={submitKeyword}>
        <SearchInput type="text" placeholder="제목/작가로 검색해주세요." />
        <SearchIconBox>
          <img src={searchIcon} alt="searchIcon" />
        </SearchIconBox>
      </SearchForm>
    </SearchBox>
  );
}

const SearchInput = styled.input`
  width: 100%;
  height: 25px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 15px;
`;

const SearchBox = styled.div`
  width: 40%;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIconBox = styled.button`
  background-color: white;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

export default SearchBar;
