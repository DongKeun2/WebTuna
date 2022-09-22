import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const signup = createAsyncThunk("signup", async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const res = await axios.post(api.signup(), data, {});
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

const checkEmail = createAsyncThunk(
  "checkEmail",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.post(api.checkEmail(), data, {});
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const checkNickname = createAsyncThunk(
  "checkNickname",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.post(api.checkNickname(), data, {});
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const singupSlice = createSlice({
  name: "singup",
  initialState: {
    signupInfo: {
      email: "",
      nickname: "",
      password: "",
      pwdVerify: "",
      gender: "M",
      birth: "",
      // 이 후 수정 필요
      liked_thumbnail: "1, 5",
    },
    isPossibleNickname: false,
    isPossibleEmail: false,
  },
  reducers: {
    changeEmail: (state, action) => {
      state.signupInfo.email = action.payload;
    },
    changeNickname: (state, action) => {
      state.signupInfo.nickname = action.payload;
    },
    changePassword: (state, action) => {
      state.signupInfo.password = action.payload;
    },
    changePwdVerify: (state, action) => {
      state.signupInfo.pwdVerify = action.payload;
    },
    changeGender: (state, action) => {
      state.signupInfo.gender = action.payload;
    },
    changeBirth: (state, action) => {
      state.signupInfo.birth = action.payload;
    },
  },
  extraReducers: {
    [checkEmail.fulfilled]: (state, action) => {
      state.isPossibleEmail = action.payload;
    },
    [checkEmail.rejected]: (state) => {
      state.isPossibleEmail = false;
    },
    [checkNickname.fulfilled]: (state, action) => {
      state.isPossibleNickname = action.payload;
    },
    [checkNickname.rejected]: (state) => {
      state.isPossibleNickname = false;
    },
  },
});

export { signup, checkEmail, checkNickname };
export const {
  changeEmail,
  changeNickname,
  changePassword,
  changePwdVerify,
  changeGender,
  changeBirth,
} = singupSlice.actions;

export default singupSlice.reducer;
