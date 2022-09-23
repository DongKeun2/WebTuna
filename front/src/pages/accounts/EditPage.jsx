import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  checkPassword,
  changeConfirmPassword,
  changePassword,
  changePwdVerify,
  changeGender,
  changeBirth,
  edit,
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

  function editSubmit(e) {
    e.preventDefault();
    console.log("제출^^");
    dispatch(edit(editInfo));
  }
  return (
    <PageBox>
      <EditBox>
        {possible ? (
          <FormBox>
            <PageTitle>개인정보 수정 페이지</PageTitle>
            <EditForm onSubmit={editSubmit}>
              <FormItem>
                <p>비밀번호</p>
                <EditInput
                  type="password"
                  value={editInfo.password}
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onPasswordHandler}
                  error={editInfo.password !== editInfo.pwdVerify}
                />
              </FormItem>
              {editInfo.password !== editInfo.pwdVerify &&
                "비밀번호 확인이 일치하지 않는다."}
              <FormItem>
                <p>비밀번호 확인</p>
                <EditInput
                  type="password"
                  value={editInfo.pwdVerify}
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onPwdVerifyHandler}
                />
              </FormItem>
              <FormItem>
                <SelectBox onChange={onGenderHandler}>
                  <p>성별</p>
                  <GenderInput
                    id="female"
                    type="radio"
                    value="F"
                    name="gender"
                  />
                  <FemaleLabel
                    active={editInfo.gender === "F"}
                    htmlFor="female"
                  >
                    여
                  </FemaleLabel>
                  <GenderInput id="male" type="radio" value="M" name="gender" />
                  <MaleLabel active={editInfo.gender === "M"} htmlFor="male">
                    남
                  </MaleLabel>
                </SelectBox>
                <BirthBox>
                  <FormTitle>생년월일</FormTitle>
                  <EditInput
                    type="text"
                    maxLength="8"
                    onKeyUp={onBirthHandler}
                    placeholder="ex) 20220921"
                  />
                </BirthBox>
              </FormItem>
              <BtnBox>
                <SubmitBtn>변경하기</SubmitBtn>
              </BtnBox>
            </EditForm>
          </FormBox>
        ) : (
          <FormBox>
            <PageTitle>비밀번호 확인하세요</PageTitle>
            <EditForm onSubmit={onSubmit}>
              <EditInput
                onChange={onConfirmPasswordHandler}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                type="password"
                value={password}
              />
              <BtnBox>
                <SubmitBtn>다음</SubmitBtn>
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

const FormTitle = styled.p`
  width: 18%;
  @media screen and (max-width: 600px) {
    width: 30%;
  }
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const BirthBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
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

const GenderInput = styled.input`
  display: none;
`;

const MaleLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 40px;
  height: 30px;
  border: 1px solid #d1e2ff;
  border-radius: 5px;
  background-color: ${(props) => props.active && " #d1e2ff"};
`;
const FemaleLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 20%;
  margin-right: 30px;
  width: 40px;
  height: 30px;
  border: 1px solid #d1e2ff;
  border-radius: 5px;
  background-color: ${(props) => props.active && " #d1e2ff"};
  @media screen and (max-width: 600px) {
    margin-left: 50%;
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

export default EditPage;
