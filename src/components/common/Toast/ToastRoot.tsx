import { useAppSelector } from "@/redux/hooks";

import Toast from "./Toast";
import ToastPortal from "./ToastPortal";

const ToastRoot = () => {
  const {
    isShowing, message, portalId, status,
  } = useAppSelector((state) => { return state.toast; });
  if (!isShowing) return null;
  return (
    <ToastPortal portalId={portalId}>
      <Toast message={message} status={status} />
    </ToastPortal>
  );
};

export default ToastRoot;
