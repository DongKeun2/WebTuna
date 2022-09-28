import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MySwal from "../../components/common/SweetAlert";
import AllToonList from "../../components/toonlist/AllToonList";
import Loading from "../../components/common/Loading";
import { fetchtuntun, changeFocusTun } from "../../features/toons/tuntunSlice";
import tuntunItem from "../../assets/tuntun/tuntunItem";
import ToonItem from "../../components/toonlist/ToonItem";

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
          <LeftToon type={i} toons={toons[i]} />
          <RightToon type={i + 1} toons={toons[i + 1]} />
        </ToonListBox>
      );
    } else {
      rows.push(
        <ToonListBox key={i}>
          <LeftToon type={i} toons={toons[i]} />
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

function LeftToon({ toons, type }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <LeftBox>
      <LeftContentBox
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover ? (
          <ToonBox>
            {toons.map((toon) => (
              <ToonItem toontoon={true} key={toon.webtoon_id} item={toon} />
            ))}
          </ToonBox>
        ) : (
          <ImgBox>
            <TunImg src={tuntunItem[type]?.img} alt="tun_img" />
          </ImgBox>
        )}
      </LeftContentBox>
    </LeftBox>
  );
}

const LeftContentBox = styled.div`
  height: 17vw;
  overflow: hidden;
`;

const LeftBox = styled.div`
  align-self: start;
  width: 80%;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TunImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const ToonBox = styled.div`
  display: flex;
  height: 100%;
  /* display: grid; */
  /* grid-template-columns: 100px 100 100 100; */
`;

function RightToon({ toons, type }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <RightBox>
      <RightContentBox
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover ? (
          <ToonBox>
            <ToonBox>
              {toons.map((toon) => (
                <ToonItem toontoon={true} key={toon.webtoon_id} item={toon} />
              ))}
            </ToonBox>
          </ToonBox>
        ) : (
          <ImgBox>
            <TunImg src={tuntunItem[type]?.img} alt="tun_img" />
          </ImgBox>
        )}
      </RightContentBox>
    </RightBox>
  );
}

const RightContentBox = styled.div`
  height: 17vw;
  overflow: hidden;
`;

const RightBox = styled.div`
  align-self: flex-end;
  width: 80%;
  text-align: end;
`;

export default ToonToonPage;
