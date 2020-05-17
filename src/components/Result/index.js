import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition";

import BaseButton from "../Button";

function Result({ onReset, transitionState, children }) {
  return ReactDOM.createPortal(
    <Container transitionState={transitionState}>
      <Circle>
        {children}
        <Button onClick={onReset}>Play Again</Button>
      </Circle>
    </Container>,
    document.getElementById("portal-root")
  );
}

export default Result;

const Container = styled("aside")`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000066;
  opacity: ${(p) => {
    switch (p.transitionState) {
      case EXITING:
      case EXITED:
        return "0";
      case ENTERING:
      case ENTERED:
      default:
        return "1";
    }
  }};
  transition: opacity 150ms linear;
`;
const Circle = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 30rem;
  border-radius: 15rem;
  background-color: white;
  font-size: 3rem;
`;
const Button = styled(BaseButton)`
  font-size: 2rem;
`;
