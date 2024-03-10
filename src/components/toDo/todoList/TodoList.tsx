import { useRef, useState } from "react";
import useTodos from "@/pages/api/useTodos";
import Calendar from "react-calendar";
import DayContainer from "@/components/dateComponents/DayContainer";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import styled from "styled-components";
import { groupTasksByDate } from "@/components/groupeData/groupTasksByDate";
import { useRouter } from "next/router";
import { isToday } from "@/components/dateComponents/isToday";

export type Task = {
  _id: string;
  name: string;
  completeStatus: boolean;
  createdAt: string;
};

const TodoList = () => {
  const { data, isLoading, isFetching } = useTodos();
  const { push } = useRouter();

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  if (isLoading) return <LoaderSpinner />;

  const groupedData = groupTasksByDate({ data });

  return (
    <>
      <StyledCalendar>
        <Calendar
          onClickMonth={(date) => push(`/query/mouth/${date.getMonth()}`)}
          locale={"en"}
          tileContent={({ date }) => (
            <DayContainer groupedData={groupedData} date={date} />
          )}
          tileClassName={({ date }) => (isToday({ date }) ? "today" : "")}
        />
      </StyledCalendar>
    </>
  );
};

export default TodoList;

const StyledCalendar = styled.div`
  background-color: #8ba0b2;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 80%;
  width: 80%;

  .react-calendar {
    font-family: Arial, sans-serif;

    button {
      background-color: #537cc5;
      border: 1px solid #383738;

      color: snow;

      padding: 10px;
      //margin: 0.1px;

      cursor: pointer;
      width: calc(100% / 5);

      &:hover {
        transition: 0.4s;
        background-color: #3e5a99;
      }
    }

    .today {
      background-color: #c7a2b2;
    }

    .react-calendar__month-view {
      .react-calendar__month-view__weekdays__weekday {
        abbr {
          text-decoration: none;
          color: white;
        }
      }
    }
  }
`;
