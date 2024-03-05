import { changeTodo } from "@/pages/api/todos";
import { Dispatch, SetStateAction, useState } from "react";

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
  const onDataChange = () => {
    setIsClickAwaiting((prevState) => ({ prevState, [todo._id]: true }));
    changeTodo({
      id: todo._id,
      todoData: { name: todo.name },
    }).finally(() => {
      setIsClickAwaiting((prevState) => ({
        prevState,
        [todo._id]: false,
      }));
    });
  };

  return (
    <>
      <button
        onClick={() => {
          onDataChange();
          onApplyNameVisible(false);
        }}
        disabled={isClickAwaiting[todo._id]}
      >
        {isClickAwaiting[todo._id] ? "loading..." : "Change todo name"}
      </button>
    </>
  );
};

export default ApplyTodoName;
