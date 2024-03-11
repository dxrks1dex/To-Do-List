import { useQuery } from "react-query";
import { DATA_SOURCE_URL } from "../../../DATA_SOURCE_URL";

const fetchTodos = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}`);
  return await response.json();
};

const useTodos = () => {
  return useQuery(["todos"], () => fetchTodos());
};

export default useTodos;
