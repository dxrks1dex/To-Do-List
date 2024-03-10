import { deleteTodo } from "@/pages/api/todos";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";
import { StyledChangeTodoButtons } from "@/components/styled/StyledButton";
import { useRouter } from "next/router";

interface Props {
  todo: { _id: number; completeStatus: boolean };
}

const DeleteTodo = ({ todo }: Props) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isLoading } = useMutation(deleteTodo, {
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

    push("/");
  };

  return (
    <StyledChangeTodoButtons onClick={onDataChange} disabled={isLoading}>
      {isLoading ? <LoaderSpinner /> : "Delete todo"}
    </StyledChangeTodoButtons>
  );
};

export default DeleteTodo;
