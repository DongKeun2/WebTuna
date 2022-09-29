import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MySwal from "../../components/common/SweetAlert";
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
        <ToonToonBox>{toons && <ToonList toons={toons} />}</ToonToonBox>
      )}
    </>
  );
}

const ToonToonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
  gap: 30px;
`;

function LeftToon({ toons, type }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <LeftBox>
      <LeftOuterBox>
        <LeftContentBox>
          <LeftInnerBox>
            <LeftItemBox
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              tun={type}
            >
              {isHover ? (
                <ToonBox>
                  {toons.map((toon) => (
                    <ToonItem
                      toontoon={true}
                      key={toon.webtoon_id}
                      item={toon}
                    />
                  ))}
                </ToonBox>
              ) : (
                <ImgBox>
                  <TunImg src={tuntunItem[type]?.img} alt="tun_img" />
                </ImgBox>
              )}
            </LeftItemBox>
          </LeftInnerBox>
        </LeftContentBox>
      </LeftOuterBox>
    </LeftBox>
  );
}

const LeftItemBox = styled.div`
  width: 70vw;
  height: 97%;
  overflow: hidden;
  background-repeat: no-repeat;
  border: 3px solid red;
  background: linear-gradient(-120deg, transparent 130px, white, 0);
  @media screen and (max-width: 1290px) {
    width: 68vw;
  }
  @media screen and (max-width: 1090px) {
    width: 66vw;
  }
  @media screen and (max-width: 910px) {
    width: 63vw;
  }
  @media screen and (max-width: 850px) {
    width: 60vw;
  }
  @media screen and (max-width: 700px) {
    width: 55vw;
  }
  @media screen and (max-width: 500px) {
    width: 50vw;
  }
  @media screen and (max-width: 400px) {
    width: 45vw;
  }
  @media screen and (max-width: 400px) {
    width: 40vw;
  }
`;

const LeftOuterBox = styled.div`
  height: 17vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  background: linear-gradient(-110deg, transparent 100px, black 0);
`;

const LeftContentBox = styled.div`
  height: 17vw;
  width: 99.5%;
  height: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  background: linear-gradient(-110deg, transparent 100px, white 0);
`;

const LeftInnerBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 99%;
  height: 97%;
  background: black;
  background: linear-gradient(-110deg, transparent 100px, black 0);
`;

const LeftBox = styled.div`
  align-self: start;
  width: 80vw;
  height: 17vw;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
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
      <RightOuterBox>
        <RightContentBox
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <RightInnerBox>
            <RightItemBox>
              {isHover ? (
                <ToonBox>
                  {toons.map((toon) => (
                    <ToonItem
                      toontoon={true}
                      key={toon.webtoon_id}
                      item={toon}
                    />
                  ))}
                </ToonBox>
              ) : (
                <ImgBox>
                  <TunImg src={tuntunItem[type]?.img} alt="tun_img" />
                </ImgBox>
              )}
            </RightItemBox>
          </RightInnerBox>
        </RightContentBox>
      </RightOuterBox>
    </RightBox>
  );
}

const RightBox = styled.div`
  align-self: flex-end;
  width: 80vw;
  height: 17vw;
  text-align: end;
`;

const RightOuterBox = styled.div`
  height: 17vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  background: linear-gradient(110deg, transparent 100px, black 0);
`;

const RightContentBox = styled.div`
  height: 17vw;
  width: 99.5%;
  height: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  background: linear-gradient(110deg, transparent 100px, white 0);
`;

const RightInnerBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 99%;
  height: 97%;
  background: black;
  background: linear-gradient(110deg, transparent 100px, black 0);
`;

const RightItemBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 70vw;
  height: 97%;
  overflow: hidden;
  background-repeat: no-repeat;
  border: 3px solid red;
  background: linear-gradient(110deg, transparent 100px, white, 0);
  @media screen and (max-width: 1290px) {
    width: 68vw;
  }
  @media screen and (max-width: 1090px) {
    width: 66vw;
  }
  @media screen and (max-width: 910px) {
    width: 63vw;
  }
  @media screen and (max-width: 850px) {
    width: 60vw;
  }
  @media screen and (max-width: 700px) {
    width: 55vw;
  }
  @media screen and (max-width: 500px) {
    width: 50vw;
  }
  @media screen and (max-width: 400px) {
    width: 45vw;
  }
  @media screen and (max-width: 400px) {
    width: 40vw;
  }
`;

export default ToonToonPage;
