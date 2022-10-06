<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../../components/common/Loading'
import { fetchUpload } from '../../features/toons/uploadSlice'
=======
import { useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))
=======
import { useEffect, useState } from "react";
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/common/Loading";
<<<<<<< HEAD
import { fetchUpload } from "../../features/toons/uploadSlice";
<<<<<<< HEAD
<<<<<<< HEAD
import cat from "../../assets/profile/cat.jpg";
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
=======
import tuntun from "../../assets/test/tuntun2.png";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a56603e (feat: 프로필이미지 수정 / 검색창 배경 수정)
=======
=======
import {
  fetchProbability,
  fetchUpload,
} from "../../features/toons/uploadSlice";
import { changeCurrentpage } from "../../features/toons/navBarSlice";
import tuntun from "../../assets/toon/conanTun.png";
>>>>>>> e4fa0a4 (feat: 그림체 분석 결과 결과페이지에 디스플레이)
import MySwal from "../../components/common/SweetAlert";
<<<<<<< HEAD
import { useEffect } from "react";
>>>>>>> 4cb92be (fix: 명툰이 로그인여부 확인 수정)
=======
// import MySwal from "../../components/common/SweetAlert";
// import { useEffect } from "react";
>>>>>>> 5ac0872 (feat: 명탐정 툰툰 비로그인 접근 가능)
=======
>>>>>>> 39fe5fb (feat: 명탐정툰툰 가운데 정렬)
=======
import tuntun from "../../assets/toon/conanTun.png";
<<<<<<< HEAD
>>>>>>> e136dee (docs: assets정리)
=======
import MySwal from "../../components/common/SweetAlert";
>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))
=======
import { forbidden, hover } from "../../assets/cursor/cursorItem";
>>>>>>> 68bf4c3 (feat: 프로필&상세페이지 제외 모든 페이지 커서 수정)

