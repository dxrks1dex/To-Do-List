import { useQuery } from "react-query";

const fetchTodos = async () => {
  const response = await fetch("http://localhost:3000/todos");
  return await response.json();
};

const useTodos = () => {
  return useQuery(["todos"], () => fetchTodos());
};

export default useTodos;
