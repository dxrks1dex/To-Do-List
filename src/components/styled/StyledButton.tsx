import styled from "styled-components";

export const StyledTodoButton = styled.div`
  border-radius: 5px;

  border: 1px solid black;

  height: 20px;
  width: 70%;

  color: black;

  background-color: snow;

  margin-top: 5%;

  &:hover {
    transition: 0.4s;

    background-color: #c7a2b2;
    color: white;

    border: 1px solid #537cc5;

    box-shadow: 3px 3px 23px 3px rgba(145, 145, 145, 1);
  }
`;

export const StyledChangeTodoButtons = styled(StyledTodoButton)<{
  disabled?: boolean;
}>`
  width: 50%;

  padding-left: 10px;

  cursor: pointer;
  margin-top: 2%;

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5; 
    cursor: not-allowed;
  `}

  &:hover {
    border: 1px solid snow;
  }
`;
