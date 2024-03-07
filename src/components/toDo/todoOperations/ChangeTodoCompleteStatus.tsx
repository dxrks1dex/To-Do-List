import { changeTodo } from "@/pages/api/todos";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  todo: { _id: number; completeStatus: boolean };
}

const ChangeTodoCompleteStatus = ({ todo }: Props) => {
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
