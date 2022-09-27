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
    state.filterInfo.platform = action.payload;
    },
    changeDay: (state, action) => {
    state.filterInfo.day = action.payload;
    },
    changeGenre: (state, action) => {
    state.filterInfo.genre = action.payload;
    },
    changeTag: (state, action) => {
    state.filterInfo.tag = action.payload;
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
  