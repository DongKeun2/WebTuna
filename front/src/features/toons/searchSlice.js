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

const addToons = createAsyncThunk(
  "addToons",
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
    pages: 1,
    word: "",
    toonList: [],

    possibleSearch: true,
    possibleFetch: true,
    isLoad: false,
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
    changeIsLoad: (state, action) => {
      state.isLoad = action.payload;
    },
    changePages: (state, action) => {
      state.pages = action.payload;
    },
  },
  extraReducers: {
    [searchToons.fulfilled]: (state, action) => {
      console.log("데이터 받기 성공");
      console.log(action.payload);
      if (action.payload.length < 20) {
        console.log("스크롤 그만");
        state.possibleFetch = false;
      }
      state.toonList = action.payload;
    },
    [addToons.fulfilled]: (state, action) => {
      if (action.payload.length < 20) {
        state.possibleFetch = false;
        console.log("스크롤 그만");
      }
      const toons = [...state.toonList, ...action.payload];
      state.toonList = toons;
    },
  },
});

export { searchToons, addToons };
// Action creators are generated for each case reducer function
export const {
  changeKeyword,
  changeWord,
  changePossibleSearch,
  changeIsLoad,
  changePages,
} = searchSlice.actions;

export default searchSlice.reducer;
