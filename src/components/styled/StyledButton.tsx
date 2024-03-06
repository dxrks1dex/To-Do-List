import styled from "styled-components";

export const StyledTodoButton = styled.div`
  border-radius: 5px;

  border: 1px solid black;

  height: 20px;
  width: 70%;

  background-color: snow;

  margin-top: 5%;

  &:hover {
    transition: 0.4s;

    background-color: #537cc5;
    color: white;

    border: 1px solid #537cc5;
  }
`;
