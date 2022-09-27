import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const fetchMain = createAsyncThunk(
  "fetchMain",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.main(), {});
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    toons: {},
    currentState: 0,
  },
  reducers: {
    changeState: (state, action) => {
      state.currentState = action.payload;
    },
  },
  extraReducers: {
    [fetchMain.fulfilled]: (state, action) => {
      state.toons = action.payload;
    },
  },
});

export { fetchMain };
// Action creators are generated for each case reducer function
export const { changeState } = mainSlice.actions;

export default mainSlice.reducer;
