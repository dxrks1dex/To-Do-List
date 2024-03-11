import { useEffect, useRef, useState } from "react";
import ApplyTodoNameButton from "@/components/toDo/todoOperations/ApplyTodoNameButton";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";
import { StyledChangeTodoButtons } from "@/components/styled/StyledButton";

interface Props {
  todo: { _id: number; name: string };
  isTodoDelete: boolean;
}

const ChangeTodoNameButton = ({ todo, isTodoDelete }: Props) => {
  const [isNameChangerVisible, setIsNameChangerVisible] = useState(false);
  const [newName, setNewName] = useState("");

  const nameChangerVisibility = (value: boolean) => {
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
          <ApplyTodoNameButton
            onApplyNameVisible={nameChangerVisibility}
            todo={newNameData}
          />
        </div>
      ) : (
        <>
          <StyledChangeTodoButtons
            disabled={isTodoDelete}
            onClick={() => setIsNameChangerVisible(true)}
          >
            Change Todo Name
          </StyledChangeTodoButtons>
        </>
      )}
    </>
  );
};

export default ChangeTodoNameButton;
