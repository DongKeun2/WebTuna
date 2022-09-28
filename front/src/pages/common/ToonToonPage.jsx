import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MySwal from "../../components/common/SweetAlert";
import AllToonList from "../../components/toonlist/AllToonList";
import Loading from "../../components/common/Loading";
import { fetchtuntun, changeFocusTun } from "../../features/toons/tuntunSlice";

function ToonToonPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const toons = useSelector((state) => state.tuntun.tuntun);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      MySwal.fire({
        title: "로그인 후 이용해주세요.",
        icon: "warning",
        confirmButtonColor: "#feec91",
        confirmButtonText: "확인",
        reverseButtons: true,
      });
      navigate("/login", { state: pathname });
    } else {
      setIsLoading(true);
      dispatch(fetchtuntun()).then(() => {
        setIsLoading(false);
      });
    }
  }, [navigate, pathname, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading text={"웹툰 잡아오는 중..."}></Loading>
      ) : (
        <div>
          <h1>추천 페이지</h1>
          <div>{toons && <ToonList toons={toons} />}</div>
        </div>
      )}
    </>
  );
}

function ToonList({ toons }) {
  let rows = [];
  console.log(Object.keys(toons).length);
  for (let i = 0; i < Object.keys(toons).length; i = i + 2) {
    if (i + 1 < Object.keys(toons).length) {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon toons={toons[i]} />
          <RightToon toons={toons[i + 1]} />
        </ToonListBox>
      );
    } else {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon toons={toons[i]} />
        </ToonListBox>
      );
    }
  }
  return rows;
}

const ToonListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

function LeftToon({ toons }) {
  return (
    <LeftBox>
      <h1>왼쪽 상자</h1>
      <ToonBox>
        <AllToonList toons={toons} />
      </ToonBox>
    </LeftBox>
  );
}

const ToonBox = styled.div`
  display: flex;
`;

const LeftBox = styled.div`
  align-self: start;
`;

function RightToon({ toons }) {
  return (
    <RightBox>
      <h1>오른쪽 상자</h1>
      <ToonBox>
        <AllToonList toons={toons} />
      </ToonBox>
    </RightBox>
  );
}

const RightBox = styled.div`
  text-align: end;
  align-self: flex-end;
`;

export default ToonToonPage;
