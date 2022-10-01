import styled from "styled-components";
import { useState } from "react";
import bgm from "../../../src/music/Like Spring.mp3";

function AudioBar() {
  const [BGM, setBGM] = useState(new Audio(bgm));
  const [playing, setPlaying] = useState(false);

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

  return (
    <AudioBox>
      <ResetButton onClick={reset}>■</ResetButton>
      {playing ? (
        <StopButton onClick={stop}>∥</StopButton>
      ) : (
        <PlayButton onClick={play}>▶</PlayButton>
      )}
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
  font-size: 1vw;
`;

const StopButton = styled.div`
  font-size: 1vw;
`;

const PlayButton = styled.div`
  font-size: 1vw;
`;

export default AudioBar;
