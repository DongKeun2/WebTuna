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

const edit = createAsyncThunk("edit", async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const res = await axios.put(api.edit(), data, getConfig());
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    editInfo: {
      password: "",
      gender: "M",
      birth: "",
      pwdVerify: "",
    },
    possible: false,
    password: "",
  },
  reducers: {
    changeConfirmPassword: (state, action) => {
      console.log(action.payload);
      state.password = action.payload;
    },
    changePassword: (state, action) => {
      state.editInfo.password = action.payload;
    },
    changePwdVerify: (state, action) => {
      state.editInfo.pwdVerify = action.payload;
    },
    changeGender: (state, action) => {
      state.editInfo.gender = action.payload;
    },
    changeBirth: (state, action) => {
      state.editInfo.birth = action.payload;
    },
  },
  extraReducers: {
    [checkPassword.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.possible = action.payload;
    },
    [edit.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export { checkPassword, edit };
// Action creators are generated for each case reducer function
export const {
  changeConfirmPassword,
  changePassword,
  changePwdVerify,
  changeGender,
  changeBirth,
} = editSlice.actions;

export default editSlice.reducer;
