import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  signup,
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

  function onGenderHandeler(e) {
    e.preventDefault();
    dispatch(changeGender(e.target.value));
  }
  function onBirthHandler(e) {
    e.preventDefault();
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
    dispatch(signup(signupInfo)).then(() => {
      navigate("/addinfo");
    });
  }
  return (
    <div>
      <SignupForm onSubmit={signupSubmit}>
        <h1>회원가입</h1>
        <p>이메일</p>
        <input
          type="email"
          value={signupInfo.email}
          autoComplete="on"
          placeholder="이메일을 입력해주세요."
          onChange={onEmailHandler}
        />
        {isCheckEmail
          ? isPossibleEmail
            ? "사용가능한 이메일이다."
            : "다시입력해라."
          : null}
        <button onClick={onCheckEmailHandler}>중복확인</button>
        <p>닉네임</p>
        <input
          type="text"
          value={signupInfo.nickname}
          autoComplete="on"
          placeholder="닉네임을 입력해주세요."
          onChange={onNicknameHandler}
        />
        {isCheckNickname
          ? isPossibleNickname
            ? "사용가능한 닉네임이다."
            : "다시입력해라."
          : null}
        <button onClick={onCheckNicknameHandler}>중복확인</button>
        <p>비밀번호</p>
        <input
          type="password"
          value={signupInfo.password}
          autoComplete="off"
          placeholder="비밀번호를 입력해주세요."
          onChange={onPasswordHandler}
        />
        <p>비밀번호확인</p>
        <input
          type="password"
          value={signupInfo.pwdVerify}
          autoComplete="off"
          placeholder="비밀번호를 입력해주세요."
          onChange={onPwdVerifyHandler}
        />
        <button>다음</button>
      </SignupForm>
    </div>
  );
}

const SignupForm = styled.form``;

export default SignupPage;
