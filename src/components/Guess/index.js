import React from "react";
import styled, { keyframes } from "styled-components";

import { devices } from "../../styles/medias";

const Guess = ({ isGuessed, children }) => {
  return (
    <Container>
      {isGuessed ? <LetterContainer>{children}</LetterContainer> : null}
    </Container>
  );
};

export default Guess;

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 2rem;
  margin: 10px;
  border-bottom: solid 2px black;
  font-size: 2rem;
  text-transform: uppercase;

  @media ${devices.tablet} {
    margin: 5px 25px;
    width: 3rem;
  }
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
