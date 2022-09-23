import styled, { keyframes } from 'styled-components';

function ToonLoading() {
  return (
    [...Array(20).keys()].map(num => (
      <OneToon key={num}>
      <ImgBox>
      </ImgBox>
      <ToonInfo>
        <ToonTitle></ToonTitle>
        <ToonAuthor></ToonAuthor>
      </ToonInfo>
    </OneToon>
    ))
  );
}

const Pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const OneToon = styled.div`
  padding: 0.8vw;
  padding-bottom: 0.3vw;
`

const ImgBox = styled.div`
  width: 100%;
  height: 15vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  background-color: #cbd5e1;
  animation: ${Pulse} 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

const ToonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 3vw;
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  background-color: white;
  border-bottom-left-radius: 0.8vw;
  border-bottom-right-radius: 0.8vw;
`

const ToonTitle = styled.div`
  width: 70%;
  height: 1.2vw;
  margin: 0;
  margin-top: 0.2vw;
  margin-bottom: 0.1vw;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: #cbd5e1;
  animation: ${Pulse} 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

const ToonAuthor = styled.div`
  width: 30%;
  height: 0.9vw;
  margin-top: 0.1vw;
  margin-bottom: 0.2vw;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: #cbd5e1;
  animation: ${Pulse} 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export default ToonLoading;
