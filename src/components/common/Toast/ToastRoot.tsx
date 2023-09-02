import { useEffect, useRef } from "react";

import { useAppSelector } from "@/redux/hooks";

import Toast from "./Toast";
import ToastPortal from "./ToastPortal";

const ToastRoot = () => {
  const {
    isShowing, message, portalId, status,
  } = useAppSelector((state) => { return state.toast; });
  const toastRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isShowing) {
      toastRef.current?.show();
    }
  }, [isShowing]);
  if (!isShowing) return null;
  return (
    <ToastPortal portalId={portalId}>
      <Toast ref={toastRef} message={message} status={status} />
    </ToastPortal>
  );
};

export default ToastRoot;
