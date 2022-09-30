import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const fetchMain = createAsyncThunk(
  "fetchMain",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.main(), {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    toons: {},
    currentState: 0,
    isLoading: false,
  },
  reducers: {
    changeState: (state, action) => {
      state.currentState = action.payload;
    },
  },
  extraReducers: {
    [fetchMain.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.toons = action.payload;
    },
  },
});

export { fetchMain };

export const { changeState } = mainSlice.actions;

export default mainSlice.reducer;
