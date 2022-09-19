import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../features/accounts/signupSlice";

function AddInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupInfo = useSelector((state) => state.signup.signupInfo);

  function submitSignup() {
    dispatch(signup(signupInfo)).then(() => {
      navigate("/login");
    });
  }
  return (
    <div>
      <h1>선호 그림체 선택 페이지</h1>
      <p>제출버튼 누르면 지금은 임의로 1,5로 제출한다.</p>
      <button onClick={submitSignup}>제출</button>
    </div>
  );
}

export default AddInfoPage;
