import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import HeaderBar from "./components/common/HeaderBar";
import NavBar from "./components/common/NavBar";
import { changeLoginState } from "./features/accounts/loginSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      console.log(token);
      dispatch(changeLoginState());
    }
  }, [dispatch]);
  return (
    <div>
      <HeaderBar></HeaderBar>
      <Outlet></Outlet>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
