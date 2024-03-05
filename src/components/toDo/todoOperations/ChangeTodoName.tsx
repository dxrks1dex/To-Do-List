import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ApplyTodoName from "@/components/toDo/todoOperations/ApplyTodoName";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";

interface Props {
  todo: { _id: number; name: string };
  isClickAwaiting: Record<number, boolean> | boolean;
  setIsClickAwaiting: Dispatch<
    SetStateAction<Record<number, boolean> | boolean>
  >;
}

const ChangeTodoName = ({
  todo,
  setIsClickAwaiting,
  isClickAwaiting,
}: Props) => {
  const [isNameChangerVisible, setIsNameChangerVisible] = useState(false);
  const [newName, setNewName] = useState("");

  const onApplyNameVisible = (value: boolean) => {
    setIsNameChangerVisible(value);
  };

  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setVisibleState: setIsNameChangerVisible,
  });

  useEffect(() => {
    if (!isNameChangerVisible) {
      setNewName("");
    }
  }, [isNameChangerVisible]);

  const newNameData = {
    _id: todo._id,
    name: newName,
  };

  return (
    <>
      {isNameChangerVisible ? (
        <div ref={wrapperRef}>
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
          <ApplyTodoName
            onApplyNameVisible={onApplyNameVisible}
            setIsClickAwaiting={setIsClickAwaiting}
            todo={newNameData}
            isClickAwaiting={isClickAwaiting}
          />
        </div>
      ) : (
        <>
          <button onClick={() => setIsNameChangerVisible(true)}>
            Change Todo Name
          </button>
        </>
      )}
    </>
  );
};

export default ChangeTodoName;
