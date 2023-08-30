import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/hooks";
import { resetAll, setShow } from "@/redux/slices/uploadRevenueAlertModalSlice";

import UploadRevenueAlertModal from "./UploadRevenueAlertModal";

const UploadRevenueAlertModalRoot = () => {
  const dispatch = useDispatch();
  const isVisible = useAppSelector((state) => { return state.uploadRevenueAlertModal.isShowing; });
  const uploadRevenueAlertModalProps = useAppSelector((state) => {
    return state.uploadRevenueAlertModal.props;
  });
  const onClose = () => {
    dispatch(setShow(false));
    uploadRevenueAlertModalProps?.onClose?.();
    setTimeout(() => {
      dispatch(resetAll());
    }, 500);
  };

  return (
    <UploadRevenueAlertModal
      {...uploadRevenueAlertModalProps!}
      open={isVisible}
      onClose={onClose}
    />
  );
};

export default UploadRevenueAlertModalRoot;
