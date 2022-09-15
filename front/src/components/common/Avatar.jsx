import * as React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { logout } from "../../features/accounts/loginSlice";
import profileImgItem from "../../assets/profile/profileImgItem";

// 로그아웃 구현해야 함
function Avatar() {
  const dispatch = useDispatch();
  // 내 프로필 사진 아이디 확인해서 넘겨줘야 함
  function isMine(item) {
    if (item.id === 1) {
      return true;
    }
  }
  const myImg = profileImgItem.find(isMine);

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
      <Tooltip title={`눌러보시던가~`}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ImgBox>
            <ProfileImg src={myImg.img} />
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
        <Link to={`/profile`}>
          <MenuItem>프로필</MenuItem>
        </Link>
        <Link to={`/edit`}>
          <MenuItem>정보 수정</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          로그아웃
        </MenuItem>
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

export default Avatar;
