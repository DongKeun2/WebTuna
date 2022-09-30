import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const fetchToonBTI = createAsyncThunk(
  "fetchToonBTI",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchToonBTI(), {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const submitToonBTI = createAsyncThunk(
  "submitToonBTI",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.fetchToonBTI(), data, {});
      return res.data;
    } catch (err) {
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
    info: "",
  },
  reducers: {
    addAnswer: (state, action) => {
      state.answer = action.payload;
    },
  },
  extraReducers: {
    [fetchToonBTI.fulfilled]: (state, action) => {
      state.question = action.payload.question;
    },
    [submitToonBTI.fulfilled]: (state, action) => {
      state.result = action.payload.webtoons;
      state.info = action.payload.info;
    },
  },
});

export { fetchToonBTI, submitToonBTI };

export const { addAnswer } = toonBTISlice.actions;

export default toonBTISlice.reducer;
