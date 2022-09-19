import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const fetchToonBTI = createAsyncThunk(
  "fetchToonBTI",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchToonBTI(), {});
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const submitToonBTI = createAsyncThunk(
  "submitToonBTI",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.post(api.fetchToonBTI(), data, {});
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const toonBTISlice = createSlice({
  name: "toonBTI",
  initialState: {
    question: {},
    answer: [],
    result: {},
  },
  reducers: {
    addAnswer: (state, action) => {
      state.answer = action.payload;
    },
  },
  extraReducers: {
    [fetchToonBTI.fulfilled]: (state, action) => {
      console.log("데이터 받기 성공");
      console.log(action.payload);
      state.question = action.payload.question;
    },
    [submitToonBTI.fulfilled]: (state, action) => {
      console.log("제출 성공");
      state.result = action.payload;
    },
  },
});

export { fetchToonBTI, submitToonBTI };
// Action creators are generated for each case reducer function
export const { addAnswer } = toonBTISlice.actions;

export default toonBTISlice.reducer;
