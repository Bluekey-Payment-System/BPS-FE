import { useAppDispatch } from "@/redux/hooks";
import {
  setProtalId, setShow, setStatus, setToastMessage,
} from "@/redux/slices/toastSlice";
import { ToastStatus } from "@/types/enums/toast.enum";

const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (message: string, portalId = "toast-root", status: ToastStatus = "SUCCESS") => {
    dispatch(setToastMessage(message));
    dispatch(setProtalId(portalId));
    dispatch(setStatus(status));
    dispatch(setShow(true));

    setTimeout(() => {
      dispatch(setShow(false));
    }, 3000);
  };

  return { showToast };
};

export default useToast;
