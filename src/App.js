import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import Word from "./components/Word";
import Letters from "./components/Letters";
import Result from "./components/Result";
import Hangman from "./components/Hangman";
import Totals from "./components/Totals";

const wordUrl = "https://random-word-api.herokuapp.com/word?number=1&swear=0";
const totalChances = 9;

function App({ word }) {
  const transitionNode = React.useRef(null);
  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const hasWon = hasWonSelector(state);
  const hasLost = hasLostSelector(state);

  const getWord = React.useCallback(() => {
    dispatch(resetCreator());
    if (word) {
      dispatch(setupCreator(word.toLowerCase()));
    } else {
      return fetch(wordUrl)
        .then((res) => res.json())
        .then(([randomWord]) => {
          dispatch(setupCreator(randomWord.toLowerCase()));
        });
    }
  }, [word]);

  React.useEffect(() => {
    getWord();
  }, [getWord, word]);

  return (
    <Container>
      <Totals wins={state.totalWins} losses={state.totalLosses} />
      <Hangman missCount={state.missCount} />
      <Word answerArray={state.answerArray} letterMap={state.letterMap} />
      <Letters
        onGuess={(letter) => dispatch(guessCreator(letter))}
        letterMap={state.letterMap}
      />
      <Transition
        nodeRef={transitionNode}
        in={hasWon || hasLost}
        timeout={150}
        unmountOnExit
      >
        {(state) => (
          <Result transitionState={state} onReset={() => getWord()}>
            {hasWon ? <p>You won!</p> : <p>You lost, sorry</p>}
          </Result>
        )}
      </Transition>
    </Container>
  );
}

export default App;

const emptyLetterMap = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((acc, curr) => {
    return { ...acc, [curr]: 0 };
  }, {});
const initialState = {
  totalWins: 0,
  totalLosses: 0,
  missCount: 0,
  lettersLeft: -1,
  answerArray: [],
  letterMap: emptyLetterMap,
};

function gameReducer(state, action) {
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
        answerArray: action.payload.split(""),
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
      const isCorrect = state.answerArray.includes(letter);
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
}
function setupCreator(word) {
  return {
    type: "SETUP",
    payload: word,
  };
}
function guessCreator(letter) {
  return {
    type: "GUESS",
    payload: letter,
  };
}
function resetCreator() {
  return {
    type: "RESET",
  };
}
function hasWonSelector(state) {
  return state.lettersLeft === 0;
}
function hasLostSelector(state) {
  return totalChances - state.missCount === 0;
}
function unique(arr) {
  const set = new Set(arr);
  return [...set];
}

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 40px);
`;