function UploadPage() {
<<<<<<< HEAD
  const dispatch = useDispatch()
  const navigate = useNavigate()
=======
  sessionStorage.setItem("url", `/upload`);
  const dispatch = useDispatch();
  const navigate = useNavigate();
>>>>>>> 77b87b1 (feat: 로그인시 왔던 페이지로 돌아가기)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [fileImage, setFileImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
=======
=======
=======
=======
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
  useEffect(() => {
    dispatch(changeCurrentpage("upload"));
  }, [dispatch]);

<<<<<<< HEAD
>>>>>>> d09e4a4 (fix: 하단 NavBar UI 수정 완료 (페이지마다 버튼 활성화 포함))
=======
>>>>>>> add08c0 (feat: 깃 풀 오리진 프론트)
  const { pathname } = useLocation();

>>>>>>> 4cb92be (fix: 명툰이 로그인여부 확인 수정)
  const [fileImage, setFileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [fetchError, setIsFetchError] = useState(false);
>>>>>>> 1d997a0 (feat: 모델 생성 실패 시 경고창 / 그림체 result페이지 cleanup 추가)
=======
>>>>>>> 8be362d (fix: 업로드 에러 핸들링)

  const saveFileImage = event => {
    setFileImage(URL.createObjectURL(event.target.files[0]))
  }

<<<<<<< HEAD
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage)
    setFileImage('')
  }

=======
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
  function checkImage(e) {
<<<<<<< HEAD
    if (fileImage) {
      setIsLoading(true)
      predict().then(prediction => {
        const probability = prediction.map(item => {
          return (item.probability * 100).toFixed(2)
        })
        const data = {
          probability,
        }
        console.log(data)
        dispatch(fetchUpload(data))
      })
      setTimeout(() => {
        setIsLoading(false)
        navigate('./result')
      }, 3000)
    } else {
      console.log('이미지 업로드하세요 ^^')
    }
=======
    setIsLoading(true);
    predict().then((prediction) => {
      const probability = prediction.map((item) => {
        return parseFloat((item.probability * 100).toFixed(2));
      });
      const data = {
        probability,
      };
      console.log(data);
      dispatch(fetchUpload(data)).then((res) => {
        if (res.type === "fetchUpload/fulfilled") {
          dispatch(fetchProbability(probability));
          setTimeout(() => {
            setIsLoading(false);

            navigate("./result", { state: pathname });
          }, 1000);
        } else {
          MySwal.fire({
            title: "다시 시도해 주세요!",
            icon: "error",
            confirmButtonColor: "#feec91",
            confirmButtonText: "확인",
          });
          setIsLoading(false);
        }
      });
    });
<<<<<<< HEAD
    setTimeout(() => {
      setIsLoading(false);
      if (fetchError) {
        alert("다시 시도해주세요.");
      } else {
        navigate("./result");
      }
    }, 3000);
>>>>>>> 79d4088 (feat: 미리보기 여부 확인 논리 수정)
=======
>>>>>>> 8be362d (fix: 업로드 에러 핸들링)
  }

  async function predict() {
    const baseURL = 'https://teachablemachine.withgoogle.com/models/eWqWOghSi/'
    const modelURL = baseURL + 'model.json'
    const metadataURL = baseURL + 'metadata.json'
    // eslint-disable-next-line
<<<<<<< HEAD
    const model = await tmImage.load(modelURL, metadataURL)
    const tempImage = document.getElementById('canvas')
    const prediction = await model.predict(tempImage, false)
    console.log(prediction)
    return prediction
=======
    const model = await tmImage.load(modelURL, metadataURL);
    const tempImage = document.getElementById("canvas");
    const prediction = await model.predict(tempImage, false);
    return prediction;
>>>>>>> 9798239 (docs: 콘솔로그 삭제(프로필&디테일 관련 제외))
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <Loading type={"upload"} text={"그림체를 분석하는 중..."}></Loading>
          {fileImage && (
            <img
              id="canvas"
              alt="sample"
              src={fileImage}
              style={{ margin: 'auto', display: 'none' }}
            />
          )}
        </div>
      ) : (
        <Container>
          <PageBox>
            {fileImage ? (
              <>
                <MyeongToon>명탐정 툰툰</MyeongToon>
                <ImgBox>
                  <ToonImg
                    id="canvas"
                    alt="sample"
                    src={fileImage}
                    style={{ margin: "auto" }}
                  />
                </ImgBox>
              </>
            ) : (
              <>
                <TitleBox>
                  <UploadTitle>너의 그림과</UploadTitle>
                  <UploadTitle>그림체가 비슷한 웹툰을 찾아줄게!</UploadTitle>
                </TitleBox>
                <TunImgBox>
                  <TunImg src={tuntun} alt="toon_img" />
                </TunImgBox>
              </>
            )}
            <BtnGroup>
              {fileImage ? (
                <InputBtn htmlFor="input_img">다시 업로드 하기</InputBtn>
              ) : (
                <InputBtn htmlFor="input_img">그림 업로드 하기</InputBtn>
              )}
              <input
                id="input_img"
                name="imggeUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImage}
                style={{ display: "none" }}
              />
<<<<<<< HEAD
            ) : (
              <ToonImg src={cat} alt="toon_img" />
            )}
          </ImgBox>
          <OuterBtn>
            <InputBtn htmlFor="input_img">그림 업로드 하기</InputBtn>
          </OuterBtn>
          <input
            id="input_img"
            name="imggeUpload"
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            style={{ display: "none" }}
          />
<<<<<<< HEAD
          <div>
<<<<<<< HEAD
            {fileImage && (
              <img
                id="canvas"
                alt="sample"
                src={fileImage}
                style={{ margin: 'auto' }}
              />
            )}
=======
>>>>>>> b748805 (feat: upload페이지 배치 조정)
            <button
              style={{
                width: '50px',
                height: '30px',
                cursor: 'pointer',
              }}
              onClick={() => deleteFileImage()}
            >
              {' '}
              삭제{' '}
            </button>
            <SubmitBtn
              active={fileImage ? true : false}
              onClick={() => checkImage()}
            >
              제출
            </SubmitBtn>
          </div>
=======
          <SubmitBtn
            active={fileImage ? true : false}
            onClick={fileImage ? checkImage : null}
          >
            확인
          </SubmitBtn>
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
        </PageBox>
=======
              <SubmitBtn
                active={fileImage ? true : false}
                onClick={fileImage ? checkImage : null}
              >
                제출
              </SubmitBtn>
            </BtnGroup>
          </PageBox>
        </Container>
>>>>>>> 0f305fa (feat: 명탐정툰툰 초기 페이지 반응형 UI)
      )}
    </div>
  )
}

const TitleBox = styled.div`
  position: relative;
  min-height: 50px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 0.5vw 2vw;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    padding: 10px 12px;
    gap: 0;
  }
  :after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    content: "";
    border: 27px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -13.3px;
    margin-bottom: -27px;
  }
  :before {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    content: "";
    border: 28px solid transparent;
    border-top-color: black;
    border-bottom: 0;
    margin-left: -14px;
    margin-bottom: -29.5px;
  }
`;

