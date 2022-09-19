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

export const toonBTISlice = createSlice({
  name: "toonBTI",
  initialState: {
    question: {},
    answer: [],
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
  },
});

export { fetchToonBTI };
// Action creators are generated for each case reducer function
export const { addAnswer } = toonBTISlice.actions;

export default toonBTISlice.reducer;
