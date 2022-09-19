import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const fetchToonBTI = createAsyncThunk(
  "fetchToonBTI",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.post(api.fetchToonBTI(), data, {});
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
    info: {},
  },
  reducers: {},
  extraReducers: {
    [fetchToonBTI.fulfilled]: (state, action) => {
      console.log("데이터 받기 성공");
      console.log(action.payload);
      state.info = action.payload;
    },
  },
});

export { fetchToonBTI };
// Action creators are generated for each case reducer function
// export const { } = uploadSlice.actions;

export default toonBTISlice.reducer;
