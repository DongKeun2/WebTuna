import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../features/accounts/loginSlice";

function LoginPage() {
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();

  function emailHandler(e) {
    console.log(userInfo.email);
    dispatch(changeEmail(e.target.value));
  }
  return (
    <div>
      <h1>로그인 페이지</h1>
      <input type="text" value={userInfo.email} onChange={emailHandler} />
    </div>
  );
}

export default LoginPage;
