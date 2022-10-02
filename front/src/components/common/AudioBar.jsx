import styled from "styled-components";
import { useState } from "react";
import bgm from "../../../src/music/Like Spring.mp3";
import { forbidden, hover } from "../../assets/cursor/cursorItem";

const BGM = new Audio(bgm);

function AudioBar() {
  const [playing, setPlaying] = useState(false);
  const [sourceBoxDisplay, setSourceBoxDisplay] = useState("none");

  function reset() {
    BGM.currentTime = 0;
    setPlaying(false);
  }

  function stop() {
    BGM.pause();
    setPlaying(false);
  }

  function play() {
    BGM.play();
    BGM.loop = true;
    setPlaying(true);
  }

  function sourceBoxOn() {
    setSourceBoxDisplay("");
  }

  function sourceBoxOff() {
    setSourceBoxDisplay("none");

  }

  return (
    <AudioBox onMouseEnter={sourceBoxOn} onMouseLeave={sourceBoxOff}>
      <ResetButton onClick={reset}>■</ResetButton>
      {playing ? (
        <StopButton onClick={stop}>∥</StopButton>
      ) : (
        <PlayButton onClick={play}>▶</PlayButton>
      )}
      <SourceBox id="SourceBox" data={sourceBoxDisplay}>음원제공 - BGM팩토리 (https://bgmfactory.com) <br />사용음원 - Like Spring</SourceBox>
    </AudioBox>

  );
}

const AudioBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  width: 5vw;
  height: 2vw;
  border: 0.1vw solid black;
  border-radius: 1vw;
  margin-left: 75vw;
`;

const ResetButton = styled.div`
  cursor: url(${hover}) 13 13, auto;
  margin-top:0.5vw;
  font-size: 1vw;
`;

const StopButton = styled.div`
  cursor: url(${hover}) 13 13, auto;
  margin-top:0.2vw;
  margin-left:0.15vw;
  font-size: 1vw;
`;

const PlayButton = styled.div`
  cursor: url(${hover}) 13 13, auto;
  margin-top:0.5vw;
  font-size: 1vw;
`;

const SourceBox = styled.div`
  display: ${(props) => props.data};
  position: absolute;
  padding: 0.3vw;
  border-radius: 0.3vw;
  background-color: #4f4f4fb4;
  color: white;
  margin-top: 2.5vw;
  font-size: 0.6vw;
  z-index: 1;
  transition: 0.3s;
`

export default AudioBar;
