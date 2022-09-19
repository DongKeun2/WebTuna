import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const detail = createAsyncThunk("detail", async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const res = await axios.get(api.detail(data), data, {});
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

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
    [detail.fulfilled]: (state, action) => {
      console.log("디테일 성공");
      console.log(action.payload);
    },
    [detail.rejected]: (state, action) => {
      console.log("디테일 실패 ㅠㅠ");
      console.log(action.payload);
    },
  },
});

export { detail };
// Action creators are generated for each case reducer function
export const { changeWebtoonId } = detailSlice.actions;

export default detailSlice.reducer;
