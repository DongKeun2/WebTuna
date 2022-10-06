import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Checkmark from "../../assets/checkmark.png";
import {
  changeSelectImg,
  changeThumbnail,
  cleanupsSelectImg,
  signup,
} from "../../features/accounts/signupSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import addInfoItem from "../../assets/addInfo/addInfoItem";
import MySwal from "../../components/common/SweetAlert";
import { forbidden, hover } from "../../assets/cursor/cursorItem";

function AddInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupInfo = useSelector((state) => state.signup.signupInfo);

  useEffect(() => {
    dispatch(changeCurrentpage(""));
    dispatch(changeThumbnail(""));
    return () => {
      dispatch(cleanupsSelectImg());
    };
  }, [dispatch]);

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

  function submitSignup() {
    if (signupInfo.liked_thumbnail) {
      dispatch(signup(signupInfo)).then((res) => {
        if (res.error) {
          MySwal.fire({
            title: "회원가입 실패!",
            text: "처음부터 다시 진행해주세요.",
            icon: "warning",
            confirmButtonColor: "#feec91",
            confirmButtonText: "확인",
          }).then(() => {
            navigate("/signup");
          });
        } else {
          MySwal.fire({
            title: "환영합니다!",
            text: "로그인 후 서비스를 이용해보세요!",
            icon: "success",
            confirmButtonColor: "#feec91",
            confirmButtonText: "확인",
          });
          navigate("/login");
        }
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
          <CheckImg src={Checkmark} alt="check_img" />
        </CheckCircleBox>
      ) : null}
    </ImgBox>
  );
}

const CheckCircleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  height: 15vw;
  top: 0;
  left: 0;
`;

const CheckImg = styled.img`
  width: 5vw;
  height: 5vw;
`;

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
  margin-top: 3.2vw;
  font-size: 2.4vw;
  @media screen and (max-width: 1100px) {
    font-size: 2.2vw;
  }
  @media screen and (max-width: 750px) {
    font-size: 16px;
    margin-top: 20px;
  }
`;

const AddInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 2vw;
  @media screen and (max-width: 750px) {
    gap: 10px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  width: 15vw;
  height: 15vw;
  border-radius: 0.8vw;
  box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.5);
  background-color: white;
  overflow: hidden;
  :hover {
    cursor: url(${hover}) 13 13, auto;
  }
  border: ${(props) =>
    props.selected ? "4px solid #edff28" : "4px solid white"};
`;

const ToonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  opacity: ${(props) => props.selected && 0.4};
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
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
  margin: 2vw 0;
  :hover {
    cursor: ${(props) =>
      props.deactive
        ? `url(${forbidden}) 13 13, auto`
        : `url(${hover}) 13 13, auto`};
  }
  @media screen and (max-width: 750px) {
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
`;

export default AddInfoPage;
