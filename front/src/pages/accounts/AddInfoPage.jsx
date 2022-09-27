import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  changeSelectImg,
  changeThumbnail,
  signup,
} from "../../features/accounts/signupSlice";
import addInfoItem from "../../assets/addInfo/addInfoItem";
import MySwal from "../../components/common/SweetAlert";

function AddInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupInfo = useSelector((state) => state.signup.signupInfo);

  function submitSignup() {
    if (signupInfo.liked_thumbnail) {
      dispatch(signup(signupInfo)).then(() => {
        MySwal.fire({
          title: "환영합니다!",
          text: "로그인 후 서비스를 이용해보세요!",
          icon: "success",
          confirmButtonColor: "#feec91",
          confirmButtonText: "확인",
        });
        navigate("/login");
      });
    }
  }
  return (
    <PageBox>
      <AddInfoBox>
        <Title>마음에 드는 그림을 1개 이상 선택해주세요!</Title>
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
    const newSet = new Set([...selectImg]);

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
    <ImgBox onClick={clickImg} selected={selectImg.find((i) => i === item.id)}>
      <ToonImg
        selected={selectImg.find((i) => i === item.id)}
        src={item.img}
        alt="select_img"
      />
      {selectImg.find((i) => i === item.id) ? (
        <CheckCircleBox>
          <CheckCircleOutlineIcon
            color="success"
            sx={checkCircleSt}
          ></CheckCircleOutlineIcon>
        </CheckCircleBox>
      ) : (
        <div>
          <h1>잘가</h1>
        </div>
      )}
    </ImgBox>
  );
}

const CheckCircleBox = styled.div`
  position: relative;
`;

const checkCircleSt = {
  position: "absolute",
  top: -205,
  left: 100,
  fontSize: 100,
  color: "#edff28",
};

const PageBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 100px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    gap: 20px;
  }
  p {
    font-weight: bold;
  }
`;

const Title = styled.p`
  font-size: 3vw;
`;

const AddInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  border-radius: 10%;
  overflow: hidden;
  :hover {
    cursor: pointer;
    opacity: 0.4;
  }
  border: ${(props) =>
    props.selected ? "5px solid #ffc628" : "5px solid black"};
`;

const ToonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  opacity: ${(props) => props.selected && 0.4};
`;

const BtnBox = styled.div`
  display: flex;
  align-self: end;
`;

const SubmitBtn = styled.button`
  width: 100%;
  justify-self: end;
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
