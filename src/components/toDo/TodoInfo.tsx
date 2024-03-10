import { useEffect, useRef } from "react";
import ChangeTodoCompleteStatus from "@/components/toDo/todoOperations/ChangeTodoCompleteStatus";
import DeleteTodo from "@/components/toDo/todoOperations/DeleteTodo";
import ChangeTodoName from "@/components/toDo/todoOperations/ChangeTodoName";
import useGetTodoInfo from "@/pages/api/useGetTodoInfo";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useTodoContext } from "@/hooks/context/useTodoContext";
import { dateFormat } from "@/components/dateComponents/dateFormat";

interface Props {
  id: string;
}

const TodoInfo = ({ id }: Props) => {
  const { data, isLoading, error, refetch, isFetching } = useGetTodoInfo({
    _id: id,
  });

  const {
    data: { todoDay },
  } = useTodoContext();

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  useEffect(() => {
    if (!isFetchingRef.current) {
      refetch();
    }
  }, [refetch]);

  if (error) return <>Error: {error}</>;

  if (isLoading) return <LoaderSpinner />;
  return (
    <div>
      <>Change todo for date: {dateFormat({ date: todoDay })}</>
      {data && (
        <p key={data._id}>
          {data.name}
          {data.completeStatus ? "✔️" : "❌"}
          <ChangeTodoCompleteStatus todo={data} />
          <ChangeTodoName todo={data} />
          <DeleteTodo todo={data} />
        </p>
      )}
    </div>
  );
};

export default TodoInfo;
