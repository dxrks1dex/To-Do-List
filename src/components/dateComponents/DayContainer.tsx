import RenderTodosForDay from "@/components/dateComponents/RenderTodosForDay";
import { Task } from "@/components/toDo/todoList/TodoList";
import styled from "styled-components";
import { StyledTodoButton } from "@/components/styled/StyledButton";
import { useRouter } from "next/router";
import { useTodoContext } from "@/hooks/context/useTodoContext";
import { dateFormat } from "@/components/dateComponents/dateFormat";

interface Props {
  date: Date;
  groupedData: Record<string, Task[]>;
}

const DayContainer = ({ groupedData, date }: Props) => {
  const {
    operations: { setIsTodoOptionVisible, setTodoDay },
  } = useTodoContext();

  const { push } = useRouter();

  const queryParams = `/query/addnewtodo/${dateFormat({ date: date })}`;

  const isTodoOnDay = groupedData[date?.toISOString().split("T")[0]];

  return (
    <StyledDate onClick={() => setIsTodoOptionVisible(true)}>
      {isTodoOnDay ? (
        <RenderTodosForDay date={date} groupedData={groupedData} />
      ) : (
        <>No tasks for this date</>
      )}
      <StyledTodoButton
        onClick={() => {
          setTodoDay(date);
          push(queryParams);
        }}
      >
        Add new todo
      </StyledTodoButton>
    </StyledDate>
  );
};

export default DayContainer;

const StyledDate = styled.div`
  min-height: 100px;
`;
