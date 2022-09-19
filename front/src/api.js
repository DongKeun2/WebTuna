const BASE_URL = 'http://j7a403.q.ssafy.io:8443/api'

const ACCOUNTS_URL = '/accounts'
const WEBTOONS_URL = '/webtoons'

const USER_URL = '/user'

const LOGIN_URL = '/login'
const SIGNUP_URL = '/signup'
const EMAIL_URL = '/email'
const NICKNAME_URL = '/nickname'

const SEARCH_IMG_URL = '/search/image'

const TOONBTI_URL = "/games/question";

const api = {
  login: () => BASE_URL + ACCOUNTS_URL + USER_URL + LOGIN_URL,

  // signupSlice
  signup: () => BASE_URL + ACCOUNTS_URL + USER_URL + SIGNUP_URL,
  checkEmail: () => BASE_URL + ACCOUNTS_URL + USER_URL + EMAIL_URL,
  checkNickname: () => BASE_URL + ACCOUNTS_URL + USER_URL + NICKNAME_URL,

  //uploadSlice
  fetchUpload: () => BASE_URL + WEBTOONS_URL + SEARCH_IMG_URL,
<<<<<<< HEAD
}
=======
  fetchToonBTI: () => BASE_URL + TOONBTI_URL,
};
>>>>>>> 7ddf941 (feat: toonbti slice&api 생성 및 store 등록)

export default api
