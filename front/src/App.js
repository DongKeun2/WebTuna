import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "./components/common/Loading";
import HeaderBar from "./components/common/HeaderBar";
import NavBar from "./components/common/NavBar";
import {
  changeLoginState,
  changeCurrentUser,
} from "./features/accounts/loginSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      console.log(token);
      dispatch(changeLoginState());
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      dispatch(changeCurrentUser(userInfo));
    }
  }, [dispatch]);

  const isLoading = useSelector((state) => state.search.isLoading);

  return (
    <div>
      <HeaderBar></HeaderBar>
      {isLoading ? <Loading></Loading> : <Outlet></Outlet>}
      <NavBar></NavBar>
    </div>
  );
}

export default App;
