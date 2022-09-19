<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/accounts/loginSlice'
import signupReducer from './features/accounts/signupSlice'
import uploadReducer from './features/toons/uploadSlice'
=======
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/accounts/loginSlice";
import signupReducer from "./features/accounts/signupSlice";
import uploadReducer from "./features/toons/uploadSlice";
import toonBTIReducer from "./features/toons/toonBTISlice";
>>>>>>> 7ddf941 (feat: toonbti slice&api 생성 및 store 등록)

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,

    upload: uploadReducer,
    toonBTI: toonBTIReducer,
  },
})

export default store
