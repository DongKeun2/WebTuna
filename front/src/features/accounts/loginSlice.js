import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.login(), data, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchInfo = createAsyncThunk(
  "fetchInfo",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchInfo(), getConfig());
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
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
    luckyWebtoon: [],
    luckyMsg: "",
    isPossibleModal: undefined,
    luckyModal: undefined,
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
      state.currentUser = action.payload;
    },
    changeIsPossibleModal: (state, action) => {
      state.isPossibleModal = action.payload;
    },
    changeLuckyModal: (state, action) => {
      state.luckyModal = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.loginInfo = {
        email: "",
        password: "",
      };
      sessionStorage.setItem("token", action.payload.access_token);

      state.isPossibleModal = true;
      state.loginState = true;
    },
    [login.rejected]: (state, action) => {
      sessionStorage.clear();
      state.loginState = false;
    },
    [fetchInfo.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.luckyWebtoon = action.payload.lucky_webtoon;
      state.luckyMsg = action.payload.lucky;
      if (action.payload.lucky) {
        state.luckyModal = true;
      } else {
        state.luckyModal = false;
        state.isPossibleModal = false;
      }
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    [fetchInfo.rejected]: (state, action) => {},
    [logout.fulfilled]: (state) => {
      sessionStorage.clear();
      state.loginState = false;
      state.currentUser = {};
    },
    [logout.rejected]: (state) => {
      sessionStorage.clear();
      state.loginState = false;
    },
  },
});

export { login, logout, fetchInfo };

export const {
  changeEmail,
  changePassword,
  changeLoginState,
  changeCurrentUser,
  changeIsPossibleModal,
  changeLuckyModal,
} = loginSlice.actions;

export default loginSlice.reducer;
