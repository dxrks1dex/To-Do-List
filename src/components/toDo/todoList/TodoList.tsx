import { useEffect, useRef, useState } from "react";
import useTodos from "@/pages/api/useTodos";
import Calendar from "react-calendar";
import DateContainer from "@/components/dateComponents/DateContainer";

export type Task = {
  _id: string;
  name: string;
  completeStatus: boolean;
  createdAt: string;
};

const TodoList = () => {
  const [isClickAwaiting, setIsClickAwaiting] = useState<
    Record<number, boolean> | boolean
  >({});
  const [todoId, setTodoId] = useState("");
  const [todoCreatedDay, setTodoCreatedDay] = useState<Date | null>(null);

  const { data, refetch, isLoading, isFetching } = useTodos();

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  useEffect(() => {
    if (!isFetchingRef.current) {
      refetch();
    }
  }, [isClickAwaiting, refetch]);

  const getTodoId = (id: string) => {
    setTodoId(id);
  };

  if (isLoading) return <>Loading...</>;

  const groupedData: Record<string, Task[]> = {};
  data.forEach((task: Task) => {
    const date = task.createdAt.split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(task);
  });

  return (
    <>
      <div>
        <Calendar
          locale={"en"}
          tileContent={({ date }) => (
            <DateContainer
              groupedData={groupedData}
              todoCreatedDay={todoCreatedDay}
              getTodoId={getTodoId}
              todoId={todoId}
              isClickAwaiting={isClickAwaiting}
              setIsClickAwaiting={setIsClickAwaiting}
              date={date}
              setTodoCreatedDay={setTodoCreatedDay}
            />
          )}
        />
      </div>
    </>
  );
};

export default TodoList;
