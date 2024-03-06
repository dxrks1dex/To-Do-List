import RenderTodosForDate from "@/components/dateComponents/RenderTodosForDate";
import AddNewTodo from "@/components/toDo/todoOperations/AddNewTodo";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Task } from "@/components/toDo/todoList/TodoList";
import styled from "styled-components";
import { StyledTodoButton } from "@/components/styled/StyledButton";

interface Props {
  date: Date;
  todoId: string;
  todoCreatedDay: Date | null;
  groupedData: Record<string, Task[]>;
  isClickAwaiting: Record<number, boolean> | boolean;

  getTodoId: (id: string) => void;

  setTodoCreatedDay: Dispatch<SetStateAction<Date | null>>;
  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const DateContainer = ({
  groupedData,
  todoCreatedDay,
  getTodoId,
  todoId,
  isClickAwaiting,
  setIsClickAwaiting,
  date,
  setTodoCreatedDay,
}: Props) => {
  const [isTodoChangeFormVisible, setIsTodoChangeFormVisible] = useState(false);
  const [isTodoAddFormVisible, setIsTodoAddFormVisible] = useState(false);

  const dateRef = useRef(date);
  dateRef.current = date;

  useEffect(() => {
    if (
      todoCreatedDay &&
      todoCreatedDay.getTime() === dateRef.current.getTime()
    ) {
      setIsTodoAddFormVisible(true);
    }
  }, [todoCreatedDay]);

  const showTodoChangeForm = () => {
    setIsTodoChangeFormVisible(true);
  };

  return (
    <StyledDate onClick={showTodoChangeForm}>
      {groupedData[date.toISOString().split("T")[0]] ? (
        <RenderTodosForDate
          date={date}
          groupedData={groupedData}
          getTodoId={getTodoId}
          todoId={todoId}
          isTodoChangeFormVisible={isTodoChangeFormVisible}
          isClickAwaiting={isClickAwaiting}
          setIsClickAwaiting={setIsClickAwaiting}
        />
      ) : (
        <>No tasks for this date</>
      )}
      <StyledTodoButton onClick={() => setTodoCreatedDay(date)}>
        Add new todo
      </StyledTodoButton>

      <p>
        {isTodoAddFormVisible && (
          <AddNewTodo
            date={date}
            todoCreatedDay={todoCreatedDay}
            setIsClickAwaiting={setIsClickAwaiting}
            setIsTodoAddFormVisible={setIsTodoAddFormVisible}
          />
        )}
      </p>
    </StyledDate>
  );
};

export default DateContainer;

const StyledDate = styled.div`
  min-height: 100px;

  //background-color: red;
`;
