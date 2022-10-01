import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Loading from "./components/common/Loading";
import HeaderBar from "./components/common/HeaderBar";
import NavBar from "./components/common/NavBar";
import {
  changeLoginState,
  changeCurrentUser,
} from "./features/accounts/loginSlice";
<<<<<<< HEAD
import ModalFrame from "./components/common/ModalFrame";
import ClickSound from "../src/music/571119__elfstonepress__boing-sfx.mp3";
<<<<<<< HEAD
=======
import Today from "./components/common/Today";
>>>>>>> 5aa3ecb (feat: 오늘의 운세 안 닫히게 / 카드 클릭 시 운세 / 상세 페이지 이동)
=======
import style from "./App.css";
>>>>>>> e8e608b (feat: 마우스 클릭시 효과 추가)

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

<<<<<<< HEAD
  function switchModal() {
    dispatch(changeIsPossibleModal(false));
    dispatch(changeLuckyModal(false));
  }

  function test() {
    clickSound.play();
  }

  function clickEffect(e) {
    var d = document.createElement("div");
    d.className = "clickEffect";
    d.style.top = e.clientY + "px";
    d.style.left = e.clientX + "px";
    document.body.appendChild(d);
    d.addEventListener("animationend", function () {
      d.parentElement.removeChild(d);
    });
  }
  document.addEventListener("click", clickEffect);

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
=======
  return (
    <>
      <GlobalStyle />
      <HeaderBar></HeaderBar>
      {isPossibleModal && isLockyModal && <Today></Today>}
      {isLoading ? <Loading></Loading> : <Outlet></Outlet>}
      <NavBar></NavBar>
>>>>>>> 5aa3ecb (feat: 오늘의 운세 안 닫히게 / 카드 클릭 시 운세 / 상세 페이지 이동)
    </>
  );
}

export default App;
