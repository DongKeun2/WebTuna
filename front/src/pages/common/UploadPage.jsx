<<<<<<< HEAD
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../../components/common/Loading'
import { fetchUpload } from '../../features/toons/uploadSlice'
=======
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/common/Loading";
import { fetchUpload } from "../../features/toons/uploadSlice";
<<<<<<< HEAD
import cat from "../../assets/profile/cat.jpg";
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
=======
import tuntun from "../../assets/test/tuntun2.png";
<<<<<<< HEAD
>>>>>>> a56603e (feat: 프로필이미지 수정 / 검색창 배경 수정)
=======
import MySwal from "../../components/common/SweetAlert";
import { useEffect } from "react";
>>>>>>> 4cb92be (fix: 명툰이 로그인여부 확인 수정)

function UploadPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

<<<<<<< HEAD
<<<<<<< HEAD
  const [fileImage, setFileImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
=======
=======
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
      dispatch(fetchUpload(data)).then((res) => {
        if (res.type === "fetchUpload/fulfilled") {
          setTimeout(() => {
            setIsLoading(false);

            navigate("./result", { state: pathname });
          }, 1000);
        } else {
          alert("다시 시도해주세요");
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
    const model = await tmImage.load(modelURL, metadataURL)
    const tempImage = document.getElementById('canvas')
    const prediction = await model.predict(tempImage, false)
    console.log(prediction)
    return prediction
  }

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
    }
  }, [navigate, pathname]);

  return (
    <div>
      {isLoading ? (
        <div>
          <Loading text={"그림체를 분석하는 중..."}></Loading>
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
            <TitleBox>
              <UploadTitle>업로드한 그림과</UploadTitle>
              <UploadTitle>그림체가 비슷한 웹툰을 내가 찾아줄게!</UploadTitle>
            </TitleBox>

            {fileImage ? (
              <ImgBox>
                <ToonImg
                  id="canvas"
                  alt="sample"
                  src={fileImage}
                  style={{ margin: "auto" }}
                />
              </ImgBox>
            ) : (
              <TunImgBox>
                <ToonImg src={tuntun} alt="toon_img" />
              </TunImgBox>
            )}
            <BtnGroup>
              <OuterBtn>
                {fileImage ? (
                  <InputBtn htmlFor="input_img">다시 업로드 하기</InputBtn>
                ) : (
                  <InputBtn htmlFor="input_img">그림 업로드 하기</InputBtn>
                )}
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
  display: flex;
  gap: 1vw;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    gap: 0px;
    margin-bottom: 30px;
  }
`;

const UploadTitle = styled.p`
  margin-top: 2vw;
  font-size: 2.5vw;
  font-weight: 700;
  @media screen and (max-width: 750px) {
    margin-top: 20px;
    font-size: 20px;
    line-height: 0;
  }
`;

const SubmitBtn = styled.button`
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
  padding: 10px 30px;
  border-radius: 12px;
  border: 6px solid white;
  margin-top: 20px;
  width: "50px";
  height: "30px";
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
  :hover {
<<<<<<< HEAD
    cursor: ${props => (props.active ? 'pointer' : null)};
=======
    cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
>>>>>>> 0f305fa (feat: 명탐정툰툰 초기 페이지 반응형 UI)
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
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  min-height: 73vh;
  @media screen and (min-width: 1100px) {
    min-height: 68vh;
  }
  padding: 0.5vw;
  padding-bottom: 100px;
  @media screen and (max-width: 750px) {
    padding-bottom: 70px;
  }
  @media screen and (min-width: 1240px) {
    padding-bottom: 80px;
  }
  border: solid 2px;
  border-radius: 0.8rem;
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
  width: 20vw;
  min-width: 300px;
  min-height: 300px;
  height: 20vh;
  border: white 3px solid;
  border-radius: 70%;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  background-color: white;
  overflow: hidden;
`;

const ToonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  margin-left: 0.4vw;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20vw;
  min-width: 300px;
`;

const OuterBtn = styled.div`
  background-color: white;
  border-radius: 14px;
  padding: 14px 6px;
  margin-top: 21px;
`;

const InputBtn = styled.label`
  background-color: #feec91;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;

export default UploadPage;
>>>>>>> b748805 (feat: upload페이지 배치 조정)
