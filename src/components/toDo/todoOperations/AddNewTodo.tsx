import { Dispatch, SetStateAction, useState } from "react";
import { createNewTodo } from "@/pages/api/todos";
import styled, { keyframes } from "styled-components";

interface Props {
  todoCreatedDay: Date | null;

  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const AddNewTodo = ({ setIsClickAwaiting, todoCreatedDay }: Props) => {
  const [todoName, setTodoName] = useState("");

  const onAddNewTodo = () => {
    setIsClickAwaiting(true);
    createNewTodo({ todoData: newData }).finally(() => {
      setIsClickAwaiting(false);
    });
    setTodoName("");
  };

  const newData = {
    name: todoName,
    completeStatus: false,
    createdAt: todoCreatedDay,
  };

  return (
    <StyledAddNewTodoContainer>
      <input
        value={todoName}
        placeholder={"name"}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <button onClick={onAddNewTodo}>new to do</button>
    </StyledAddNewTodoContainer>
  );
};

export default AddNewTodo;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledAddNewTodoContainer = styled.div`
  display: flex;

  width: 65%;
  animation: ${slideInAnimation} 0.5s ease;
`;
