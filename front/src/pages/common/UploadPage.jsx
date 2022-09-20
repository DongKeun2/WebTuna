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
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/common/Loading";
import { fetchUpload } from "../../features/toons/uploadSlice";
import cat from "../../assets/profile/cat.jpg";
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)

function UploadPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [fileImage, setFileImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div>
      {isLoading ? (
        <div>
          <Loading></Loading>
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
        <PageBox>
          <TitleBox>
            <UploadTitle>그림을 업로드 하면</UploadTitle>
            <UploadTitle>그림체가 비슷한 웹툰을 추천해줄게!</UploadTitle>
          </TitleBox>

          <ImgBox>
            {fileImage ? (
              <ToonImg
                id="canvas"
                alt="sample"
                src={fileImage}
                style={{ margin: "auto" }}
              />
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
            onClick={() => checkImage()}
          >
            확인
          </SubmitBtn>
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
        </PageBox>
      )}
    </div>
  )
}

const TitleBox = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 0px;
    margin-bottom: 30px;
  }
`;

const UploadTitle = styled.p`
  font-size: 40px;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 20px;
    line-height: 0;
  }
`;

const SubmitBtn = styled.button`
<<<<<<< HEAD
  background-color: ${props => (props.active ? '#feec91' : 'AFAFAF')};
  border-radius: 5%;
  width: '50px';
  height: '30px';
=======
  background-color: ${(props) => (props.active ? "#feec91" : "AFAFAF")};
  padding: 10px 30px;
  border-radius: 10px;
  border: 3px solid black;
  border-top: 5px double;
  border-bottom: 5px black double;
  margin-top: 20px;
  width: "50px";
  height: "30px";
>>>>>>> c1a2072 (feat: upload 페이지 기본 이미지 추가 / 버튼 스타일링 / 반응형 구현)
  :hover {
    cursor: ${props => (props.active ? 'pointer' : null)};
  }
`

<<<<<<< HEAD
export default UploadPage
=======
const PageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 300px;
  height: 300px;
  border: 5px solid black;
  border-radius: 10%;
  overflow: hidden;
`;

const ToonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const OuterBtn = styled.div`
  background-color: white;
  padding: 16px 1px;
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 14px;
  margin-top: 20px;
`;

const InputBtn = styled.label`
  background-color: #feec91;
  padding: 13px 30px;
  border: 2px solid black;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export default UploadPage;
>>>>>>> b748805 (feat: upload페이지 배치 조정)
