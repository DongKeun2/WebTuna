import { Outlet } from "react-router-dom";
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <div>
      <Outlet></Outlet>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
