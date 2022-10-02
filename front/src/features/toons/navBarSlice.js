import { createSlice } from "@reduxjs/toolkit";

export const navBarSlice = createSlice({
  name: "navbar",
  initialState: {
    currentpage: "",
  },
  reducers: {
    changeCurrentpage: (state, action) => {
        state.currentpage = action.payload;
      },
  },
});

export const { changeCurrentpage } = navBarSlice.actions;

export default navBarSlice.reducer;
