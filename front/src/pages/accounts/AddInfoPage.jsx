import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  changeSelectImg,
  changeThumbnail,
  signup,
} from "../../features/accounts/signupSlice";
import addInfoItem from "../../assets/addInfo/addInfoItem";

function AddInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupInfo = useSelector((state) => state.signup.signupInfo);

  function submitSignup() {
    if (signupInfo.liked_thumbnail) {
      dispatch(signup(signupInfo)).then(() => {
        alert("회원가입 성공");
        navigate("/login");
      });
    }
  }
  return (
    <PageBox>
      <AddInfoBox>
        <h1>선호 그림체 선택 페이지 (1개 이상 선택해주세요^^)</h1>
        <ItemBox>
          {addInfoItem.map((item) => {
            return <ImgItems key={item.id} item={item} />;
          })}
        </ItemBox>
        <BtnBox>
          <SubmitBtn
            deactive={!signupInfo.liked_thumbnail}
            onClick={submitSignup}
          >
            제출
          </SubmitBtn>
        </BtnBox>
      </AddInfoBox>
    </PageBox>
  );
}

function ImgItems({ item }) {
  const dispatch = useDispatch();

  const selectImg = useSelector((state) => state.signup.selectImg);

  function clickImg() {
    const newSet = new Set();
    selectImg.forEach((n) => {
      newSet.add(n);
    });

    if (newSet.has(item.id)) {
      newSet.delete(item.id);
    } else {
      newSet.add(item.id);
    }

    const data = Array.from(newSet);

    dispatch(changeThumbnail(data.join(",")));
    dispatch(changeSelectImg(data));
  }
  return (
    <ImgBox onClick={clickImg}>
      <ToonImg src={item.img} alt="select_img" />
    </ImgBox>
  );
}

const PageBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 100px;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    gap: 20px;
  }
  p {
    font-weight: bold;
  }
`;

const AddInfoBox = styled.div`
  width: 90%;
`;

const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImgBox = styled.div`
  width: 300px;
  height: 300px;
  border: 5px solid black;
  border-radius: 10%;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
`;

const ToonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitBtn = styled.button`
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => (props.deactive ? "AFAFAF" : "#feec91")};
  padding: 10px 20px;
  border-radius: 15px;
  border: 3px solid white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: "50px";
  height: "30px";
  :hover {
    cursor: ${(props) => (props.deactive ? null : "pointer")};
  }
`;
export default AddInfoPage;
