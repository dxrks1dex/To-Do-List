import { useRef, useState } from "react";
import useTodos from "@/pages/api/useTodos";
import Calendar from "react-calendar";
import DayContainer from "@/components/dateComponents/DayContainer";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import styled from "styled-components";
import { groupTasksByDate } from "@/components/groupeData/groupTasksByDate";

export type Task = {
  _id: string;
  name: string;
  completeStatus: boolean;
  createdAt: string;
};

const TodoList = () => {
  const { data, isLoading, isFetching } = useTodos();

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  if (isLoading) return <LoaderSpinner />;

  const groupedData = groupTasksByDate({ data });

  return (
    <>
      <StyledCalendar>
        <Calendar
          locale={"en"}
          tileContent={({ date }) => (
            <DayContainer groupedData={groupedData} date={date} />
          )}
        />
      </StyledCalendar>
    </>
  );
};

export default TodoList;

const StyledCalendar = styled.div`
  background-color: #3480ea;

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
