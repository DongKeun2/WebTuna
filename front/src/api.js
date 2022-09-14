const BASE_URL = "http://localhost:8000/api";

const ACCOUNTS_URL = "/accounts";

const LOGIN_URL = "/login";

const api = {
  login: () => BASE_URL + ACCOUNTS_URL + LOGIN_URL,
};

export default api;
