import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import searchIcon from "../../assets/test/searchIcon.png";
import { searchToons, changeKeyword } from "../../features/toons/searchSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.search.keyword);
  const [pages, setPages] = useState(0);

  const webtoonList = useSelector((state) => state.search.toonList);

  function submitKeyword(e) {
    e.preventDefault();
    const data = {
      pages,
      keyword,
    };
    dispatch(searchToons(data)).then((res) => {
      console.log(res);
      console.log(webtoonList);
    });
  }

  function onKeywordHandler(e) {
    e.preventDefault();
    dispatch(changeKeyword(e.target.value));
  }
  return (
    <SearchBox>
      <SearchForm onSubmit={submitKeyword}>
        <SearchInput
          type="text"
          placeholder="제목/작가로 검색해주세요."
          onChange={onKeywordHandler}
          autoComplete="on"
          value={keyword}
        />
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
