import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ToastPortalProps {
  portalId: string;
  children: ReactNode;
}

const ToastPortal = ({ portalId, children }: ToastPortalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => { return setMounted(false); };
  }, []);
  const el = typeof window !== "undefined" && document.getElementById(portalId);
  if (!mounted) return null;
  return createPortal(children, el as HTMLElement);
};

export default ToastPortal;
