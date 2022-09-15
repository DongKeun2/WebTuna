import { useState } from "react";

function UploadPage() {
  const [fileImage, setFileImage] = useState("");

  const saveFileImage = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  function checkImage(e) {
    if (fileImage) {
      predict();
    } else {
      console.log("이미지 업로드하세요 ^^");
    }
  }

  async function predict() {
    const baseURL = "https://teachablemachine.withgoogle.com/models/eWqWOghSi/";
    const modelURL = baseURL + "model.json";
    const metadataURL = baseURL + "metadata.json";
    // eslint-disable-next-line
    const model = await tmImage.load(modelURL, metadataURL);
    const tempImage = document.getElementById("canvas");
    const prediction = await model.predict(tempImage, false);
    console.log(prediction);
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
            style={{ margin: "auto" }}
          />
        )}
        <button
          style={{
            width: "50px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => deleteFileImage()}
        >
          {" "}
          삭제{" "}
        </button>
        <button
          style={{
            width: "50px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => checkImage()}
        >
          제출
        </button>
      </div>
    </div>
  );
}

export default UploadPage;