const UploadTitle = styled.p`
  font-size: 1.5vw;
  font-weight: 700;
  @media screen and (max-width: 750px) {
    font-size: 16px;
    line-height: 0;
  }
`;

const MyeongToon = styled.p`
  font-size: 2vw;
  font-weight: 700;
  margin-bottom: 3vw;
  @media screen and (max-width: 750px) {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

const SubmitBtn = styled.button`
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  background-color: ${props => (props.active ? '#feec91' : 'AFAFAF')};
  border-radius: 5%;
  width: '50px';
  height: '30px';
=======
  background-color: ${(props) => (props.active ? "#feec91" : "AFAFAF")};
=======
  background-color: ${(props) => (props.active ? "#feec91" : "#e2e8f0")};
  font-weight: ${(props) => (props.active ? "700" : "500")};
>>>>>>> 0f305fa (feat: 명탐정툰툰 초기 페이지 반응형 UI)
=======
  box-shadow: 2px 3px 2px rgba(0,0,0,0.5);  
  border: 0.3vw solid white;
  border-radius: 0.6vw;
  background-color: ${(props) => (props.active ? "#feec91" : "#e2e8f0")};
>>>>>>> 08541e4 (fix: 전반적인 썸네일, 버튼 UI 수정)
  padding: 10px 30px;
  margin-top: 20px;
<<<<<<< HEAD
  width: "50px";
  height: "30px";
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
=======
  font-weight: 700;
  font-size: 1vw;
>>>>>>> 08541e4 (fix: 전반적인 썸네일, 버튼 UI 수정)
  :hover {
<<<<<<< HEAD
<<<<<<< HEAD
    cursor: ${props => (props.active ? 'pointer' : null)};
=======
    cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
>>>>>>> 0f305fa (feat: 명탐정툰툰 초기 페이지 반응형 UI)
=======
    cursor: ${(props) => !props.active && `url(${forbidden}) 13 13, auto`};
<<<<<<< HEAD
>>>>>>> 68bf4c3 (feat: 프로필&상세페이지 제외 모든 페이지 커서 수정)
=======
    background-color: ${(props) => (props.active ? "#ffef62" : "#e2e8f0")};
    border: ${(props) => (props.active ? "0.3vw solid #ffef62" : "0.3vw solid white;")};
>>>>>>> 08541e4 (fix: 전반적인 썸네일, 버튼 UI 수정)
  }
`

<<<<<<< HEAD
<<<<<<< HEAD
export default UploadPage
=======
=======
const Container = styled.div`
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  padding: 1vw 0;
  border: solid 2px;
  border-radius: 1rem;
  background-color: white;
`;

>>>>>>> 0f305fa (feat: 명탐정툰툰 초기 페이지 반응형 UI)
const PageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  min-height: 73vh;
  @media screen and (min-width: 1100px) {
    min-height: 68vh;
  }
  padding-top: 3vw;
  padding-bottom: 80px;
  @media screen and (max-width: 750px) {
    padding-top: 20px;
    padding-bottom: 90px;
  }
  border: solid 2px;
  border-radius: 0.8rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #fff5c3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 20vw;
  min-width: 300px;
  height: 20vw;
  min-height: 300px;
  border: 3px solid;
  background-color: white;
  border-radius: 10%;
  overflow: hidden;
`;

const TunImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vh;
  min-width: 320px;
  min-height: 320px;
  overflow: hidden;
`;

const ToonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  margin-left: 0.4vw;
`;

const TunImg = styled.img`
  width: 315px;
  height: 315px;
  object-fit: fill;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20vw;
  min-width: 300px;
`;

const InputBtn = styled.label`
  box-shadow: 2px 3px 2px rgba(0,0,0,0.5);  
  border: 0.3vw solid white;
  border-radius: 0.6vw;
  background-color: #d1e2ff;
  padding: 10px 10px;
  margin-top: 20px;
  font-weight: 700;
  font-size: 1vw;
  cursor: url(${hover}) 13 13, auto;
  &:hover {
    background-color: #99c0ff;
    border: 0.3vw solid #99c0ff;
  }
`;

export default UploadPage;
>>>>>>> b748805 (feat: upload페이지 배치 조정)
