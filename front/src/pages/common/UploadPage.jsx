import { useState } from 'react'
import styled from 'styled-components'

function UploadPage() {
  const [fileImage, setFileImage] = useState('')

  const saveFileImage = event => {
    setFileImage(URL.createObjectURL(event.target.files[0]))
  }

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage)
    setFileImage('')
  }

  function checkImage(e) {
    if (fileImage) {
      predict()
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
  }

  return (
    <div>
      <h1>사진 업로드 페이지</h1>
      <input
        name="imggeUpload"
        type="file"
        accept="image/*"
        onChange={saveFileImage}
      />
      <div>
        {fileImage && (
          <img
            id="canvas"
            alt="sample"
            src={fileImage}
            style={{ margin: 'auto' }}
          />
        )}
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
    </div>
  )
}

const SubmitBtn = styled.button`
  background-color: ${props => (props.active ? '#feec91' : 'AFAFAF')};
  border-radius: 5%;
  width: '50px';
  height: '30px';
  :hover {
    cursor: ${props => (props.active ? 'pointer' : null)};
  }
`

export default UploadPage
