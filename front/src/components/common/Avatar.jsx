import { Link } from "react-router-dom";
import styled from "styled-components";
import profileImgItem from "../../assets/profile/profileImgItem";

function Avatar() {
  function isMine(item) {
    if (item.id === 1) {
      return true;
    }
  }
  const myImg = profileImgItem.find(isMine);

  // 로그인 비로그인 나눠야 한다!
  return (
    <div>
      <AccountMenu>
        <Link to="/login" style={{ textDecoration: "none" }}>
          로그인
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          회원가입
        </Link>
      </AccountMenu>
      <ImgBox>
        <ProfileImg src={myImg.img} />
      </ImgBox>
    </div>
  );
}

const AccountMenu = styled.div`
  display: flex;
  gap: 20px;
`;

const ImgBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Avatar;
