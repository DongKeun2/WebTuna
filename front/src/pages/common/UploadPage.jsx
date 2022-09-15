import { useState } from "react";

function UploadPage() {
  const [fileImage, setFileImage] = useState("");

  const saveFileImage = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
    console.log(fileImage);
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
    </div>
  );
}

export default UploadPage;
