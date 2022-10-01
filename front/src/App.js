import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Loading from "./components/common/Loading";
import HeaderBar from "./components/common/HeaderBar";
import NavBar from "./components/common/NavBar";
import {
  changeLoginState,
  changeCurrentUser,
  changeLuckyModal,
  changeIsPossibleModal,
} from "./features/accounts/loginSlice";
import ModalFrame from "./components/common/ModalFrame";
import ClickSound from "../src/music/571119__elfstonepress__boing-sfx.mp3";

function App() {
  const dispatch = useDispatch();

  const clickSound = new Audio(ClickSound);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(changeLoginState());
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      dispatch(changeCurrentUser(userInfo));
    }
  }, [dispatch]);

  const isLoading = useSelector((state) => state.search.isLoading);
  const isPossibleModal = useSelector((state) => state.login.isPossibleModal);
  const isLockyModal = useSelector((state) => state.login.luckyModal);

  function switchModal() {
    dispatch(changeIsPossibleModal(false));
    dispatch(changeLuckyModal(false));
  }

  function test() {
    clickSound.play();
  }

  return (
    <>
      <div onClick={test}>
        <GlobalStyle />
        <HeaderBar></HeaderBar>
        {isPossibleModal && isLockyModal && (
          <ModalFrame _handleModal={switchModal}>
            <ModalTitle>당신의 운세를 확인해드립니다!</ModalTitle>
          </ModalFrame>
        )}
        {isLoading ? <Loading></Loading> : <Outlet></Outlet>}
        <NavBar></NavBar>
      </div>
    </>
  );
}

const ModalTitle = styled.div`
  margin-top: 3vw;
  font-size: 2vw;
`;

export default App;
