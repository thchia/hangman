import React from "react";
import {
  render,
  fireEvent,
  getByText,
  queryByText,
} from "@testing-library/react";
import App from "./App";

const sampleWord = "Singlife";
const winText = "You won!";
const loseText = "You lost, sorry";

describe("Hangman game", () => {
  it("registers correct guess", () => {
    // Arrange
    const { getByTestId, queryByText } = render(<App word={sampleWord} />);
    const letterChoicesContainer = getByTestId("letter-choices");
    const resultsContainer = getByTestId("results");
    const guessLetter = createGuessLetter(letterChoicesContainer);
    // Act
    guessLetter("s");
    // Assert
    getByText(resultsContainer, "s");
    expect(queryByText(winText)).toBeNull();
    expect(queryByText(loseText)).toBeNull();
  });
  it("handles wrong guess", () => {
    const { getByTestId } = render(<App word={sampleWord} />);
    const letterChoicesContainer = getByTestId("letter-choices");
    const resultsContainer = getByTestId("results");
    const guessLetter = createGuessLetter(letterChoicesContainer);

    guessLetter("z");

    expect(queryByText(resultsContainer, "z")).toBeNull();
  });
  it("disables guessed letter", () => {
    const { getByTestId } = render(<App word={sampleWord} />);
    const letterChoicesContainer = getByTestId("letter-choices");
    const letterChoice = getByText(letterChoicesContainer, "s");
    expect(letterChoice.closest("button")).not.toHaveAttribute("disabled");
    const guessLetter = createGuessLetter(letterChoicesContainer);

    guessLetter("s");

    expect(letterChoice.closest("button")).toHaveAttribute("disabled");
  });
  it("detects win", () => {
    const { getByTestId, getByText } = render(<App word={sampleWord} />);
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessLetter = createGuessLetter(letterChoicesContainer);

    guessLetter("s");
    guessLetter("i");
    guessLetter("n");
    guessLetter("g");
    guessLetter("l");
    guessLetter("f");
    guessLetter("e");

    getByText(winText);
  });
  it("detects loss", () => {
    const { getByTestId, getByText } = render(<App word={sampleWord} />);
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessLetter = createGuessLetter(letterChoicesContainer);

    guessLetter("a");
    guessLetter("b");
    guessLetter("c");
    guessLetter("d");
    guessLetter("g");
    guessLetter("h");
    guessLetter("j");
    guessLetter("k");
    guessLetter("m");

    getByText(loseText);
  });
});

const createGuessLetter = (container) => (letter) => {
  return fireEvent.click(getByText(container, letter));
};
