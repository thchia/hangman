import React from "react";
import Guess from "../Guess";
import styled from "styled-components";

function Word({ answerArray, letterMap }) {
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

export default Word;

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 0px;
  min-height: 102px;
`;
