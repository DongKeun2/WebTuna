import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import api from "../../api"

const fetchToonlist = createAsyncThunk(
  "fetchToonlist",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchToonlist(1), {})
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const toonlistSlice = createSlice({
  name: "toonlist",
  initialState: {
    toons: {},
  },
  reducers: {},
  extraReducers: {
    [fetchToonlist.fulfilled]: (state, action) => {
      state.toons = action.payload
    },
  },
});

export { fetchToonlist }

export default toonlistSlice.reducer
