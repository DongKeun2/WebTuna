import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

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
    toonList: [],
    possibleSearch: true,
  },
  reducers: {
    changeKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: {
    [searchToons.fulfilled]: (state, action) => {
      console.log("데이터 받기 성공");
      console.log(action.payload);
      state.webtoonList = action.payload;
    },
  },
});

export { searchToons };
// Action creators are generated for each case reducer function
export const { changeKeyword } = searchSlice.actions;

export default searchSlice.reducer;
