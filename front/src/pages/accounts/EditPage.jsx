import { useDispatch, useSelector } from "react-redux";
import {
  checkPassword,
  changePassword,
} from "../../features/accounts/editSlice";

function EditPage() {
  const dispatch = useDispatch();

  const possible = useSelector((state) => state.edit.possible);
  const password = useSelector((state) => state.edit.password);

  function onSubmit(e) {
    e.preventDefault();
    console.log(password);
    const data = {
      password,
    };
    dispatch(checkPassword(data)).then((res) => {
      if (res.payload === false) {
        alert("틀림요");
      }
    });
  }

  function onPasswordHandler(e) {
    e.preventDefault();
    console.log(password);
    console.log(e.target.value);
    dispatch(changePassword(e.target.value));
  }
  return (
    <div>
      {possible ? (
        <div>
          <h1>개인정보 수정 페이지</h1>
        </div>
      ) : (
        <div>
          <h1>비밀번호 확인하세요</h1>
          <form onSubmit={onSubmit}>
            <input
              onChange={onPasswordHandler}
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              value={password}
            />
            <button>제출</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditPage;
