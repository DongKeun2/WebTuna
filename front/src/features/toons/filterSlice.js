import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const filterToons = createAsyncThunk(
    "filterToons",
    async (data, { rejectWithValue }) => {
      try {
        // 데이터 넣는 거 searchSlice 참고
        const res = await axios.post(api.filterToons(data.page))
        return res.data
      } catch (err) {
        return rejectWithValue(err.response.data)
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
  },

  reducers: {
    changePlatform: (state, action) => {
      state.filterInfo.platform.includes(action.payload) ? (
        state.filterInfo.platform = state.filterInfo.platform.filter((element) => element !== action.payload)
      ) : (
        state.filterInfo.platform.push(action.payload)
      )
    },
    changeDay: (state, action) => {
      state.filterInfo.day.includes(action.payload) ? (
        state.filterInfo.day = state.filterInfo.day.filter((element) => element !== action.payload)
      ) : (
        state.filterInfo.day.push(action.payload)
      )
    },
    changeGenre: (state, action) => {
      state.filterInfo.genre.includes(action.payload) ? (
        state.filterInfo.genre = state.filterInfo.genre.filter((element) => element !== action.payload)
      ) : (
        state.filterInfo.genre.push(action.payload)
      )
    },
    changeTag: (state, action) => {
      state.filterInfo.tag.includes(action.payload) ? (
        state.filterInfo.tag = state.filterInfo.tag.filter((element) => element !== action.payload)
      ) : (
        state.filterInfo.tag.push(action.payload)
      )
    },
  },

  extraReducers: {
    [filterToons.fulfilled]: (state) => {
    state.filterInfo = {};
    },
  },
});

export { filterToons };
export const {
  changePlatform,
  changeDay,
  changeGenre,
  changeTag,
} = filterSlice.actions;

export default filterSlice.reducer;
  