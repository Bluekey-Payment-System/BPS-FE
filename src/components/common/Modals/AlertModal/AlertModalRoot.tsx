import { useDispatch } from "react-redux";

import AlertModal from "@/components/common/Modals/AlertModal/AlertModal";
import { useAppSelector } from "@/redux/hooks";
import { resetAll, setShow } from "@/redux/slices/alertModalSlice";

const AlertModalRoot = () => {
  const dispatch = useDispatch();
  const isVisible = useAppSelector((state) => { return state.alertModal.isShowing; });
  const alertModalProps = useAppSelector((state) => { return state.alertModal.props; });
  const onClose = () => {
    dispatch(setShow(false));
    alertModalProps?.onClose?.();
    setTimeout(() => {
      dispatch(resetAll());
    }, 500);
  };
  const onClickProceedWithClose = () => {
    alertModalProps?.onClickProceed!();
    onClose();
  };

  return (
    <AlertModal
      {...alertModalProps!}
      open={isVisible}
      onClose={onClose}
      onClickProceed={alertModalProps?.onClickProceed ? onClickProceedWithClose : undefined}
    />
  );
};

export default AlertModalRoot;
