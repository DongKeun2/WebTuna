import { useState } from "react";

function UploadPage() {
  const [fileImage, setFileImage] = useState("");

  const saveFileImage = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
    console.log(fileImage);
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    console.log(fileImage);
    setFileImage("");
  };

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
          <img alt="sample" src={fileImage} style={{ margin: "auto" }} />
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
      </div>
    </div>
  );
}

export default UploadPage;
