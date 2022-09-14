import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.login(), data, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: {
      email: "",
      password: "",
    },
    loginState: false,
  },
  reducers: {
    changeEmail: (state, action) => {
      state.userInfo.email = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.loginState = true;
    },
    [login.rejected]: (state, action) => {
      state.loginState = false;
    },
  },
});

export { login };
// Action creators are generated for each case reducer function
export const { changeEmail } = loginSlice.actions;

export default loginSlice.reducer;
