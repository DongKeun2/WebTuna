<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/accounts/loginSlice'
import signupReducer from './features/accounts/signupSlice'
import uploadReducer from './features/toons/uploadSlice'
<<<<<<< HEAD
=======
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/accounts/loginSlice";
import signupReducer from "./features/accounts/signupSlice";
import editReducer from "./features/accounts/editSlice";
import uploadReducer from "./features/toons/uploadSlice";
import toonBTIReducer from "./features/toons/toonBTISlice";
>>>>>>> 7ddf941 (feat: toonbti slice&api 생성 및 store 등록)
=======
import toonlistReducer from "./features/toons/toonlistSlice"
>>>>>>> 921bee3 (feat: 웹툰 전체 목록 api 연결)

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    edit: editReducer,

    upload: uploadReducer,
<<<<<<< HEAD
    toonBTI: toonBTIReducer,
=======

    toonlist: toonlistReducer,
>>>>>>> 921bee3 (feat: 웹툰 전체 목록 api 연결)
  },
})

export default store
