import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "../../components/common/SweetAlert";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "잘못된 접근입니다!",
      text: "메인페이지로 이동합니다.",
      icon: "info",
      confirmButtonColor: "#feec91",
      confirmButtonText: "확인",
    });
    navigate("/");
  }, [navigate]);
  return <div></div>;
}

export default NotFoundPage;
