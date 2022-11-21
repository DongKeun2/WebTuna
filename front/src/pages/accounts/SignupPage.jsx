import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { forbidden, hover } from "../../assets/cursor/cursorItem";
import MySwal from "../../components/common/SweetAlert";
import {
  checkEmail,
  checkNickname,
  changeEmail,
  changeNickname,
  changePassword,
  changePwdVerify,
  changeGender,
  changeBirth,
  changeIsPossibleEmail,
  fetchSingup,
} from "../../features/accounts/signupSlice";
import { changePossibleSearch } from "../../features/toons/searchSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupInfo = useSelector((state) => state.signup.signupInfo);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      MySwal.fire({
        title: "잘못된 접근입니다!",
        text: "메인페이지로 이동합니다.",
        icon: "info",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
      });
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchSingup());
    dispatch(changeCurrentpage(""));
    dispatch(changePossibleSearch(false));
    return () => {
      dispatch(changePossibleSearch(true));
    };
  }, [dispatch]);

  const [isCheckNickname, setIsCheckNickname] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isRightEmail, setIsRightEmail] = useState(false);
  const [passwordError, setPasswordError] = useState("비밀번호를 입력해주세요");

  function chkPW(pw) {
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/gi);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      setPasswordError("8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    } else if (pw.search(/\s/) !== -1) {
      setPasswordError("비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      setPasswordError("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }
  function chkEmail(str) {
    const reg_email =
      /^([0-9a-zA-Z._-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!reg_email.test(str)) {
      return false;
    } else {
      return true;
    }
  }

  const isPossibleNickname = useSelector(
    (state) => state.signup.isPossibleNickname
  );
  const isPossibleEmail = useSelector((state) => state.signup.isPossibleEmail);

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onCheckNicknameHandler(e);
    }
  };

  function onNicknameHandler(e) {
    e.target.value = e.target.value.replace(" ", "");
    e.preventDefault();
    dispatch(changeNickname(e.target.value));
  }
  function onEmailHandler(e) {
    e.preventDefault();
    dispatch(changeEmail(e.target.value));
  }

  function onPasswordHandler(e) {
    e.preventDefault();
    chkPW(e.target.value);
    dispatch(changePassword(e.target.value));
  }

  function onPwdVerifyHandler(e) {
    e.preventDefault();
    dispatch(changePwdVerify(e.target.value));
  }

  function onGenderHandler(e) {
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
    if (chkEmail(data.email)) {
      dispatch(checkEmail(data)).then(() => {
        setIsCheckEmail(true);
        setIsRightEmail(true);
      });
    } else {
      dispatch(changeIsPossibleEmail(false));
      setIsCheckEmail(true);
      setIsRightEmail(false);
    }
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
    if (
      signupInfo.gender &&
      signupInfo.birth.length >= 8 &&
      isPossibleEmail &&
      isPossibleNickname &&
      !passwordError &&
      signupInfo.password === signupInfo.pwdVerify
    ) {
      navigate("/addinfo");
    }
  }
  return (
    <PageBox>
      <SignupBox>
        <PageTitle>회원가입</PageTitle>
        <FormGroup>
          <FormItem>
            <FormTitle>이메일</FormTitle>
            <SignupInput
              type="email"
              // value={signupInfo.email}
              autoComplete="on"
              placeholder="이메일을 입력해주세요."
              onChange={onEmailHandler}
              error={isCheckEmail && !isPossibleEmail}
              onkeyup={onCheckEmailHandler}
            />
            <CheckBtn onClick={onCheckEmailHandler}>중복확인</CheckBtn>
          </FormItem>
          <FormItem error={isCheckEmail && !isPossibleEmail}>
            <BlankHeader></BlankHeader>
            <ConfirmMsg error={isCheckEmail && !isPossibleEmail}>
              {isCheckEmail
                ? isPossibleEmail
                  ? "사용 가능한 이메일입니다."
                  : isRightEmail
                  ? "이미 사용중인 이메일입니다."
                  : "이메일 형식이 올바르지 않습니다."
                : null}
            </ConfirmMsg>
            <BlankBox>중복확인</BlankBox>
          </FormItem>
          <FormItem>
            <FormTitle>닉네임</FormTitle>
            <SignupInput
              type="text"
              // value={signupInfo.nickname}
              autoComplete="on"
              placeholder="닉네임을 입력해주세요."
              maxLength="10"
              onChange={onNicknameHandler}
              error={isCheckNickname && !isPossibleNickname}
              onKeyPress={handleOnKeyPress}
            />
            <CheckBtn onClick={onCheckNicknameHandler}>중복확인</CheckBtn>
          </FormItem>
          <FormItem error={isCheckNickname && !isPossibleNickname}>
            <BlankHeader></BlankHeader>
            <ConfirmMsg error={isCheckNickname && !isPossibleNickname}>
              {isCheckNickname
                ? isPossibleNickname
                  ? "사용 가능한 닉네임입니다."
                  : "사용 불가능한 닉네임입니다."
                : null}
            </ConfirmMsg>
            <BlankBox>중복확인</BlankBox>
          </FormItem>
          <FormItem>
            <FormTitle>비밀번호</FormTitle>
            <SignupInput
              type="password"
              // value={signupInfo.password}
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요."
              onChange={onPasswordHandler}
              error={signupInfo.password !== signupInfo.pwdVerify}
            />
            <BlankBox>중복확인</BlankBox>
          </FormItem>
          <FormItem error={true}>
            <BlankHeader></BlankHeader>
            <ConfirmMsg error={true}>{passwordError}</ConfirmMsg>
            <BlankBox>중복확인</BlankBox>
          </FormItem>
          <FormItem>
            <FormTitle>비밀번호 확인</FormTitle>
            <SignupInput
              type="password"
              // value={signupInfo.pwdVerify}
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요."
              onChange={onPwdVerifyHandler}
            />
            <BlankBox>중복확인</BlankBox>
          </FormItem>
          <FormItem error={true}>
            <BlankHeader></BlankHeader>
            <ConfirmMsg error={true}>
              {signupInfo.password !== signupInfo.pwdVerify &&
                "비밀번호가 일치하지 않습니다."}
            </ConfirmMsg>
            <BlankBox>중복확인</BlankBox>
          </FormItem>
          <SelectBox>
            <GenderBox onChange={onGenderHandler}>
              <GenderTitle>성별</GenderTitle>
              <GenderInput id="female" type="radio" value="F" name="gender" />
              <FemaleLabel active={signupInfo.gender === "F"} htmlFor="female">
                여
              </FemaleLabel>
              <GenderInput id="male" type="radio" value="M" name="gender" />
              <MaleLabel active={signupInfo.gender === "M"} htmlFor="male">
                남
              </MaleLabel>
            </GenderBox>
            <BirthBox>
              <BirthTitle>생년월일</BirthTitle>
              <BirthInput
                type="text"
                maxLength="8"
                onKeyUp={onBirthHandler}
                placeholder="ex) 20220921"
              />
            </BirthBox>
          </SelectBox>
          <BtnBox>
            <SubmitBtn
              active={
                signupInfo.gender &&
                signupInfo.birth.length >= 8 &&
                isPossibleEmail &&
                isPossibleNickname &&
                !passwordError &&
                signupInfo.password === signupInfo.pwdVerify
              }
              onClick={signupSubmit}
            >
              다음
            </SubmitBtn>
          </BtnBox>
        </FormGroup>
      </SignupBox>
    </PageBox>
  );
}

