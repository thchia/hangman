import React from "react";
import styled from "styled-components";

import Guess from "../Guess";
import { devices } from "../../styles/medias";

function Word({ answerData, letterMap }) {
  return (
    <Container data-testid="results">
      {answerData.map((letter, index) => {
        const isGuessed = letterMap[letter] === 1;
        return (
          <Guess key={`${letter}-${index}`} isGuessed={isGuessed}>
            {letter}
          </Guess>
        );
      })}
    </Container>
  );
}

export default Word;

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0px;

  @media ${devices.tablet} {
    margin: 10px 0px;
  }
`;
