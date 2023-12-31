import { RefObject, useEffect } from "react";

type CallbackFunction = () => void;

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: CallbackFunction,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setTimeout(callback, 10);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  });
};

export default useOutsideClick;
