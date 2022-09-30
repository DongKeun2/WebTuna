import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";

const profile = createAsyncThunk(
  "profile",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.profile(), getConfig());
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  },
);

const profileImage = createAsyncThunk(
  "profileImage",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.put(api.profileImage(), data, getConfig());
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {},
  extraReducers: {
    [profile.fulfilled]: (action) => {
      console.log("프로필 가져오기 성공!");
      console.log(action.payload);
    },
    [profile.rejected]: (action) => {
      console.log("프로필 가져오기 실패 ㅠㅠ");
      console.log(action.payload);
    },
    [profileImage.fulfilled]: (action) => {
      console.log("프로필 사진 변경 성공!");
      console.log(action.payload);
    },
    [profileImage.rejected]: (action) => {
      console.log("프로필 사진 변경 실패 ㅠㅠ");
      console.log(action.payload);
    },
  },
});

export { profile, profileImage };
// Action creators are generated for each case reducer function
// export const {} = profileSlice.actions;

export default profileSlice.reducer;
