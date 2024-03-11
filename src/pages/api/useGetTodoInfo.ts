import { useQuery } from "react-query";
import { DATA_SOURCE_URL } from "../../../DATA_SOURCE_URL";

interface Props {
  _id: string;
}

const fetchTodos = async ({ _id }: Props) => {
  const response = await fetch(`${DATA_SOURCE_URL}/${_id}`);
  return await response.json();
};

const useGetTodoInfo = ({ _id }: Props) => {
  return useQuery(["todo", _id], () => fetchTodos({ _id }));
};

export default useGetTodoInfo;
