import RenderTodosForDate from "@/components/dateComponents/RenderTodosForDate";
import AddNewTodo from "@/components/toDo/todoOperations/AddNewTodo";
import { Dispatch, SetStateAction, useState } from "react";
import { Task } from "@/components/toDo/todoList/TodoList";

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

  const showTodoChangeForm = () => {
    setIsTodoChangeFormVisible(true);
  };

  return (
    <div style={{ minHeight: 100 }} onClick={showTodoChangeForm}>
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
      <button onClick={() => setTodoCreatedDay(date)}>Add new todo</button>

      <p>
        {todoCreatedDay && todoCreatedDay.getTime() === date.getTime() && (
          <AddNewTodo
            todoCreatedDay={todoCreatedDay}
            setIsClickAwaiting={setIsClickAwaiting}
          />
        )}
      </p>
    </div>
  );
};

export default DateContainer;
