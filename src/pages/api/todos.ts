interface Props {
  id?: number;
  todoData?: {
    name?: string;
    completeStatus?: boolean;
    createdAt?: Date | null;
  };
}

const DATA_SOURCE_URL = "http://localhost:3000/todos";

export const createNewTodo = async ({ todoData }: Props) => {
  await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  })
    .then((response) => response.json())
    .then((createdEntity) => {
      console.log("New entity:", createdEntity);
    })
    .catch((error) => {
      console.error("Error of POST-request:", error);
    });
};

export const changeTodo = async ({ todoData, id }: Props) => {
  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  })
    .then((response) => response.json())
    .then((createdEntity) => {
      console.log("New entity:", createdEntity);
    })
    .catch((error) => {
      console.error("Error of PUT-request:", error);
    });
};

export const deleteTodo = async ({ id }: Props) => {
  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Deleted entity");
      }
    })
    .catch((error) => {
      console.error("Error of delete entity:", error);
    });
};
