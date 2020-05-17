import React from "react";
import styled from "styled-components";

import BaseButton from "../Button";
import { devices } from "../../styles/medias";

const qwerty = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Letters({ onGuess, letterMap }) {
  return (
    <Container data-testid="letter-choices">
      {qwerty.map((row) => (
        <Row key={row[0]}>
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
        </Row>
      ))}
    </Container>
  );
}

export default Letters;

const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 680px;
  width: 100%;
  margin-top: 20px;
`;
const Row = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px 0px;
`;
const Button = styled(BaseButton)`
  height: 1.6rem;
  width: 1.6rem;
  font-size: 1rem;
  margin: 2px;
  background-color: ${(p) => {
    if (p.isCorrect) return "lightgreen";
    if (p.isWrong) return "pink";
    return "initial";
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
  box-shadow: ${(p) => {
    if (p.isCorrect || p.isWrong) return "1px 1px";
    return "2px 2px";
  }};
  text-transform: uppercase;
  min-width: unset;
  padding: unset;

  @media ${devices.tablet} {
    height: 3rem;
    width: 3rem;
    font-size: 2rem;
    margin: 2px 10px;
    box-shadow: ${(p) => {
      if (p.isCorrect || p.isWrong) return "2px 2px";
      return "4px 4px";
    }};
  }
`;
