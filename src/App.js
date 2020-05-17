import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import * as Game from "./hooks/useGame";
import Word from "./components/Word";
import Letters from "./components/Letters";
import Result from "./components/Result";
import Hangman from "./components/Hangman";
import Totals from "./components/Totals";

const wordUrl = "https://random-word-api.herokuapp.com/word?number=1&swear=0";

function App({ word }) {
  const transitionNode = React.useRef(null);
  const [isFetchingWord, setIsFetchingWord] = React.useState(false);
  const [fetchError, setFetchError] = React.useState("");
  const [state, dispatch] = Game.useGame();
  const hasWon = Game.hasWonSelector(state);
  const hasLost = Game.hasLostSelector(state);

  const getWord = React.useCallback(() => {
    dispatch(Game.resetCreator());
    if (word) {
      dispatch(Game.setupCreator(word.toLowerCase()));
    } else {
      setIsFetchingWord(true);
      setFetchError("");
      return fetch(wordUrl)
        .then((res) => res.json())
        .then(([randomWord]) => {
          dispatch(Game.setupCreator(randomWord.toLowerCase()));
        })
        .catch(() => {
          setFetchError("Could not fetch word. Please refresh to retry.");
        })
        .finally(() => {
          setIsFetchingWord(false);
        });
    }
  }, [word, dispatch]);

  React.useEffect(() => {
    getWord();
  }, [getWord, word]);

  return (
    <Container>
      <Totals wins={state.totalWins} losses={state.totalLosses} />
      <Hangman missCount={state.missCount} />
      {fetchError}
      {isFetchingWord ? (
        "Getting a word..."
      ) : (
        <Word answerData={state.answerData} letterMap={state.letterMap} />
      )}
      <Letters
        disabled={isFetchingWord}
        onGuess={(letter) => dispatch(Game.guessCreator(letter))}
        letterMap={state.letterMap}
      />
      <Transition
        nodeRef={transitionNode}
        in={hasWon || hasLost}
        timeout={150}
        unmountOnExit
      >
        {(transitionState) => (
          <Result
            transitionState={transitionState}
            onReset={() => getWord()}
            answer={state.answerData.join("")}
          >
            {hasWon ? "You won!" : "You lost, sorry"}
          </Result>
        )}
      </Transition>
    </Container>
  );
}

export default App;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 40px);
`;
