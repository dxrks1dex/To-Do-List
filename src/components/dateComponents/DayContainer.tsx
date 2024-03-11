import TodosForDay from "@/components/dateComponents/TodosForDay";
import { Task } from "@/components/toDo/todoList/TodoList";
import styled from "styled-components";
import { StyledTodoButton } from "@/components/styled/StyledButton";
import { useRouter } from "next/router";
import { useTodoContext } from "@/hooks/context/useTodoContext";
import { dateFormat } from "@/utilits/dateFormat";

interface Props {
  date: Date;
  groupedData: Record<string, Task[]>;
}

const DayContainer = ({ groupedData, date }: Props) => {
  const {
    operations: { setIsTodoOptionVisible, setTodoDay },
  } = useTodoContext();

  const router = useRouter();

  const queryParams = `/query/addNewTodo/${dateFormat({ date: date })}`;

  const isTodoOnDay = groupedData[date?.toISOString().split("T")[0]];

  return (
    <StyledDate onClick={() => setIsTodoOptionVisible(true)}>
      {isTodoOnDay ? (
        <TodosForDay date={date} groupedData={groupedData} />
      ) : (
        <>No tasks for this date</>
      )}
      <StyledTodoButton
        onClick={() => {
          setTodoDay(date);
          router.push(queryParams);
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
