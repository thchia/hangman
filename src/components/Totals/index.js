import React from "react";
import styled from "styled-components";

import { devices } from "../../styles/medias";

function Totals({ wins, losses }) {
  return (
    <Container>
      <Paragraph>Total Wins: {wins}</Paragraph>
      <Paragraph>Total Losses: {losses}</Paragraph>
    </Container>
  );
}

export default Totals;

const Container = styled("div")`
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 1.2rem;
  @media ${devices.tablet} {
    width: calc(100% - 100px);
  }
`;
const Paragraph = styled("p")`
  margin: 10px 0px;
`;
