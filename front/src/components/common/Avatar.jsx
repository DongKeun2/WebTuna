import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/accounts/loginSlice";
import profileImgItem from "../../assets/profile/profileImgItem";
import MySwal from "../../components/common/SweetAlert";

// 로그아웃 구현해야 함
function Avatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfileImgNum = useSelector(
    (state) => state.login.currentUser
  ).profile_image_id;

  const myImg = profileImgItem[myProfileImgNum];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Tooltip title={`눌러볼래?`}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ImgBox>
            {myImg && <ProfileImg src={myImg.img} alt="profile_img" />}
          </ImgBox>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ItemBox>
          <Link to={`/profile`}>
            <MenuItem>프로필</MenuItem>
          </Link>
        </ItemBox>
        <ItemBox>
          <Link to={`/edit`}>
            <MenuItem>정보 수정</MenuItem>
          </Link>
        </ItemBox>
        <ItemBox>
          <MenuItem
            onClick={() => {
              MySwal.fire({
                title: "로그아웃 하쉴?",
                text: "정말로?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#feec91",
                confirmButtonText: "로그아웃",
                cancelButtonColor: "#d33",
                cancelButtonText: "취소",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  MySwal.fire({
                    title: "로그아웃!",
                    icon: "success",
                    confirmButtonColor: "#feec91",
                    confirmButtonText: "확인",
                  });
                  dispatch(logout()).then(() => {
                    navigate("/");
                  });
                }
              });
            }}
          >
            로그아웃
          </MenuItem>
        </ItemBox>
      </Menu>
    </React.Fragment>
  );
}

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

const ItemBox = styled.div`
  width: 100%;
  a {
    text-decoration: none !important;
    color: #129bda;
  }
  color: #129bda;
`;

export default Avatar;
