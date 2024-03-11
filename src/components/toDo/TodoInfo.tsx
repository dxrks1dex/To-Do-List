import { useEffect, useRef, useState } from "react";
import ChangeTodoCompleteStatusButton from "@/components/toDo/todoOperations/ChangeTodoCompleteStatusButton";
import DeleteTodoButton from "@/components/toDo/todoOperations/DeleteTodoButton";
import ChangeTodoNameButton from "@/components/toDo/todoOperations/ChangeTodoNameButton";
import useGetTodoInfo from "@/pages/api/useGetTodoInfo";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useTodoContext } from "@/hooks/context/useTodoContext";
import { dateFormat } from "@/utilits/dateFormat";

interface Props {
  id: string;
}

const TodoInfo = ({ id }: Props) => {
  const [isTodoDelete, setIsTodoDelete] = useState(false);
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
          <ChangeTodoCompleteStatusButton
            todo={data}
            isTodoDelete={isTodoDelete}
          />
          <ChangeTodoNameButton todo={data} isTodoDelete={isTodoDelete} />
          <DeleteTodoButton
            todo={data}
            isTodoDelete={isTodoDelete}
            setIsTodoDelete={setIsTodoDelete}
          />
        </p>
      )}
    </div>
  );
};

export default TodoInfo;
