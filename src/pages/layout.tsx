import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import TodoList from "@/components/toDo/todoList/TodoList";
import { TodoContextWrapper } from "@/hooks/context/useTodoContext";

export const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TodoContextWrapper>{children}</TodoContextWrapper>
      </QueryClientProvider>
    </>
  );
}
