import { changeTodo } from "@/pages/api/todos";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";
import { StyledChangeTodoButtons } from "@/components/styled/StyledButton";

interface Props {
  todo: { _id: number; completeStatus: boolean };
  isTodoDelete: boolean;
}

const ChangeTodoCompleteStatusButton = ({ todo, isTodoDelete }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(changeTodo);
  const onDataChange = () => {
    mutate(
      {
        id: todo._id,
        todoData: { completeStatus: !todo.completeStatus },
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries([`todo`]);
          queryClient.refetchQueries([`todos`]);
        },
        onError: (error) => {
          console.error("Error of POST-request:", error);
        },
      },
    );
  };

  if (error) <>Error: {error}</>;

  return (
    <StyledChangeTodoButtons
      onClick={onDataChange}
      disabled={isLoading || isTodoDelete}
    >
      {isLoading ? <LoaderSpinner /> : "Change todo status"}
    </StyledChangeTodoButtons>
  );
};

export default ChangeTodoCompleteStatusButton;
