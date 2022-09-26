import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  changeEmail,
  changePassword,
  login,
  fetchInfo,
} from "../../features/accounts/loginSlice";
import { changePossibleSearch } from "../../features/toons/searchSlice";
import MySwal from "../../components/common/SweetAlert";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changePossibleSearch(false));
    return () => {
      dispatch(changePossibleSearch(true));
    };
  }, [dispatch]);

  const loginInfo = useSelector((state) => state.login.loginInfo);

  function loginSubmit(e) {
    e.preventDefault();
    console.log(loginInfo);
    dispatch(login(loginInfo)).then((res) => {
      if (res.error) {
        MySwal.fire({
          title: "Error!",
          text: "다시 확인해주세요.",
          icon: "error",
          confirmButtonText: "Cool",
        });
      } else {
        dispatch(fetchInfo()).then(() => {
          MySwal.fire({
            title: "로그인 성공!",
            icon: "success",
            confirmButtonColor: "#feec91",
            confirmButtonText: "확인",
          });
          navigate("/");
        });
      }
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
    <PageBox>
      <LoginBox>
        <PageTitle>로그인 페이지</PageTitle>
        <FormGroup onSubmit={loginSubmit}>
          <FormItem>
            <FormTitle>이메일</FormTitle>
            <LoginInput
              type="email"
              value={loginInfo.email}
              autoComplete="on"
              placeholder="이메일을 입력해주세요."
              onChange={onEmailHandler}
            />
          </FormItem>
          <FormItem>
            <FormTitle>비밀번호</FormTitle>
            <LoginInput
              type="password"
              value={loginInfo.password}
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요."
              onChange={onPasswordHandler}
            />
          </FormItem>
          <BtnBox>
            <SubmitBtn>제출</SubmitBtn>
          </BtnBox>
        </FormGroup>
      </LoginBox>
    </PageBox>
  );
}

const PageBox = styled.div`
  display: flex;
  gap: 50px;
  height: 790px;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    gap: 20px;
  }
`;

const PageTitle = styled.p`
  font-size: 40px;
  margin-bottom: 50px;
  padding: 80px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
  height: 100%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const FormGroup = styled.form`
  display: flex;
  gap: 50px;
  flex-direction: column;
  width: 50%;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const FormItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: start;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
    align-items: center;
  }
`;

const FormTitle = styled.p`
  width: 18%;
  @media screen and (max-width: 600px) {
    width: 30%;
  }
`;

const LoginInput = styled.input`
  width: 60%;
  height: 30px;
  margin-right: 30px;
  border: 2px solid #d1e2ff;
  border-radius: 10px;
  text-align: center;
  @media screen and (max-width: 600px) {
    width: 40%;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitBtn = styled.button`
  font-size: 20px;
  font-weight: bold;
  background-color: #feec91;
  padding: 10px 20px;
  border-radius: 15px;
  border: 3px solid white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: "50px";
  height: "30px";
  :hover {
    cursor: pointer;
  }
`;

export default LoginPage;
