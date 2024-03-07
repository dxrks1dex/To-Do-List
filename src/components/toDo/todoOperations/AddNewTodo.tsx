import { useState } from "react";
import { createNewTodo } from "@/pages/api/todos";
import styled from "styled-components";
import { StyledTodoButton } from "@/components/styled/StyledButton";
import { useMutation, useQueryClient } from "react-query";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { dateFormat } from "@/components/dateComponents/dateFormat";
import { useTodoContext } from "@/hooks/context/useTodoContext";

const AddNewTodo = () => {
  const [todoName, setTodoName] = useState("");
  const {
    data: { todoDay },
  } = useTodoContext();

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(createNewTodo, {
    onSuccess: () => {
      setTodoName("");
      queryClient.refetchQueries(["todos"]);
    },
    onError: (error) => {
      console.error("Error of POST-request:", error);
    },
  });

  const newData = {
    name: todoName,
    completeStatus: false,
    createdAt: todoDay,
  };

  const onAddNewTodo = () => {
    mutate({ todoData: newData });
  };

  if (error) return <>Error: {error}</>;

  if (isLoading) return <LoaderSpinner />;

  return (
    <>
      <div>
        Create todo for day:
        {dateFormat({ date: todoDay })}
      </div>
      <label htmlFor={"wrapperInput"}></label>
      <StyledTextarea
        name={"wrapperInput"}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <StyledAddNewTodoButton
        onClick={() => {
          onAddNewTodo();
        }}
      >
        new to do
      </StyledAddNewTodoButton>
    </>
  );
};

export default AddNewTodo;

const StyledTextarea = styled.textarea`
  resize: none;
  //overflow-y: auto;
  max-height: 20px;

  margin-right: 2%;
  margin-left: 2%;

  border-radius: 5px;
`;

const StyledAddNewTodoButton = styled(StyledTodoButton)`
  margin-right: 2%;
  margin-left: 2%;
`;
