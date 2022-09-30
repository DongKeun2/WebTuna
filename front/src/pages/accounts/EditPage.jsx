import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  checkPassword,
  changeConfirmPassword,
  changePassword,
  changePwdVerify,
  changePossible,
  edit,
} from "../../features/accounts/editSlice";
import MySwal from "../../components/common/SweetAlert";

function EditPage() {
  const dispatch = useDispatch();

  const editInfo = useSelector((state) => state.edit.editInfo);
  const possible = useSelector((state) => state.edit.possible);
  const password = useSelector((state) => state.edit.password);
  const [passwordError, setPasswordError] = useState("비밀번호를 입력해주세요");

  useEffect(() => {
    dispatch(changePossible(false));
  }, [dispatch]);

  function onSubmit(e) {
    e.preventDefault();
    const data = {
      password,
    };
    dispatch(checkPassword(data)).then((res) => {
      if (res.payload === false) {
        MySwal.fire({
          title: "틀림요!",
          icon: "error",
          confirmButtonColor: "#feec91",
          confirmButtonText: "확인",
        });
      }
    });
  }

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

  function onPasswordHandler(e) {
    e.preventDefault();
    chkPW(e.target.value);
    dispatch(changePassword(e.target.value));
  }

  function onPwdVerifyHandler(e) {
    e.preventDefault();
    dispatch(changePwdVerify(e.target.value));
  }

  function onConfirmPasswordHandler(e) {
    e.preventDefault();
    dispatch(changeConfirmPassword(e.target.value));
  }

  function editSubmit(e) {
    e.preventDefault();
    if (!passwordError && editInfo.password === editInfo.pwdVerify) {
      const data = {
        password: editInfo.password,
      };
      dispatch(edit(data)).then(() => {
        MySwal.fire({
          title: "수정 완료!",
          icon: "success",
          confirmButtonColor: "#feec91",
          confirmButtonText: "확인",
        });
        dispatch(changePossible(false));
      });
    }
  }
  return (
    <PageBox>
      <EditBox>
        {possible ? (
          <FormBox>
            <PageTitle>비밀번호 변경</PageTitle>
            <EditForm onSubmit={editSubmit}>
              <FormItem>
                <p>새 비밀번호</p>
                <EditInput
                  type="password"
                  value={editInfo.password}
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onPasswordHandler}
                  error={editInfo.password !== editInfo.pwdVerify}
                />
              </FormItem>
              <ConfirmMsg error={true}>{passwordError}</ConfirmMsg>
              <FormItem>
                <p>새 비밀번호 확인</p>
                <EditInput
                  type="password"
                  value={editInfo.pwdVerify}
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onPwdVerifyHandler}
                />
              </FormItem>
              <ConfirmMsg error={true}>
                {editInfo.password !== editInfo.pwdVerify &&
                  "비밀번호가 일치하지 않습니다."}
              </ConfirmMsg>
              <BtnBox>
                <SubmitBtn
                  active={
                    !passwordError && editInfo.password === editInfo.pwdVerify
                  }
                >
                  변경하기
                </SubmitBtn>
              </BtnBox>
            </EditForm>
          </FormBox>
        ) : (
          <FormBox>
            <PageTitle>기존 비밀번호를 입력하세요</PageTitle>
            <EditForm onSubmit={onSubmit}>
              <EditInput
                onChange={onConfirmPasswordHandler}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                type="password"
                value={password}
              />
              <BtnBox>
                <SubmitBtn active={true}>다음</SubmitBtn>
              </BtnBox>
            </EditForm>
          </FormBox>
        )}
      </EditBox>
    </PageBox>
  );
}

const PageBox = styled.div`
  display: flex;
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

const EditBox = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
  height: 100%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const EditForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  width: 100%;
`;

const FormItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
    align-items: center;
  }
`;

const EditInput = styled.input`
  border: ${(props) => (props.error ? "1px solid red" : "1px solid black")};
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

const ConfirmMsg = styled.p`
  text-align: center;
  color: ${(props) => (props.error ? "#EEA6A6" : " #D1E2FF")};
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitBtn = styled.button`
  font-size: 20px;
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
    cursor: ${(props) => props.active && "pointer"};
  }
`;

export default EditPage;
