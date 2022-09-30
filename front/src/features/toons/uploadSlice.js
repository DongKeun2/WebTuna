<<<<<<< HEAD
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../api'
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
<<<<<<< HEAD
<<<<<<< HEAD
import getConfig from "../config";
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)
=======
// import getConfig from "../config";
>>>>>>> 6504b7b (feat: 명탐정 툰툰 비로그인 제출 가능)
=======
>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))

const fetchUpload = createAsyncThunk(
  'fetchUpload',
  async (data, { rejectWithValue }) => {
<<<<<<< HEAD
    console.log(data)
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await axios.post(api.fetchUpload(), data, {})
      return res.data
=======
      const res = await axios.post(api.fetchUpload(), data, getConfig());
=======
      // const res = await axios.post(api.fetchUpload(), data, getConfig());
=======
    try {
>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))
      const res = await axios.post(api.fetchUpload(), data, {});
>>>>>>> 6504b7b (feat: 명탐정 툰툰 비로그인 제출 가능)
      return res.data;
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)
    } catch (err) {
<<<<<<< HEAD
      console.log(err)
      return rejectWithValue(err.response.data)
=======
      return rejectWithValue(err.response.data);
>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))
    }
  }
)

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    webtoonInfo: undefined,
  },
  reducers: {
    cleanResultData: (state, action) => {
      state.webtoonInfo = action.payload;
    },
  },
  extraReducers: {
    [fetchUpload.fulfilled]: (state, action) => {
<<<<<<< HEAD
      console.log('데이터 받기 성공')
      console.log(action.payload)
      state.webtoonInfo = action.payload
=======
      state.webtoonInfo = action.payload;
>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))
    },
  },
})

<<<<<<< HEAD
export { fetchUpload }
// Action creators are generated for each case reducer function
=======
export { fetchUpload };

>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))
export const { cleanResultData } = uploadSlice.actions;

export default uploadSlice.reducer
