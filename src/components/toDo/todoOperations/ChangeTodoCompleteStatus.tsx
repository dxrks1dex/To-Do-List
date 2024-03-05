import { changeTodo } from "@/pages/api/todos";
import { Dispatch, SetStateAction } from "react";

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
  const onDataChange = () => {
    setIsClickAwaiting((prevState) => ({ prevState, [todo._id]: true }));

    changeTodo({
      id: todo._id,
      todoData: { completeStatus: !todo.completeStatus },
    }).finally(() =>
      setIsClickAwaiting((prevState) => ({
        prevState,
        [todo._id]: false,
      })),
    );
  };

  return (
    <button onClick={onDataChange} disabled={isClickAwaiting[todo._id]}>
      {isClickAwaiting[todo._id] ? "loading..." : "Change todo status"}
    </button>
  );
};

export default ChangeTodoCompleteStatus;
