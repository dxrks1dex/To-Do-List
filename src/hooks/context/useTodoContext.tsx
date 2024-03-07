import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface ITodoContext {
  data: {
    todoDay: Date | null;
    isTodoOptionVisible: boolean;
  };
  operations: {
    setTodoDay: Dispatch<SetStateAction<Date | null>>;
    setIsTodoOptionVisible: Dispatch<SetStateAction<boolean>>;
  };
}

const UseTodoContext = createContext<ITodoContext | null>(null);
export const TodoContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todoDay, setTodoDay] = useState<Date | null>(null);
  const [isTodoOptionVisible, setIsTodoOptionVisible] = useState(false);

  const context: ITodoContext = useMemo(
    () => ({
      data: { todoDay, isTodoOptionVisible },
      operations: { setTodoDay, setIsTodoOptionVisible },
    }),
    [isTodoOptionVisible, todoDay],
  );

  return (
    <UseTodoContext.Provider value={context}>
      {children}
    </UseTodoContext.Provider>
  );
};

export const useTodoContext = (): ITodoContext => {
  const value = useContext(UseTodoContext);
  if (value === null) {
    throw new Error("empty UseTodoContext");
  }

  return value;
};
