import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ToastPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => { return setMounted(false); };
  }, []);

  const el = typeof window !== "undefined" && document.getElementById("toast-root");
  if (!mounted) return null;
  return createPortal(children, el as HTMLElement);
};

export default ToastPortal;
