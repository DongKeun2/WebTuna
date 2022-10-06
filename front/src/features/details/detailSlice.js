import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const detail = createAsyncThunk(
  "detail",
  async (toonId, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.detail(toonId), getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const noLoginDetail = createAsyncThunk(
  "noLoginDetail",
  async (toonId, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.detail(toonId), {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const webtoonLike = createAsyncThunk(
  "webtoonLike",
  async (toonId, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.webtoonLike(toonId), {}, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const webtoonLog = createAsyncThunk(
  "webtoonLog",
  async (toonId, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.webtoonLog(toonId), {}, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const webtoonRating = createAsyncThunk(
  "webtoonRating",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        api.webtoonRating(data.toonId),
        { rating: data.rating },
        getConfig(),
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const tagLike = createAsyncThunk(
  "webtoonLike",
  async (tagId, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.tagLike(tagId), {}, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    webtoonId: "",
  },
  reducers: {
    changeWebtoonId: (state, action) => {
      state.webtoonId = action.payload;
    },
  },
  extraReducers: {
    [detail.fulfilled]: (action) => {},
    [detail.rejected]: (action) => {},
    [noLoginDetail.fulfilled]: (action) => {},
    [noLoginDetail.rejected]: (action) => {},
    [webtoonLike.fulfilled]: (action) => {},
    [webtoonLike.rejected]: (action) => {},
    [webtoonLog.fulfilled]: (action) => {},
    [webtoonLog.rejected]: (action) => {},
    [webtoonRating.fulfilled]: (action) => {},
    [webtoonRating.rejected]: (action) => {},
    [tagLike.fulfilled]: (action) => {},
    [tagLike.rejected]: (action) => {},
  },
});

export {
  detail,
  noLoginDetail,
  webtoonLike,
  webtoonLog,
  webtoonRating,
  tagLike,
};
// Action creators are generated for each case reducer function
export const { changeWebtoonId } = detailSlice.actions;

export default detailSlice.reducer;
