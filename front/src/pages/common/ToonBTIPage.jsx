import { useState } from 'react'
import { useDispatch } from 'react-redux'

function ToonBTIPage() {
  const dispatch = useDispatch()

  const [page, setPage] = useState()
  return (
    <div>
      <h1>설문 페이지</h1>
    </div>
  )
}

export default ToonBTIPage
