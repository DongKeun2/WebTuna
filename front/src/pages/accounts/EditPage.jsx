import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  checkPassword,
  changeConfirmPassword,
  changePassword,
  changePwdVerify,
  changeGender,
  changeBirth,
} from "../../features/accounts/editSlice";

function EditPage() {
  const dispatch = useDispatch();

  const editInfo = useSelector((state) => state.edit.editInfo);
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
    dispatch(changePassword(e.target.value));
  }

  function onPwdVerifyHandler(e) {
    e.preventDefault();
    dispatch(changePwdVerify(e.target.value));
  }

  function onGenderHandler(e) {
    console.log(e.target.value);
    dispatch(changeGender(e.target.value));
  }
  function onBirthHandler(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    dispatch(changeBirth(e.target.value));
  }

  function onConfirmPasswordHandler(e) {
    e.preventDefault();
    console.log(password);
    console.log(e.target.value);
    dispatch(changeConfirmPassword(e.target.value));
  }

  function editSubmit() {
    console.log("제출^^");
  }
  return (
    <div>
      {possible ? (
        <div>
          <h1>개인정보 수정 페이지</h1>
          <EditForm onSubmit={editSubmit}>
            <div>
              <p>비밀번호</p>
              <PasswordInput
                type="password"
                value={editInfo.password}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                onChange={onPasswordHandler}
                error={editInfo.password !== editInfo.pwdVerify}
              />
            </div>
            {editInfo.password !== editInfo.pwdVerify &&
              "비밀번호 확인이 일치하지 않는다."}
            <div>
              <p>비밀번호 확인</p>
              <input
                type="password"
                value={editInfo.pwdVerify}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                onChange={onPwdVerifyHandler}
              />
            </div>
            <div>
              <div onChange={onGenderHandler}>
                <p>성별</p>
                <GenderInput id="female" type="radio" value="F" name="gender" />
                <FemaleLabel htmlFor="female">여</FemaleLabel>
                <GenderInput id="male" type="radio" value="M" name="gender" />
                <MaleLabel htmlFor="male">남</MaleLabel>
              </div>
              <div>
                <p>생년월일</p>
                <input
                  type="text"
                  maxLength="8"
                  onKeyUp={onBirthHandler}
                  placeholder="ex) 20220921"
                />
              </div>
            </div>
            <button>다음</button>
          </EditForm>
        </div>
      ) : (
        <div>
          <h1>비밀번호 확인하세요</h1>
          <form onSubmit={onSubmit}>
            <input
              onChange={onConfirmPasswordHandler}
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

const EditForm = styled.form``;

const PasswordInput = styled.input`
  border: ${(props) => (props.error ? "1px solid red" : "1px solid black")};
`;

const GenderInput = styled.input`
  display: none;
`;

const MaleLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
`;
const FemaleLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
`;

export default EditPage;
