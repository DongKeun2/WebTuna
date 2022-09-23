<<<<<<< HEAD
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../api'
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
import getConfig from "../config";
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)

const fetchUpload = createAsyncThunk(
  'fetchUpload',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
<<<<<<< HEAD
      const res = await axios.post(api.fetchUpload(), data, {})
      return res.data
=======
      const res = await axios.post(api.fetchUpload(), data, getConfig());
      return res.data;
>>>>>>> c764e92 (feat: 그림체분석 결과페이지 ui / api 연결)
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data)
    }
  }
)

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    webtoonInfo: {},
  },
  reducers: {
    cleanResultData: (state, action) => {
      state.webtoonInfo = action.payload;
    },
  },
  extraReducers: {
    [fetchUpload.fulfilled]: (state, action) => {
      console.log('데이터 받기 성공')
      console.log(action.payload)
      state.webtoonInfo = action.payload
    },
  },
})

export { fetchUpload }
// Action creators are generated for each case reducer function
export const { cleanResultData } = uploadSlice.actions;

export default uploadSlice.reducer
