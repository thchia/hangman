import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition";

function Win({ onReset, transitionState }) {
  return ReactDOM.createPortal(
    <Container transitionState={transitionState}>
      <Circle>
        <p>You won!</p>
        <Button onClick={onReset}>Play Again</Button>
      </Circle>
    </Container>,
    document.getElementById("portal-root")
  );
}

export default Win;

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
const Button = styled("button")`
  font-size: 2rem;
  background-color: white;
  border: solid 1px black;
  border-radius: 4px;
  padding: 10px 0px;
  min-width: 200px;
`;
