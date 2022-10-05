import styled from "styled-components";
import { useState } from "react";
import bgm from "../../../src/music/Like Spring.mp3";
import { hover } from "../../assets/cursor/cursorItem";

const BGM = new Audio(bgm);

function AudioBar() {
  const [playing, setPlaying] = useState(false);
  const [sourceBoxDisplay, setSourceBoxDisplay] = useState("none");

  function reset() {
    BGM.currentTime = 0;
    BGM.pause();
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
        <StopButton onClick={stop}>II</StopButton>
      ) : (
        <PlayButton onClick={play}>▶</PlayButton>
      )}
      <SourceBox id="SourceBox" data={sourceBoxDisplay}>
        음원제공 - BGM팩토리 (https://bgmfactory.com) <br />
        사용음원 - Like Spring
      </SourceBox>
    </AudioBox>
  );
}

const AudioBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  width: 70px;
  height: 30px;
  border: 1px solid black;
  border-radius: 30px;
`;

const ResetButton = styled.button`
  width: 20px;
  height: 24px;
  padding: 0;
  margin-left: 4px;
  margin-bottom: 2px;
  border: 0;
  background-color: white;
  font-size: 16px;
  cursor: url(${hover}) 13 13, auto;
`;

const StopButton = styled.button`
  width: 20px;
  height: 24px;
  padding: 0;
  margin-right: 3px;
  margin-bottom: 2px;
  border: 0;
  background-color: white;
  font-size: 16px;
  cursor: url(${hover}) 13 13, auto;
`;

const PlayButton = styled.button`
  width: 20px;
  height: 24px;
  padding: 0;
  margin-right: 2px;
  margin-bottom: 2px;
  border: 0;
  background-color: white;
  font-size: 16px;
  cursor: url(${hover}) 13 13, auto;
`;

const SourceBox = styled.div`
  display: ${(props) => props.data};
  position: absolute;
  padding: 6px;
  border-radius: 8px;
  background-color: #4f4f4fb4;
  color: white;
  margin-top: 90px;
  font-size: 10px;
  z-index: 1;
  transition: 0.3s;
`;

export default AudioBar;
