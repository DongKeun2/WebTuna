import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const filterToons = createAsyncThunk(
  "filterToons",
  async (data, { rejectWithValue }) => {
    const checked = data.checked;
    try {
      const res = await axios.post(api.filterToons(data.page), checked, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const addFilterToons = createAsyncThunk(
  "addFilterToons",
  async (data, { rejectWithValue }) => {
    const checked = data.checked;
    try {
      const res = await axios.post(api.filterToons(data.page), checked, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterInfo: {
      platform: [],
      day: [],
      genre: [],
      tag: [],
    },

    toonList: [],
    page: 1,

    possibleFetch: true,
    isLoad: false,
  },

  reducers: {
    changeFilterInfo: (state, action) => {
      state.filterInfo = action.payload;
    },
    changePlatform: (state, action) => {
      state.filterInfo.platform.includes(action.payload)
        ? (state.filterInfo.platform = state.filterInfo.platform.filter(
            (element) => element !== action.payload
          ))
        : state.filterInfo.platform.push(action.payload);
    },
    changeDay: (state, action) => {
      state.filterInfo.day.includes(action.payload)
        ? (state.filterInfo.day = state.filterInfo.day.filter(
            (element) => element !== action.payload
          ))
        : state.filterInfo.day.push(action.payload);
    },
    changeGenre: (state, action) => {
      state.filterInfo.genre.includes(action.payload)
        ? (state.filterInfo.genre = state.filterInfo.genre.filter(
            (element) => element !== action.payload
          ))
        : state.filterInfo.genre.push(action.payload);
    },
    changeTag: (state, action) => {
      state.filterInfo.tag.includes(action.payload)
        ? (state.filterInfo.tag = state.filterInfo.tag.filter(
            (element) => element !== action.payload
          ))
        : state.filterInfo.tag.push(action.payload);
    },
    changeIsLoad: (state, action) => {
      state.isLoad = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changePossibleFetch: (state, action) => {
      state.possibleFetch = action.payload;
    },
  },

  extraReducers: {
    [filterToons.fulfilled]: (state, action) => {
      if (action.payload.length < 20) {
        state.possibleFetch = false;
      }
      state.toonList = action.payload;
    },
    [addFilterToons.fulfilled]: (state, action) => {
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
  },
});

export { filterToons, addFilterToons };
export const {
  changeFilterInfo,
  changePlatform,
  changeDay,
  changeGenre,
  changeTag,
  changeIsLoad,
  changePage,
  changePossibleFetch,
} = filterSlice.actions;

export default filterSlice.reducer;
