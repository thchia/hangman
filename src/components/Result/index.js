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

const Result = ({ onReset, transitionState, children, answer }) => {
  return ReactDOM.createPortal(
    <Container transitionState={transitionState}>
      <Answer>{answer}</Answer>
      <Circle>
        <Paragraph>{children}</Paragraph>
        <Button onClick={onReset}>Play Again</Button>
      </Circle>
    </Container>,
    document.getElementById("portal-root")
  );
};

export default Result;

const Container = styled("aside")`
  display: flex;
  flex-direction: column;
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
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background-color: white;
  font-size: 2rem;
`;
const Paragraph = styled("p")`
  margin: 10px 0px;
`;
const Button = styled(BaseButton)`
  font-size: 1rem;
`;
const Answer = styled("p")`
  background-color: white;
  border-radius: 4px;
  margin: 10px 0px;
  font-size: 2rem;
  padding: 10px 20px;
  font-weight: bold;
`;
