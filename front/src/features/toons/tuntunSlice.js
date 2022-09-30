import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const fetchtuntun = createAsyncThunk(
  "fetchtuntun",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchtuntun(), getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const tuntunSlice = createSlice({
  name: "tuntun",
  initialState: {
    tuntun: undefined,
    focusTun: undefined,
  },
  reducers: {
    changeFocusTun: (state, action) => {
      state.focusTun = action.payload;
    },
  },
  extraReducers: {
    [fetchtuntun.fulfilled]: (state, action) => {
      state.tuntun = action.payload;
    },
  },
});

export { fetchtuntun };

export const { changeFocusTun } = tuntunSlice.actions;

export default tuntunSlice.reducer;
