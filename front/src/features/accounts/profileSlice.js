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
      return rejectWithValue(err.response.data);
    }
  },
);

const profileImage = createAsyncThunk(
  "profileImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(api.profileImage(), data, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {},
  extraReducers: {
    [profile.fulfilled]: (action) => {},
    [profile.rejected]: (action) => {},
    [profileImage.fulfilled]: (action) => {},
    [profileImage.rejected]: (action) => {},
  },
});

export { profile, profileImage };
// Action creators are generated for each case reducer function
// export const {} = profileSlice.actions;

export default profileSlice.reducer;
