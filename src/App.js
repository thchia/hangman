import React from "react";

import Results from "./components/Results";

const wordUrl = "https://random-word-api.herokuapp.com/word?number=1&swear=0";

function App({ word }) {
  const [state, dispatch] = React.useReducer(gameReducer, initialState);

  React.useEffect(() => {
    if (word) {
      dispatch(setupCreator(word.toLowerCase()));
    } else {
      fetch(wordUrl)
        .then((res) => res.json())
        .then(([randomWord]) =>
          dispatch(setupCreator(randomWord.toLowerCase()))
        );
    }
  }, [word]);

  return (
    <div>
      <div>Totals</div>
      <div>Remaining chances</div>
      <Results answerArray={state.answerArray} letterMap={state.letterMap} />
      <div>Letter choices</div>
    </div>
  );
}

export default App;

const emptyLetterMap = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((acc, curr) => {
    return { ...acc, [curr]: 0 };
  }, {});
const initialState = {
  missCount: 0,
  lettersLeft: -1,
  answerArray: [],
  letterMap: emptyLetterMap,
};

function gameReducer(state, action) {
  switch (action.type) {
    case "SETUP":
      if (!action.payload) throw new Error("Word is required to setup game");
      return {
        missCount: 0,
        lettersLeft: action.payload.length,
        answerArray: action.payload.split(""),
        letterMap: emptyLetterMap,
      };
    case "GUESS":
      const letter = action.payload;
      if (!letter) throw new Error("You cannot perform an empty guess");
      const isGuessed = state.letterMap[letter] !== 0;
      if (isGuessed) return state;
      const isCorrect = state.answerArray.includes(letter);
      if (isCorrect) {
        return {
          ...state,
          lettersLeft: state.lettersLeft - 1,
          letterMap: {
            ...state.letterMap,
            [letter]: 1,
          },
        };
      } else {
        return {
          ...state,
          missCount: state.missCount + 1,
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
