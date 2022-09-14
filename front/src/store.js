import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/accounts/loginSlice";
import signupReducer from "./features/accounts/signupSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});

export default store;
