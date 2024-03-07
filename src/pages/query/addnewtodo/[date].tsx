import styled, { keyframes } from "styled-components";
import { useTodoContext } from "@/hooks/context/useTodoContext";
import AddNewTodo from "@/components/toDo/todoOperations/AddNewTodo";
import { ReactElement, useRef } from "react";
import TodoOperationsLayout from "@/pages/query/layout";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";

const AddNewTodoPage = () => {
  const {
    operations: { setIsTodoOptionVisible },
  } = useTodoContext();

  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setVisibleState: setIsTodoOptionVisible,
  });

  return (
    <StyledTodoChangeForm ref={wrapperRef}>
      <AddNewTodo />
    </StyledTodoChangeForm>
  );
};

export default AddNewTodoPage;

AddNewTodoPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <TodoOperationsLayout>
      <>{page}</>
    </TodoOperationsLayout>
  );
};

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledTodoChangeForm = styled.div`
  position: fixed;
  display: grid;

  width: 19.5%;
  height: 19%;

  animation: ${slideInAnimation} 0.5s ease;

  left: 80%;
  top: 10%;
  right: 0;

  border: 1px solid;
  border-radius: 5px;
`;
