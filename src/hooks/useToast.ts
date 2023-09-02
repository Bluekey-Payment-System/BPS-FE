import { useAppDispatch } from "@/redux/hooks";
import { setProtalId, setShow, setToastMessage } from "@/redux/slices/toastSlice";

const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (message: string, portalId = "toast-root") => {
    dispatch(setToastMessage(message));
    dispatch(setProtalId(portalId));
    dispatch(setShow(true));

    setTimeout(() => {
      dispatch(setShow(false));
    }, 3000);
  };

  return { showToast };
};

export default useToast;
