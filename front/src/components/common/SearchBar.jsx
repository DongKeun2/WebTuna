import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../../assets/toon/searchIcon.png";
import {
  searchToons,
  changeKeyword,
  changeWord,
  changeIsLoad,
  changePages,
  changePossibleFetch,
} from "../../features/toons/searchSlice";
import { hover } from "../../assets/cursor/cursorItem";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keyword = useSelector((state) => state.search.keyword);

  function submitKeyword(e) {
    e.preventDefault();
    dispatch(changePages(1));
    dispatch(changeWord(keyword));
    const data = {
      pages: 1,
      keyword,
    };
    dispatch(changeIsLoad(true));
    dispatch(changePossibleFetch(true));
    dispatch(searchToons(data)).then((res) => {
      dispatch(changeIsLoad(false));
      navigate(`/search/${keyword}`);
      window.scrollTo(0, 0);
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
  background-color: #d1e2ff;
  border: 0;
  outline: 0;
  cursor: url(${hover}) 13 13, auto;
`;

export default SearchBar;
