import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const searchToons = createAsyncThunk(
  "searchToons",
  async (data, { rejectWithValue }) => {
    const params = {
      keyword: data.keyword,
    };
    try {
      const res = await axios.get(api.searchToons(data.pages), {
        params,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const addToons = createAsyncThunk(
  "addToons",
  async (data, { rejectWithValue }) => {
    const params = {
      keyword: data.keyword,
    };
    try {
      const res = await axios.get(api.searchToons(data.pages), {
        params,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const getTags = createAsyncThunk(
  "getTags",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.getTags(), {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
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
    changePossibleFetch: (state, action) => {
      state.possibleFetch = action.payload;
    },
  },
  extraReducers: {
    [searchToons.fulfilled]: (state, action) => {
      if (action.payload.length < 20) {
        state.possibleFetch = false;
      }
      state.toonList = action.payload;
    },
    [addToons.fulfilled]: (state, action) => {
      const currentToons = [...state.toonList];
      const toons = [...state.toonList, ...action.payload];
      if (action.payload.length < 20) {
        state.possibleFetch = false;
        state.toonList = toons;
      } else if (
        currentToons[currentToons.length - 20].webtoon_id ===
        action.payload[0].webtoon_id
      ) {
        state.possibleFetch = false;
      } else {
        state.toonList = toons;
      }
    },
    [getTags.fulfilled]: (action) => {},
    [getTags.rejected]: (action) => {},
  },
});

export { searchToons, addToons, getTags };
// Action creators are generated for each case reducer function
export const {
  changeKeyword,
  changeWord,
  changePossibleSearch,
  changeIsLoad,
  changePages,
  changePossibleFetch,
} = searchSlice.actions;

export default searchSlice.reducer;
