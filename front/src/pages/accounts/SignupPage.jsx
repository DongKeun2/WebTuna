import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  checkEmail,
  checkNickname,
  changeEmail,
  changeNickname,
  changePassword,
  changePwdVerify,
  changeGender,
  changeBirth,
} from "../../features/accounts/signupSlice";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupInfo = useSelector((state) => state.signup.signupInfo);

  const [isCheckNickname, setIsCheckNickname] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  const isPossibleNickname = useSelector(
    (state) => state.signup.isPossibleNickname
  );
  const isPossibleEmail = useSelector((state) => state.signup.isPossibleEmail);

  function onNicknameHandler(e) {
    e.preventDefault();
    dispatch(changeNickname(e.target.value));
  }
  function onEmailHandler(e) {
    e.preventDefault();
    dispatch(changeEmail(e.target.value));
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

  function onCheckEmailHandler(e) {
    e.preventDefault();
    const data = {
      email: signupInfo.email,
    };
    dispatch(checkEmail(data)).then(() => {
      setIsCheckEmail(true);
    });
  }

  function onCheckNicknameHandler(e) {
    e.preventDefault();
    const data = {
      nickname: signupInfo.nickname,
    };
    dispatch(checkNickname(data)).then(() => {
      setIsCheckNickname(true);
    });
  }

  function signupSubmit(e) {
    e.preventDefault();
    navigate("/addinfo");
  }
  return (
    <div>
      <h1>회원가입</h1>
      <SignupForm onSubmit={signupSubmit}>
        <div>
          <p>이메일</p>
          <input
            type="email"
            value={signupInfo.email}
            autoComplete="on"
            placeholder="이메일을 입력해주세요."
            onChange={onEmailHandler}
          />
          <CheckBtn onClick={onCheckEmailHandler}>중복확인</CheckBtn>
        </div>
        {isCheckEmail
          ? isPossibleEmail
            ? "사용가능한 이메일이다."
            : "다시입력해라."
          : null}
        <div>
          <p>닉네임</p>
          <input
            type="text"
            value={signupInfo.nickname}
            autoComplete="on"
            placeholder="닉네임을 입력해주세요."
            onChange={onNicknameHandler}
          />
          <CheckBtn onClick={onCheckNicknameHandler}>중복확인</CheckBtn>
        </div>
        {isCheckNickname
          ? isPossibleNickname
            ? "사용가능한 닉네임이다."
            : "다시입력해라."
          : null}
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            value={signupInfo.password}
            autoComplete="off"
            placeholder="비밀번호를 입력해주세요."
            onChange={onPasswordHandler}
          />
        </div>
        <div>
          <p>비밀번호 확인</p>
          <input
            type="password"
            value={signupInfo.pwdVerify}
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
            <input type="text" maxLength="8" onKeyUp={onBirthHandler} />
          </div>
        </div>
        <button>다음</button>
      </SignupForm>
    </div>
  );
}

const SignupForm = styled.form``;

const CheckBtn = styled.button`
  border: none;
  background-color: white;
  :hover {
    font-weight: bold;
  }
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

export default SignupPage;
