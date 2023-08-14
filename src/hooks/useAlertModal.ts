import { AlertModalProps } from "@/components/common/Modals/AlertModal/AlertModal";
import { useAppDispatch } from "@/redux/hooks";
import { setShow, setProps } from "@/redux/slices/alertModalSlice";

export interface IUseAlertModalParam extends Omit<AlertModalProps, "open" | "onClose"> {}

const useAlertModal = ({ ...params }: IUseAlertModalParam) => {
  const dispatch = useAppDispatch();

  const showAlertModal = () => {
    dispatch(setProps(params));
    dispatch(setShow(true));
  };

  return { showAlertModal };
};

export default useAlertModal;
