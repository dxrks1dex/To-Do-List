import { Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";
import TodoInfo from "@/components/toDo/TodoInfo";
import { Task } from "@/components/toDo/todoList/TodoList";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";

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
        <p key={task._id}>
          {task.completeStatus ? "✔️" : "❌"}
          {task.name}
          <button
            onClick={() => {
              setShowTodoForm(true);
              getTodoId(task._id);
            }}
          >
            Change Todo
          </button>
          {showTodoForm && (
            <TodoChangeForm
              $isTodoChangeFormVisible={isTodoChangeFormVisible}
              ref={wrapperRef}
            >
              <TodoInfo
                id={todoId}
                isClickAwaiting={isClickAwaiting}
                setIsClickAwaiting={setIsClickAwaiting}
              />
            </TodoChangeForm>
          )}
        </p>
      ))}
    </>
  );
};

export default RenderTodosForDate;

const TodoChangeForm = styled.form<{ $isTodoChangeFormVisible: boolean }>`
  position: fixed;
  bottom: ${({ $isTodoChangeFormVisible }) =>
    $isTodoChangeFormVisible ? "20px" : "-100%"};
  left: 50%;
  transform: translateX(-50%);
  height: 24rem;
  width: 40rem;
  background-color: #151f2e;
  color: #3480ea;
  border-radius: 5px;
  margin-top: 1%;
  transition: bottom 0.3s ease;
`;
