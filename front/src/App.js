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

function App() {
  const dispatch = useDispatch();

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

  return (
    <>
      <GlobalStyle />
      <HeaderBar></HeaderBar>
      {isPossibleModal && isLockyModal && (
        <ModalFrame _handleModal={switchModal}>
          <ModalTitle>당신의 운세를 확인해드립니다!</ModalTitle>
        </ModalFrame>
      )}
      {isLoading ? <Loading></Loading> : <Outlet></Outlet>}
      <NavBar></NavBar>
    </>
  );
}

const ModalTitle = styled.div`
  margin-top: 3vw;
  font-size: 2vw;
`;

export default App;
