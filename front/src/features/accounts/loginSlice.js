import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const res = await axios.post(api.login(), data, {});
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

const fetchInfo = createAsyncThunk(
  "fetchInfo",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchInfo(), getConfig());
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  },
);

const logout = createAsyncThunk("logout", async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.logout(), {}, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginInfo: {
      email: "",
      password: "",
    },
    loginState: false,
    currentUser: {},
  },
  reducers: {
    changeEmail: (state, action) => {
      state.loginInfo.email = action.payload;
    },
    changePassword: (state, action) => {
      state.loginInfo.password = action.payload;
    },
    changeLoginState: (state) => {
      state.loginState = true;
    },
    changeCurrentUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("로그인 성공");
      console.log(action.payload);
      sessionStorage.setItem("token", action.payload.access_token);

      state.loginState = true;
    },
    [login.rejected]: (state, action) => {
      console.log("로그인 실패 ㅠㅠ");
      console.log(action.payload);
      state.loginState = false;
    },
    [fetchInfo.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    [fetchInfo.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [logout.fulfilled]: (state) => {
      console.log("로그아웃 성공 ^^");
      sessionStorage.clear();
      state.loginState = false;
      state.currentUser = {};
    },
    [logout.rejected]: (state) => {
      state.loginState = false;
    },
  },
});

export { login, logout, fetchInfo };
// Action creators are generated for each case reducer function
export const {
  changeEmail,
  changePassword,
  changeLoginState,
  changeCurrentUser,
} = loginSlice.actions;

export default loginSlice.reducer;
