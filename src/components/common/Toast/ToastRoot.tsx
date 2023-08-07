import { useAppSelector } from "@/redux/hooks";

import Toast from "./Toast";
import ToastPortal from "./ToastPortal";

const ToastRoot = () => {
  const isVisible = useAppSelector((state) => { return state.toast.isShowing; });
  const message = useAppSelector((state) => { return state.toast.message; });
  if (isVisible) {
    return (
      <ToastPortal>
        <Toast message={message} />
      </ToastPortal>
    );
  }
  return null;
};

export default ToastRoot;
