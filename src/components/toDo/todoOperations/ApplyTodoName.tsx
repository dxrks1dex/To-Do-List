import { changeTodo } from "@/pages/api/todos";
import { Dispatch, SetStateAction, useState } from "react";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  todo: { _id: number; name: string };
  isClickAwaiting: Record<number, boolean> | boolean;

  onApplyNameVisible: (value: boolean) => void;

  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const ApplyTodoName = ({
  todo,
  setIsClickAwaiting,
  isClickAwaiting,
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
