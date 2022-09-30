import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const signup = createAsyncThunk("signup", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.signup(), data, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const checkEmail = createAsyncThunk(
  "checkEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.checkEmail(), data, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const checkNickname = createAsyncThunk(
  "checkNickname",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.checkNickname(), data, {});
      return res.data;
    } catch (err) {
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
      liked_thumbnail: "",
    },
    isPossibleNickname: false,
    isPossibleEmail: false,

    selectImg: [],
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
    changeSelectImg: (state, action) => {
      state.selectImg = action.payload;
    },
    changeThumbnail: (state, action) => {
      state.signupInfo.liked_thumbnail = action.payload;
    },
    changeIsPossibleEmail: (state, action) => {
      state.isPossibleEmail = action.payload;
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
    [signup.fulfilled]: (state) => {
      state.signupInfo = {};
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
  changeSelectImg,
  changeThumbnail,
  changeIsPossibleEmail,
} = singupSlice.actions;

export default singupSlice.reducer;