const PageBox = styled.div`
  display: flex;
  height: 85vh;
  justify-content: center;
  @media screen and (max-width: 750px) {
    gap: 20px;
  }
  p {
    font-weight: bold;
  }
`;

const PageTitle = styled.p`
  font-size: 2vw;
  @media screen and (max-width: 750px) {
    font-size: 20px;
  }
  padding: 20px;
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
  height: 100%;
  @media screen and (max-width: 750px) {
    width: 95%;
  }
`;

const FormGroup = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vw;
  width: 60%;
  @media screen and (max-width: 1100px) {
    width: 70%;
  }
  @media screen and (max-width: 750px) {
    width: 90%;
  }
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const FormTitle = styled.div`
  font-size: 1.5vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
  width: 20%;
`;

const BlankHeader = styled.div`
font-size: 1.5vw;
@media screen and (max-width: 750px) {
  font-size: 11px;
}
width: 20%;
`;

const GenderBox = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GenderTitle = styled.p`
  width: 30%;
  font-size: 1.4vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
`;

const BirthBox = styled.div`
  width: 63%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const BirthTitle = styled.p`
  width: 20%;
  font-size: 1.4vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
`;

const CheckBtn = styled.button`
  font-size: 12px;
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
  padding: 5px 8px;
  border: 1px solid #d1e2ff;
  border-radius: 5px;
  font-weight: bold;
  background-color: #d1e2ff;
  :hover {
    background-color: #99c0ff;
  }
`;

const BlankBox = styled.div`
  font-size: 12px;
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
  padding: 0 8px;
  border: none;
  color: white;
  background-color: white;
`;

const SignupInput = styled.input`
  width: 60%;
  padding: 0.8vw;
  @media screen and (max-width: 750px) {
    padding: 10px;
  }
  border: ${(props) =>
    props.error ? "2px solid #EEA6A6" : "2px solid #D1E2FF"};
  border-radius: 10px;
  text-align: center;
`;

const BirthInput = styled.input`
  width: 60%;
  padding: 0.8vw;
  @media screen and (max-width: 750px) {
    padding: 10px;
  }
  border: ${(props) =>
    props.error ? "2px solid #EEA6A6" : "2px solid #D1E2FF"};
  border-radius: 10px;
  text-align: center;
`;

const ConfirmMsg = styled.p`
  margin: 0.2vw;
  font-size: 1vw;
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
  color: ${(props) => (props.error ? "#EEA6A6" : " #48618d")};
`;

const SelectBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const GenderInput = styled.input`
  display: none;
`;

const MaleLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 40px;
  height: 24px;
  border: 1px solid #d1e2ff;
  border-radius: 5px;
  background-color: ${(props) => props.active && " #d1e2ff"};
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
  @media screen and (max-width: 750px) {
    font-size: 10px;
    width: 30%;
    margin-right: 10px;
  }
`;

const FemaleLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 40px;
  height: 24px;
  border: 1px solid #d1e2ff;
  border-radius: 5px;
  background-color: ${(props) => props.active && " #d1e2ff"};
  @media screen and (max-width: 750px) {
    font-size: 10px;
    width: 30%;
    margin-right: 10px;
  }
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
`;

const BtnBox = styled.div`
  width: 96%;
  margin: 0 auto 8vw;
  display: flex;
  justify-content: end;
`;

const SubmitBtn = styled.button`
  font-size: 16px;
  @media screen and (max-width: 750px) {
    font-size: 12px;
  }
  font-weight: bold;
  background-color: ${(props) => (props.active ? "#feec91" : "AFAFAF")};
  padding: 10px 20px;
  border-radius: 15px;
  border: 3px solid white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: "50px";
  height: "30px";
  :hover {
    cursor: ${(props) => !props.active && `url(${forbidden}) 13 13, auto`};
  }
`;

export default SignupPage;
