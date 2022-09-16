const BASE_URL = 'http://localhost:8000/api'

const ACCOUNTS_URL = '/accounts'
const WEBTOONS_URL = '/webtoons'

const USER_URL = '/user'

const LOGIN_URL = '/login'
const SIGNUP_URL = '/signup'
const EMAIL_URL = '/email'
const NICKNAME_URL = '/nickname'

const SEARCH_IMG_URL = '/search/image'

const api = {
  login: () => BASE_URL + ACCOUNTS_URL + USER_URL + LOGIN_URL,

  // signupSlice
  signup: () => BASE_URL + ACCOUNTS_URL + USER_URL + SIGNUP_URL,
  checkEmail: () => BASE_URL + ACCOUNTS_URL + USER_URL + EMAIL_URL,
  checkNickname: () => BASE_URL + ACCOUNTS_URL + USER_URL + NICKNAME_URL,

  //uploadSlice
  fetchUpload: () => BASE_URL + WEBTOONS_URL + SEARCH_IMG_URL,
}

export default api
