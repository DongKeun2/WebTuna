import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Hammenu from "../../assets/HamMenu.png";

// 로그아웃 구현해야 함
function Avatar() {

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
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "ham-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <ImgBox>
          <HamImg src={Hammenu} alt="ham_img" />
        </ImgBox>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="ham-menu"
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
          <Link to={`/login`}>
            <MenuItem>로그인</MenuItem>
          </Link>
        </ItemBox>
        <ItemBox>
          <Link to={`/signup`}>
            <MenuItem>회원가입</MenuItem>
          </Link>
        </ItemBox>
      </Menu>
    </React.Fragment>
  );
}

const ImgBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
`;

const HamImg = styled.img`
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
