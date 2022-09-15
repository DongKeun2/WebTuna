import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

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

const logout = createAsyncThunk("logout", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.login(), {}, {});
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
  },
  reducers: {
    changeEmail: (state, action) => {
      state.loginInfo.email = action.payload;
    },
    changePassword: (state, action) => {
      state.loginInfo.password = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("로그인 성공");
      console.log(action.payload);
      state.loginState = true;
    },
    [login.rejected]: (state, action) => {
      console.log("로그인 실패 ㅠㅠ");
      console.log(action.payload);
      state.loginState = false;
    },
    [logout.fulfilled]: (state) => {
      state.loginState = false;
    },
    [logout.rejected]: (state) => {
      state.loginState = false;
    },
  },
});

export { login, logout };
// Action creators are generated for each case reducer function
export const { changeEmail, changePassword } = loginSlice.actions;

export default loginSlice.reducer;
