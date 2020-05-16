import styled from "styled-components";

const Button = styled("button")`
  background-color: white;
  border: solid 1px black;
  border-radius: 4px;
  padding: 10px;
  min-width: 144px;
  box-shadow: 4px 4px;
  :active {
    box-shadow: 1px 1px;
  }
`;

export default Button;
