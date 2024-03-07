import { changeTodo } from "@/pages/api/todos";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  todo: { _id: number; name: string };

  onApplyNameVisible: (value: boolean) => void;
}

const ApplyTodoName = ({
  todo,

  onApplyNameVisible,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(changeTodo, {
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
      todoData: { name: todo.name },
    });
  };

  return (
    <>
      <button
        onClick={() => {
          onDataChange();
          onApplyNameVisible(false);
        }}
        disabled={isLoading}
      >
        {isLoading ? <LoaderSpinner /> : "Change todo name"}
      </button>
    </>
  );
};

export default ApplyTodoName;
