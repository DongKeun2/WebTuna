import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import api from "../../api"

const fetchToonlist = createAsyncThunk(
  "fetchToonlist",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchToonlist(data.page), {})
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

const addToonlist = createAsyncThunk(
  "addToonlist",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.fetchToonlist(data.page), {});
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const toonlistSlice = createSlice({
  name: "toonlist",
  initialState: {
    toons: [],
    page: 1,

    fetchPossible: true,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeFetchPossible: (state, action) => {
      state.fetchPossible = action.payload;
    },
  },
  extraReducers: {
    [fetchToonlist.fulfilled]: (state, action) => {
      if (action.payload.length < 20) {
        state.fetchPossible = false
      }
      state.toons = action.payload
    },

    [addToonlist.fulfilled]: (state, action) => {
      const currentToons = [...state.toons]
      const toonlist = [...state.toons, ...action.payload]
      if (action.payload.length < 20) {
        state.fetchPossible = false
        state.toons = toonlist
      } else if (
        currentToons[currentToons.length - 20].webtoon_id ===
        action.payload[0].webtoon_id
      ) {
        state.fetchPossible = false
      } else {
        state.toons = toonlist
      }
    },
  },
});

export { fetchToonlist, addToonlist }

export const {
  changePage,
  changeFetchPossible,
} = toonlistSlice.actions

export default toonlistSlice.reducer
