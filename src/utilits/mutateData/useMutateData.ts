import { useMutation, useQueryClient } from "react-query";

interface Props {
  todo: { _id?: number; completeStatus?: boolean; name?: string };
  fn: ({}) => Promise<void>;
}

export const useMutateData = ({ fn, todo }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(fn);

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

  return { onDataChange, isLoading, error };
};
