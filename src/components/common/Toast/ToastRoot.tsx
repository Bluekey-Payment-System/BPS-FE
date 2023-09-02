import { useEffect, useRef } from "react";

import { useAppSelector } from "@/redux/hooks";

import Toast from "./Toast";
import ToastPortal from "./ToastPortal";

const ToastRoot = () => {
  const isVisible = useAppSelector((state) => { return state.toast.isShowing; });
  const message = useAppSelector((state) => { return state.toast.message; });
  const portalId = useAppSelector((state) => { return state.toast.portalId; });
  const toastRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isVisible) {
      toastRef.current?.show();
    }
  }, [isVisible]);
  if (!isVisible) return null;
  return (
    <ToastPortal portalId={portalId}>
      <Toast ref={toastRef} message={message} />
    </ToastPortal>
  );
};

export default ToastRoot;
