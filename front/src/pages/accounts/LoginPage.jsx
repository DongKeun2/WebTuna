import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  changeEmail,
  changePassword,
  login,
  fetchInfo,
} from "../../features/accounts/loginSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import { changePossibleSearch } from "../../features/toons/searchSlice";
import MySwal from "../../components/common/SweetAlert";
import { hover } from "../../assets/cursor/cursorItem";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

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
    dispatch(changeCurrentpage(""));
    dispatch(changePossibleSearch(false));
    return () => {
      dispatch(changePossibleSearch(true));
    };
  }, [dispatch]);

  const loginInfo = useSelector((state) => state.login.loginInfo);

  function loginSubmit(e) {
    e.preventDefault();
    dispatch(login(loginInfo)).then((res) => {
      if (res.error) {
        MySwal.fire({
          title: "로그인 실패!",
          text: "아이디와 비밀번호를 다시 확인해주세요.",
          icon: "error",
          confirmButtonColor: "#feec91",
          confirmButtonText: "확인",
        });
      } else {
        if (state) {
          navigate(state);
        } else {
          navigate("/");
        }
        dispatch(fetchInfo()).then(() => {
          MySwal.fire({
            title: "로그인 성공!",
            icon: "success",
            confirmButtonColor: "#feec91",
            confirmButtonText: "확인",
          });
        });
      }
    });
  }

  function onEmailHandler(e) {
    dispatch(changeEmail(e.target.value));
  }

  function onPasswordHandler(e) {
    e.preventDefault();
    dispatch(changePassword(e.target.value));
  }

  return (
    <PageBox>
      <LoginBox>
        <PageTitle>로그인</PageTitle>
        <FormGroup>
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
            <SubmitBtn onClick={loginSubmit}>제출</SubmitBtn>
          </BtnBox>
        </FormGroup>
      </LoginBox>
    </PageBox>
  );
}

const PageBox = styled.div`
  display: flex;
  gap: 50px;
  height: 85vh;
  justify-content: center;
  @media screen and (max-width: 750px) {
    gap: 20px;
  }
`;

const PageTitle = styled.p`
  font-size: 3vw;
  @media screen and (max-width: 750px) {
    font-size: 24px;
  }
  padding: 20px;
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
  @media screen and (max-width: 750px) {
    width: 95%;
  }
`;

const FormGroup = styled.form`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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

const FormTitle = styled.p`
  font-size: 2vw;
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
  width: 15%;
`;

const LoginInput = styled.input`
  width: 60%;
  padding: 0.8vw;
  @media screen and (max-width: 750px) {
    padding: 10px;
  }
  border: 2px solid #d1e2ff;
  border-radius: 10px;
  text-align: center;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  font-size: 16px;
  @media screen and (max-width: 750px) {
    font-size: 12px;
  }
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
    cursor: url(${hover}) 13 13, auto;
  }
`;

export default LoginPage;
