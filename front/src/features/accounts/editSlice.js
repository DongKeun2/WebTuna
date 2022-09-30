import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const checkPassword = createAsyncThunk(
  "checkPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.checkPassword(), data, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const edit = createAsyncThunk("edit", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.put(api.edit(), data, getConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    editInfo: {},
    possible: false,
    password: "",
  },
  reducers: {
    changeConfirmPassword: (state, action) => {
      state.password = action.payload;
    },
    changePassword: (state, action) => {
      state.editInfo.password = action.payload;
    },
    changePwdVerify: (state, action) => {
      state.editInfo.pwdVerify = action.payload;
    },
    changePossible: (state, action) => {
      state.editInfo = {};
      state.password = "";
      state.possible = action.payload;
    },
  },
  extraReducers: {
    [checkPassword.fulfilled]: (state, action) => {
      state.possible = action.payload;
    },
    [edit.fulfilled]: (state, action) => {},
  },
});

export { checkPassword, edit };

export const {
  changeConfirmPassword,
  changePassword,
  changePwdVerify,
  changePossible,
} = editSlice.actions;

export default editSlice.reducer;
