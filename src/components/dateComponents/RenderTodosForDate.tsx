import { Dispatch, SetStateAction, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import TodoInfo from "@/components/toDo/TodoInfo";
import { Task } from "@/components/toDo/todoList/TodoList";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";
import { StyledTodoButton } from "@/components/styled/StyledButton";

interface Props {
  date: Date;
  groupedData: Record<string, Task[]>;
  isTodoChangeFormVisible: boolean;
  getTodoId: (id: string) => void;
  todoId: string;
  isClickAwaiting: Record<number, boolean> | boolean;
  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const RenderTodosForDate = ({
  date,
  groupedData,
  isTodoChangeFormVisible,
  getTodoId,
  todoId,
  isClickAwaiting,
  setIsClickAwaiting,
}: Props) => {
  const [showTodoForm, setShowTodoForm] = useState(false);

  const dateStr = date.toISOString().split("T")[0];
  const tasks = groupedData[dateStr] || [];

  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setVisibleState: setShowTodoForm,
  });

  if (!date) return null;

  if (tasks.length === 0) {
    return null;
  }

  return (
    <>
      {tasks.map((task: Task) => (
        <div key={task._id}>
          {task.name}
          {task.completeStatus ? "✔️" : "❌"}
          <StyledTodoButton
            onClick={() => {
              setShowTodoForm(true);
              getTodoId(task._id);
            }}
          >
            Change Todo
          </StyledTodoButton>
          {showTodoForm && (
            <StyledTodoChangeForm
              $isTodoChangeFormVisible={isTodoChangeFormVisible}
              ref={wrapperRef}
            >
              <TodoInfo
                id={todoId}
                isClickAwaiting={isClickAwaiting}
                setIsClickAwaiting={setIsClickAwaiting}
              />
            </StyledTodoChangeForm>
          )}
        </div>
      ))}
    </>
  );
};

export default RenderTodosForDate;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledTodoChangeForm = styled.form<{ $isTodoChangeFormVisible: boolean }>`
  position: absolute;

  bottom: ${({ $isTodoChangeFormVisible }) =>
    $isTodoChangeFormVisible ? "20px" : "-100%"};

  left: 57%;
  top: 40%;

  height: 24rem;
  width: 40rem;

  background-color: #151f2e;
  color: #3480ea;

  border-radius: 5px;

  margin-top: 1%;

  animation: ${slideInAnimation} 0.5s ease;
`;
