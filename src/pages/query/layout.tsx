import { ReactNode } from "react";
import TodoList from "@/components/toDo/todoList/TodoList";
import { TodoContextWrapper } from "@/hooks/context/useTodoContext";

export default function TodoOperationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TodoList />
      {children}
    </>
  );
}
