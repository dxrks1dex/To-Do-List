import { useQuery } from "react-query";

interface Props {
  _id: string;
}

const fetchTodos = async ({ _id }: Props) => {
  const response = await fetch(`http://localhost:3000/todos/${_id}`);
  return await response.json();
};

const useGetTodoInfo = ({ _id }: Props) => {
  return useQuery(["todo", _id], () => fetchTodos({ _id }));
};

export default useGetTodoInfo;
