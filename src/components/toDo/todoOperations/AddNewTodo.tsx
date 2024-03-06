import { Dispatch, SetStateAction, useRef, useState } from "react";
import { createNewTodo } from "@/pages/api/todos";
import styled, { keyframes } from "styled-components";
import { StyledTodoButton } from "@/components/styled/StyledButton";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";
import { useMutation, useQueryClient } from "react-query";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";

interface Props {
  todoCreatedDay: Date | null;
  date: Date;

  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
  setIsTodoAddFormVisible: Dispatch<SetStateAction<boolean>>;
}

const AddNewTodo = ({
  setIsClickAwaiting,
  todoCreatedDay,
  date,
  setIsTodoAddFormVisible,
}: Props) => {
  const [todoName, setTodoName] = useState("");

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
    createdAt: todoCreatedDay,
  };

  const onAddNewTodo = () => {
    mutate({ todoData: newData });
  };

  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setVisibleState: setIsTodoAddFormVisible,
  });

  if (error) return <>Error: {error}</>;

  if (isLoading) return <LoaderSpinner />;

  return (
    <StyledAddNewTodoContainer ref={wrapperRef}>
      <>
        Create todo for day:
        {date.toLocaleString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </>
      <label htmlFor={"wrapperInput"}></label>
      <StyledTextarea
        name={"wrapperInput"}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <StyledAddNewTodoButton onClick={onAddNewTodo}>
        new to do
      </StyledAddNewTodoButton>
    </StyledAddNewTodoContainer>
  );
};

export default AddNewTodo;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledAddNewTodoContainer = styled.div`
  position: absolute;
  display: grid;

  width: 19.5%;
  height: 19%;

  animation: ${slideInAnimation} 0.5s ease;

  left: 80%;
  top: 10%;

  border: 1px solid;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  //overflow-y: auto;
  max-height: 20px;

  margin-right: 2%;
  margin-left: 2%;
`;

const StyledAddNewTodoButton = styled(StyledTodoButton)`
  margin-right: 2%;
  margin-left: 2%;
`;
