import React from "react";
import styled, { css, keyframes } from "styled-components";

function Hangman({ missCount }) {
  React.useEffect(() => {
    if (missCount > 9) {
      console.warn(
        "This configuration does not support more than 9 wrong choices"
      );
    }
  }, [missCount]);
  return (
    <svg viewBox="0 0 100 100" width="40%" xmlns="http://www.w3.org/2000/svg">
      <g id="person" stroke="black" fill="none" transform="translate(40 20)">
        {[
          <Circle
            key="head"
            title="head"
            cx="10"
            cy="10"
            r="10"
            strokeLength={65}
          />,
          <Path key="body" title="body" d="M 10 20 v 30" strokeLength={30} />,
          <Path key="arms" title="arms" d="M -5 30 h 30" strokeLength={30} />,
          <Path
            key="right-leg"
            title="right-leg"
            d="M 10 50 l 15 15"
            strokeLength={22}
          />,
          <Path
            key="left-leg"
            title="left-leg"
            d="M 10 50 l -15 15"
            strokeLength={22}
          />,
        ].slice(0, missCount)}
      </g>
      <g id="gallows" stroke="black" fill="none">
        {[
          <Path key="noose" title="noose" d="M 50 0 v 20" strokeLength={20} />,
          <Path
            key="gallows-top"
            title="gallows-top"
            d="M 50 0.5 h 30"
            strokeLength={30}
          />,
          <Path
            key="gallows-height"
            title="gallows-height"
            d="M 80 0 v 100"
            strokeLength={100}
          />,
          <Path
            key="gallows-floor"
            title="gallows-floor"
            d="M 90 99.5 h -70"
            strokeLength={70}
          />,
        ].slice(0, Math.max(missCount - 5, 0))}
      </g>
    </svg>
  );
}

export default Hangman;

const drawKf = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;
const draw = css`
  stroke-dasharray: ${(p) => p.strokeLength};
  stroke-dashoffset: ${(p) => p.strokeLength};
  animation: ${drawKf} 1s ease-in-out forwards;
`;
const Path = styled("path")`
  ${draw};
`;
const Circle = styled("circle")`
  ${draw};
`;
