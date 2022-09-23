import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const searchToons = createAsyncThunk(
  "searchToons",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const params = {
      keyword: data.keyword,
    };
    try {
      const res = await axios.get(api.searchToons(data.pages), {
        params,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    word: "",
    toonList: [],

    possibleSearch: true,
    isLoading: false,
  },
  reducers: {
    changeKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    changeWord: (state, action) => {
      state.word = action.payload;
    },
    changePossibleSearch: (state, action) => {
      state.possibleSearch = action.payload;
    },
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [searchToons.fulfilled]: (state, action) => {
      console.log("데이터 받기 성공");
      console.log(action.payload);
      state.toonList = action.payload;
    },
  },
});

export { searchToons };
// Action creators are generated for each case reducer function
export const { changeKeyword, changeWord, changePossibleSearch, changeIsLoading } =
  searchSlice.actions;

export default searchSlice.reducer;
