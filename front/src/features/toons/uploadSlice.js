import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../api'

const fetchUpload = createAsyncThunk(
  'fetchUpload',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const res = await axios.post(api.fetchUpload(), data, {})
      return res.data
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
  reducers: {},
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
// export const { } = uploadSlice.actions;

export default uploadSlice.reducer
