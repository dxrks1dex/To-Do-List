import { Dispatch, SetStateAction } from "react";
import { deleteTodo } from "@/pages/api/todos";

interface Props {
  todo: { _id: number; completeStatus: boolean };
  isClickAwaiting: Record<number, boolean> | boolean;
  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const DeleteTodo = ({ todo, setIsClickAwaiting, isClickAwaiting }: Props) => {
  const onDataChange = () => {
    setIsClickAwaiting((prevState) => ({ prevState, [todo._id]: true }));
    deleteTodo({
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
      {isClickAwaiting[todo._id] ? "deleting..." : "Delete todo"}
    </button>
  );
};

export default DeleteTodo;
