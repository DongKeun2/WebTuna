import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";

function AccountMenu() {
  const isAuthenticated = useSelector((state) => state.login.loginState);
  return (
    <div>
      {isAuthenticated ? (
        <Avatar />
      ) : (
        <AccountBox>
          <Link to="/login" style={{ textDecoration: "none" }}>
            로그인
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            회원가입
          </Link>
        </AccountBox>
      )}
    </div>
  );
}

const AccountBox = styled.div`
  height: 37.8px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-top: 22.2px;
  display: flex;
  font-weight: bold;
  text-decoration: none;
  a {
    color: #129bda;
  }
  gap: 20px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export default AccountMenu;
