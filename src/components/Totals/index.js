import React from "react";
import styled from "styled-components";

function Totals({ wins, losses }) {
  return (
    <Container>
      <p>Total Wins: {wins}</p>
      <p>Total Losses: {losses}</p>
    </Container>
  );
}

export default Totals;

const Container = styled("div")`
  width: calc(100% - 100px);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 1.2rem;
`;
