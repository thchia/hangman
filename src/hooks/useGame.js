import React from "react";

const totalChances = 9;

export const useGame = () => {
  return React.useReducer(gameReducer, initialState);
};

/**
 * Structure to easily get the guess status of a letter
 * which is needed to show the "keyboard" status
 *
 * {
 *    a: 0, // not guessed yet
 *    b: 1  // correctly guessed
 *    c: -1 // wrongly guessed
 * }
 *
 */
const emptyLetterMap = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((acc, curr) => {
    return { ...acc, [curr]: 0 };
  }, {});

const initialState = {
  totalWins: 0,
  totalLosses: 0,
  // Track when loss occurs (when missCount equals totalCount)
  missCount: 0,
  // Track when win occurs (when lettersLeft equals 0)
  lettersLeft: -1,
  // List the unique letters in the word to know if a guess is right or wrong
  answerData: [],
  // Track which letters are guessed, and whether it was correct or wrong
  letterMap: emptyLetterMap,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return {
        ...initialState,
        totalWins: state.totalWins,
        totalLosses: state.totalLosses,
      };
    case "SETUP":
      if (!action.payload) {
        console.warn("Word is required to setup game");
        return state;
      }
      return {
        totalWins: state.totalWins,
        totalLosses: state.totalLosses,
        missCount: 0,
        lettersLeft: unique(action.payload).length,
        answerData: action.payload.split(""),
        letterMap: emptyLetterMap,
      };
    case "GUESS":
      const letter = action.payload;
      if (!letter) {
        console.warn("You cannot perform an empty guess");
        return state;
      }
      const isPreviouslyGuessed = state.letterMap[letter] !== 0;
      if (isPreviouslyGuessed) return state;
      const isCorrect = state.answerData.includes(letter);
      if (isCorrect) {
        const newLettersLeft = state.lettersLeft - 1;
        const isWon = newLettersLeft === 0;
        return {
          ...state,
          totalWins: isWon ? state.totalWins + 1 : state.totalWins,
          lettersLeft: newLettersLeft,
          letterMap: {
            ...state.letterMap,
            [letter]: 1,
          },
        };
      } else {
        const newMissCount = state.missCount + 1;
        const isLost = newMissCount === totalChances;
        return {
          ...state,
          totalLosses: isLost ? state.totalLosses + 1 : state.totalLosses,
          missCount: newMissCount,
          letterMap: {
            ...state.letterMap,
            [letter]: -1,
          },
        };
      }
    default:
      return state;
  }
};
export const setupCreator = (word) => {
  return {
    type: "SETUP",
    payload: word,
  };
};
export const guessCreator = (letter) => {
  return {
    type: "GUESS",
    payload: letter,
  };
};
export const resetCreator = () => {
  return {
    type: "RESET",
  };
};
export const hasWonSelector = (state) => {
  return state.lettersLeft === 0;
};
export const hasLostSelector = (state) => {
  return totalChances - state.missCount === 0;
};
const unique = (arr) => {
  const set = new Set(arr);
  return [...set];
};
