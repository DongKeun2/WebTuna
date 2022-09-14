import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../features/accounts/loginSlice";
import { login } from "../../features/accounts/loginSlice";

function LoginPage() {
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();

  function loginSubmit(e) {
    e.preventDefault();
    console.log(userInfo);
    dispatch(login(userInfo));
  }

  function emailHandler(e) {
    console.log(userInfo.email);
    dispatch(changeEmail(e.target.value));
  }
  return (
    <div>
      <h1>로그인 페이지</h1>
      <input type="text" value={userInfo.email} onChange={emailHandler} />
      <button onClick={loginSubmit}>제출</button>
    </div>
  );
}

export default LoginPage;
