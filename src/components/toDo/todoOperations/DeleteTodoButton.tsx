import { deleteTodo } from "@/pages/api/todos";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";
import { StyledChangeTodoButtons } from "@/components/styled/StyledButton";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface Props {
  todo: { _id: number; completeStatus: boolean };
  isTodoDelete: boolean;

  setIsTodoDelete: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodoButton = ({ todo, isTodoDelete, setIsTodoDelete }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(deleteTodo);

  const onDeleteTodo = () => {
    setIsTodoDelete(true);

    mutate(
      {
        id: todo._id,
        todoData: { completeStatus: !todo.completeStatus },
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries([`todo`]);
          queryClient.refetchQueries([`todos`]);

          router.push("/");
          setIsTodoDelete(false);
        },
        onError: (error) => {
          console.error("Error of POST-request:", error);

          setIsTodoDelete(false);
        },
      },
    );
  };

  return (
    <StyledChangeTodoButtons
      onClick={onDeleteTodo}
      disabled={isLoading || isTodoDelete}
    >
      {isLoading ? <LoaderSpinner /> : "Delete todo"}
    </StyledChangeTodoButtons>
  );
};

export default DeleteTodoButton;
