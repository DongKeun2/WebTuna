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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
    [detail.fulfilled]: (action) => {
      console.log("디테일 성공");
      console.log(action.payload);
    },
    [detail.rejected]: (action) => {
      console.log("디테일 실패 ㅠㅠ");
      console.log(action.payload);
    },
    [noLoginDetail.fulfilled]: (action) => {
      console.log("비로그인 디테일 성공");
      console.log(action.payload);
    },
    [noLoginDetail.rejected]: (action) => {
      console.log("비로그인 디테일 실패 ㅠㅠ");
      console.log(action.payload);
    },
    [webtoonLike.fulfilled]: (action) => {
      console.log("좋아요 성공");
      console.log(action.payload);
    },
    [webtoonLike.rejected]: (action) => {
      console.log("좋아요 실패ㅠㅠ");
      console.log(action.payload);
    },
    [webtoonLog.fulfilled]: (action) => {
      console.log("로그 남기기 성공");
      console.log(action.payload);
    },
    [webtoonLog.rejected]: (action) => {
      console.log("로그 남기기 실패ㅠㅠ");
      console.log(action.payload);
    },
    [webtoonRating.fulfilled]: (action) => {
      console.log("평점 주기 성공");
      console.log(action.payload);
    },
    [webtoonRating.rejected]: (action) => {
      console.log("평점 주기 실패ㅠㅠ");
      console.log(action.payload);
    },
    [tagLike.fulfilled]: (action) => {
      console.log("태그 찜 성공");
      console.log(action.payload);
    },
    [tagLike.rejected]: (action) => {
      console.log("태그 찜 실패ㅠㅠ");
      console.log(action.payload);
    },
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
