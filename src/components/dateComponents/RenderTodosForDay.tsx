import { Task } from "@/components/toDo/todoList/TodoList";
import { StyledTodoButton } from "@/components/styled/StyledButton";
import { useRouter } from "next/router";
import { useTodoContext } from "@/hooks/context/useTodoContext";

interface Props {
  date: Date;
  groupedData: Record<string, Task[]>;
}

const RenderTodosForDay = ({ date, groupedData }: Props) => {
  const {
    operations: { setIsTodoOptionVisible, setTodoDay },
  } = useTodoContext();

  const { push } = useRouter();

  const dateStr = date.toISOString().split("T")[0];
  const tasks = groupedData[dateStr] || [];

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
              setIsTodoOptionVisible(true);
              setTodoDay(date);
              push(`/query/changetodo/${task._id}`);
            }}
          >
            Change Todo
          </StyledTodoButton>
        </div>
      ))}
    </>
  );
};

export default RenderTodosForDay;
