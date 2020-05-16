import React from "react";
import styled from "styled-components";

const qwerty = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Letters({ onGuess, letterMap }) {
  return (
    <Container data-testid="letter-choices">
      {qwerty.map((row) => (
        <div key={row[0]}>
          <div>
            {row.map((letter) => {
              const isCorrectGuess = letterMap[letter] === 1;
              const isWrongGuess = letterMap[letter] === -1;
              const isDisabled = isCorrectGuess || isWrongGuess;
              return (
                <Button
                  key={letter}
                  disabled={isDisabled}
                  isWrong={isWrongGuess}
                  isCorrect={isCorrectGuess}
                  onClick={() => onGuess(letter)}
                >
                  {letter}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default Letters;

const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Button = styled("button")`
  font-size: 2rem;
  margin: 10px;
  background-color: ${(p) => {
    if (p.isCorrect) return "lightgreen";
    if (p.isWrong) return "pink";
    return "none";
  }};
  color: ${(p) => {
    if (p.isCorrect) return "green";
    if (p.isWrong) return "red";
    return "inherit";
  }};
  border: ${(p) => {
    const prefix = "solid 1px";
    if (p.isCorrect) return `${prefix} green`;
    if (p.isWrong) return `${prefix} red`;
    return `${prefix} black`;
  }};
  border-radius: 4px;
`;
