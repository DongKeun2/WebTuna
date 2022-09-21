import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  changeEmail,
  changePassword,
  login,
  fetchInfo,
} from "../../features/accounts/loginSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginInfo = useSelector((state) => state.login.loginInfo);

  function loginSubmit(e) {
    e.preventDefault();
    console.log(loginInfo);
    dispatch(login(loginInfo))
      .then(() => {
        dispatch(fetchInfo());
      })
      .then(() => {
        navigate("/");
      });
  }

  function onEmailHandler(e) {
    console.log(loginInfo.email);
    dispatch(changeEmail(e.target.value));
  }

  function onPasswordHandler(e) {
    e.preventDefault();
    dispatch(changePassword(e.target.value));
  }
  return (
    <div>
      <h1>로그인 페이지</h1>
      <LoginForm onSubmit={loginSubmit}>
        <div>
          <p>이메일</p>
          <input
            type="email"
            value={loginInfo.email}
            autoComplete="on"
            placeholder="이메일을 입력해주세요."
            onChange={onEmailHandler}
          />
        </div>
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            value={loginInfo.password}
            autoComplete="off"
            placeholder="비밀번호를 입력해주세요."
            onChange={onPasswordHandler}
          />
        </div>
        <button>제출</button>
      </LoginForm>
    </div>
  );
}

const LoginForm = styled.form``;

export default LoginPage;
