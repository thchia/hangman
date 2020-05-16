import React from "react";
import styled from "styled-components";

function Guess({ isGuessed, children }) {
  return <Container>{isGuessed ? children : null}</Container>;
}

export default Guess;

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  margin: 25px;
  border-bottom: solid 2px black;
`;
