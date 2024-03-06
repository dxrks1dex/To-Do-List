import { changeTodo, createNewTodo } from "@/pages/api/todos";
import { Dispatch, SetStateAction } from "react";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { QueryClient, useMutation, useQueryClient } from "react-query";

interface Props {
  todo: { _id: number; completeStatus: boolean };
  isClickAwaiting: Record<number, boolean> | boolean;
  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const ChangeTodoCompleteStatus = ({
  todo,
  setIsClickAwaiting,
  isClickAwaiting,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(changeTodo, {
    onSuccess: () => {
      queryClient.refetchQueries([`todo`]);
      queryClient.refetchQueries([`todos`]);
    },
    onError: (error) => {
      console.error("Error of POST-request:", error);
    },
  });
  const onDataChange = () => {
    mutate({
      id: todo._id,
      todoData: { completeStatus: !todo.completeStatus },
    });
  };

  if (error) <>Error: {error}</>;

  return (
    <button onClick={onDataChange} disabled={isLoading}>
      {isLoading ? <LoaderSpinner /> : "Change todo status"}
    </button>
  );
};

export default ChangeTodoCompleteStatus;
