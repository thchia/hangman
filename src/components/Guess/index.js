import React from "react";
import styled, { keyframes } from "styled-components";

function Guess({ isGuessed, children }) {
  return (
    <Container>
      {isGuessed ? <LetterContainer>{children}</LetterContainer> : null}
    </Container>
  );
}

export default Guess;

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  margin: 25px;
  border-bottom: solid 2px black;
  font-size: 2rem;
  text-transform: uppercase;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const LetterContainer = styled("div")`
  animation: ${fadeIn} 300ms;
`;
