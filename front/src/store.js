<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/accounts/loginSlice'
import signupReducer from './features/accounts/signupSlice'
import uploadReducer from './features/toons/uploadSlice'
<<<<<<< HEAD
=======
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./features/toons/mainSlice";
import loginReducer from "./features/accounts/loginSlice";
import signupReducer from "./features/accounts/signupSlice";
import editReducer from "./features/accounts/editSlice";
import uploadReducer from "./features/toons/uploadSlice";
import toonBTIReducer from "./features/toons/toonBTISlice";
<<<<<<< HEAD
>>>>>>> 7ddf941 (feat: toonbti slice&api 생성 및 store 등록)
=======
import toonlistReducer from "./features/toons/toonlistSlice"
>>>>>>> 921bee3 (feat: 웹툰 전체 목록 api 연결)
=======
import toonlistReducer from "./features/toons/toonlistSlice";
import filterReducer from "./features/toons/filterSlice";
import searchReducer from "./features/toons/searchSlice";
<<<<<<< HEAD
>>>>>>> 983faba (feat: 검색기능 api 연결)
=======
import tuntunReducer from "./features/toons/tuntunSlice";
<<<<<<< HEAD
>>>>>>> 5badc62 (feat: 추천페이지 api 구현)
=======
import navbarReducer from "./features/toons/navBarSlice";
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))

const store = configureStore({
  reducer: {
    main: mainReducer,

    login: loginReducer,
    signup: signupReducer,
    edit: editReducer,

    upload: uploadReducer,
<<<<<<< HEAD
    toonBTI: toonBTIReducer,
=======

    toonlist: toonlistReducer,
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 921bee3 (feat: 웹툰 전체 목록 api 연결)
=======
=======
    filter: filterReducer,
>>>>>>> 71cc3a0 (feat: 필터 api 생성 및 태그 제외 필터 관련 모든 기능 제출 빼고 구현 완료)
    search: searchReducer,
<<<<<<< HEAD
>>>>>>> 983faba (feat: 검색기능 api 연결)
=======

    tuntun: tuntunReducer,
<<<<<<< HEAD
>>>>>>> 5badc62 (feat: 추천페이지 api 구현)
=======

    navbar: navbarReducer,
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))
  },
})

export default store
