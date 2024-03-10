import { useEffect, useRef, useState } from "react";
import ApplyTodoName from "@/components/toDo/todoOperations/ApplyTodoName";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";
import { StyledChangeTodoButtons } from "@/components/styled/StyledButton";

interface Props {
  todo: { _id: number; name: string };
}

const ChangeTodoName = ({ todo }: Props) => {
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
            todo={newNameData}
          />
        </div>
      ) : (
        <>
          <StyledChangeTodoButtons
            onClick={() => setIsNameChangerVisible(true)}
          >
            Change Todo Name
          </StyledChangeTodoButtons>
        </>
      )}
    </>
  );
};

export default ChangeTodoName;
