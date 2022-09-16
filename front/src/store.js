import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/accounts/loginSlice'
import signupReducer from './features/accounts/signupSlice'
import uploadReducer from './features/toons/uploadSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,

    upload: uploadReducer,
  },
})

export default store
