import { Outlet } from "react-router-dom";
import HeaderBar from "./components/common/HeaderBar";
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <Outlet></Outlet>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
