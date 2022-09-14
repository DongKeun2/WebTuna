import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/accounts/loginSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
