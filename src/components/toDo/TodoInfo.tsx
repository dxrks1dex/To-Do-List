import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ChangeTodoCompleteStatus from "@/components/toDo/todoOperations/ChangeTodoCompleteStatus";
import DeleteTodo from "@/components/toDo/todoOperations/DeleteTodo";
import ChangeTodoName from "@/components/toDo/todoOperations/ChangeTodoName";
import useGetTodoInfo from "@/pages/api/useGetTodoInfo";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";

interface Props {
  id: string;
  isClickAwaiting: Record<number, boolean> | boolean;

  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const TodoInfo = ({ id, isClickAwaiting, setIsClickAwaiting }: Props) => {
  const { data, isLoading, error, refetch, isFetching } = useGetTodoInfo({
    _id: id,
  });

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  useEffect(() => {
    if (!isFetchingRef.current) {
      refetch();
    }
  }, [isClickAwaiting, refetch]);

  if (error) return <>Error: {error}</>;

  if (isLoading) return <LoaderSpinner />;

  return (
    <div>
      <h1>Todo Details</h1>
      {data && (
        <p key={data._id}>
          {data.name}
          <ChangeTodoCompleteStatus
            isClickAwaiting={isClickAwaiting}
            setIsClickAwaiting={setIsClickAwaiting}
            todo={data}
          />
          {data.completeStatus ? "✔️" : "❌"}
          <DeleteTodo
            todo={data}
            isClickAwaiting={isClickAwaiting}
            setIsClickAwaiting={setIsClickAwaiting}
          />
          <ChangeTodoName
            setIsClickAwaiting={setIsClickAwaiting}
            todo={data}
            isClickAwaiting={isClickAwaiting}
          />
        </p>
      )}
    </div>
  );
};

export default TodoInfo;
