import { useSelector } from 'react-redux'

function UploadResultPage() {
  const webtoonInfo = useSelector(state => state.upload.webtoonInfo)

  return (
    <div>
      <h1>그림체추천 결과 페이지</h1>
    </div>
  )
}

export default UploadResultPage
