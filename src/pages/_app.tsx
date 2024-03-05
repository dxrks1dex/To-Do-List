import "@/styles/globals.css";
import TodoList from "@/components/toDo/todoList/TodoList";
import Layout from "@/pages/layout";

export default function App() {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
}
