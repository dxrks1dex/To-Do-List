import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

interface Props {
  ref: RefObject<HTMLElement>;
  setVisibleState: Dispatch<SetStateAction<boolean>>;
}

export const useOutsideDetect = ({ ref, setVisibleState }: Props): void => {
  useEffect(() => {
    function isClickOutside(e: MouseEvent) {
      if (isNode(e.target)) {
        if (ref.current && !ref.current.contains(e.target)) {
          setVisibleState(false);
        }
      }
    }
    document.addEventListener("mousedown", isClickOutside);
    return () => {
      document.removeEventListener("mousedown", isClickOutside);
    };
  }, [ref, setVisibleState]);
};

function isNode(target: EventTarget | null): target is Node {
  return target instanceof Node;
}
