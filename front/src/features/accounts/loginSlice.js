import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: {
      email: "",
      password: "",
    },
  },
  reducers: {
    changeEmail: (state, action) => {
      state.userInfo.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeEmail } = loginSlice.actions;

export default loginSlice.reducer;
