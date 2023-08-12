import { ForwardedRef, useEffect, useRef } from "react";

const useForwardRef = <T>(
  ref: ForwardedRef<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any = null,
) => {
  const targetRef = useRef<T>(initialValue as T);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

export default useForwardRef;
