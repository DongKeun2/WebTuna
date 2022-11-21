import styled from 'styled-components';
import { hover } from "../../assets/cursor/cursorItem";

function MoveTop() {
  function topMove() {
    window.scrollTo(0, 0);
  }

  return (
    <TopBtn onClick={topMove}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </TopBtn>
  );
};

const TopBtn = styled.button`
  position: fixed;
  bottom: 60px;
  right: 10px;
  width: 40px;
  height: 40px;
  border: solid 1px #82adf8;
  border-radius: 100%;
  color: #82adf8;
  background-color: white;
`

export default MoveTop;