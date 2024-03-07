import { Task } from "@/components/toDo/todoList/TodoList";

interface Props<T> {
  data: Task[] | undefined;
}

export const groupTasksByDate = ({
  data,
}: Props<Task>): Record<string, Task[]> => {
  const groupedData: Record<string, Task[]> = {};
  data?.forEach((task: Task) => {
    const date = task.createdAt.split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(task);
  });

  return groupedData;
};
