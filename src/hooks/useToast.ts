import { useAppDispatch } from "@/redux/hooks";
import { setShow, setToastMessage } from "@/redux/slices/toastSlice";

const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (message: string) => {
    dispatch(setToastMessage(message));
    dispatch(setShow(true));

    setTimeout(() => {
      dispatch(setShow(false));
    }, 3000);
  };

  return { showToast };
};

export default useToast;
