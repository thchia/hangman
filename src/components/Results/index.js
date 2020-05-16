import React from "react";
import Guess from "../Guess";
import styled from "styled-components";

function Results({ answerArray, letterMap }) {
  return (
    <Container data-testid="results">
      {answerArray.map((letter, index) => {
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

export default Results;

const Container = styled("div")`
  display: flex;
`;
