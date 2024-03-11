import { DATA_SOURCE_URL } from "../../../DATA_SOURCE_URL";

interface Props {
  id?: number;
  todoData?: {
    name?: string;
    completeStatus?: boolean;
    createdAt?: Date | null;
  };
}

export const createNewTodo = async ({ todoData }: Props) => {
  const response = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Error("Failed to create new todo");
  }

  return response.json();
};

export const changeTodo = async ({ todoData, id }: Props) => {
  const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const deleteTodo = async ({ id }: Props) => {
  const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
