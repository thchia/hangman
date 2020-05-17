import React from "react";
import {
  render,
  fireEvent,
  getByText,
  queryByText,
} from "@testing-library/react";
import App from "./App";

const sampleWord = "Singlife";
const losingWord = "abcdhjkmo";
const winText = "You won!";
const loseText = "You lost, sorry";
const tryAgainText = "Play Again";
const hangmanSegments = [
  "head",
  "body",
  "arms",
  "right-leg",
  "left-leg",
  "noose",
  "gallows-top",
  "gallows-height",
  "gallows-floor",
];

describe("Hangman game", () => {
  it("registers correct guess", () => {
    // Arrange
    const { getByTestId, queryByText } = renderSubject();
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
    const { getByTestId } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const resultsContainer = getByTestId("results");
    const guessLetter = createGuessLetter(letterChoicesContainer);

    guessLetter("z");

    expect(queryByText(resultsContainer, "z")).toBeNull();
  });
  it("disables guessed letter", () => {
    const { getByTestId } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const letterChoice = getByText(letterChoicesContainer, "s");
    expect(letterChoice.closest("button")).not.toHaveAttribute("disabled");
    const guessLetter = createGuessLetter(letterChoicesContainer);

    guessLetter("s");

    expect(letterChoice.closest("button")).toHaveAttribute("disabled");
  });
  it("detects win", () => {
    const { getByTestId, getByText } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessWord = createGuessWord(letterChoicesContainer);

    guessWord("singlife");

    getByText(winText);
  });
  it("records wins", () => {
    const { getByTestId, getByText } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessWord = createGuessWord(letterChoicesContainer);
    getByText("Total Wins: 0");

    guessWord("singlife");

    fireEvent.click(getByText(tryAgainText));
    getByText("Total Wins: 1");
  });
  it("detects loss", () => {
    const { getByTestId, getByText } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessWord = createGuessWord(letterChoicesContainer);

    guessWord(losingWord);

    getByText(loseText);
  });
  it("records losses", () => {
    const { getByTestId, getByText } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessWord = createGuessWord(letterChoicesContainer);
    getByText("Total Losses: 0");

    guessWord(losingWord);

    getByText(loseText);
    fireEvent.click(getByText(tryAgainText));
    getByText("Total Losses: 1");
  });
  it("only draws hangman on wrong guess", () => {
    const {
      getByTestId,
      getByText,
      getByTitle,
      queryByTitle,
    } = renderSubject();
    const letterChoicesContainer = getByTestId("letter-choices");
    const guessLetter = createGuessLetter(letterChoicesContainer);
    const guessWord = createGuessWord(letterChoicesContainer);

    expect(queryByTitle("head")).toBeNull();
    guessLetter("s");
    expect(queryByTitle("head")).toBeNull();
    guessWord(losingWord, (_, i) => getByTitle(hangmanSegments[i]));

    getByText(loseText);
  });
});

const createGuessWord = (container) => (word, letterGuessedCb) => {
  const guessLetter = createGuessLetter(container);
  word.split("").forEach((letter, i) => {
    guessLetter(letter);
    letterGuessedCb && letterGuessedCb(letter, i);
  });
};
const createGuessLetter = (container) => (letter) => {
  fireEvent.click(getByText(container, letter));
};

function renderSubject() {
  return render(
    <>
      <App word={sampleWord} />
      <div id="portal-root"></div>
    </>
  );
}
