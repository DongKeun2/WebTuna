import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const checkPassword = createAsyncThunk(
  "checkPassword",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.post(api.checkPassword(), data, getConfig());
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    possible: false,
    password: "",
  },
  reducers: {
    changePassword: (state, action) => {
      console.log(action.payload);
      state.password = action.payload;
    },
  },
  extraReducers: {
    [checkPassword.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.possible = action.payload;
    },
  },
});

export { checkPassword };
// Action creators are generated for each case reducer function
export const { changePassword } = editSlice.actions;

export default editSlice.reducer;
