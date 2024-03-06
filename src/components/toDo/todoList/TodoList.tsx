import { useEffect, useRef, useState } from "react";
import useTodos from "@/pages/api/useTodos";
import Calendar from "react-calendar";
import DateContainer from "@/components/dateComponents/DateContainer";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import styled from "styled-components";

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

  if (isLoading) return <LoaderSpinner />;

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
      <StyledCalendar>
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
      </StyledCalendar>
    </>
  );
};

export default TodoList;

const StyledCalendar = styled.div`
  background-color: black;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 80%;
  width: 80%;

  button {
    border: 1px solid;
    text-decoration: none;

    &:hover {
      transition: 0.4s;
      background-color: snow;
    }
  }
`;
