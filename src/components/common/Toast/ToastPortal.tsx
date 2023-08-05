import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ToastPortalProps {
  children: React.ReactNode;
}

const ToastPortal = ({
  children,
}: ToastPortalProps) => {
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
