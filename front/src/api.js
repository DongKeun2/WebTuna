const BASE_URL = "http://localhost:8000/api";

const ACCOUNTS_URL = "/accounts";

const USER_URL = "/user";

const LOGIN_URL = "/login";
const SIGNUP_URL = "/signup";
const EMAIL_URL = "/email";
const NICKNAME_URL = "/nickname";

const api = {
  login: () => BASE_URL + ACCOUNTS_URL + USER_URL + LOGIN_URL,

  // signupSlice
  signup: () => BASE_URL + ACCOUNTS_URL + USER_URL + SIGNUP_URL,
  checkEmail: () => BASE_URL + ACCOUNTS_URL + USER_URL + EMAIL_URL,
  checkNickname: () => BASE_URL + ACCOUNTS_URL + USER_URL + NICKNAME_URL,
};

export default api;
