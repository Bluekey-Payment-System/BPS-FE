import classNames from "classnames/bind";

import { MODAL_TYPE, ModalType } from "@/types/enums/modal.enum";

import Button from "../../CommonBtns/Button/Button";
import Modal from "../Modal";

import styles from "./AlertModal.module.scss";

const cx = classNames.bind(styles);

interface AlertModalProps {
  open: boolean;
  type: Extract<ModalType, (typeof MODAL_TYPE)["ERROR"] | (typeof MODAL_TYPE)["CONFIRM"]>;
  title: string;
  infoText: string;
  onClickProceed?: ()=>void;
  proceedBtnText?: string;
  closeBtnText?: string;
  onClose: () => void;
}

const AlertModal = ({
  open,
  type,
  title,
  infoText,
  onClickProceed,
  proceedBtnText,
  closeBtnText = "확인",
  onClose,
}: AlertModalProps) => {
  return (
    <Modal type={type} open={open} onClose={onClose}>
      <div className={cx("container")}>
        <div className={cx("iconBox")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <circle cx="29" cy="29" r="29" fill="#FFE9E9" />
            <path fillRule="evenodd" clipRule="evenodd" d="M30.5 15.75C30.5 14.7835 29.7165 14 28.75 14C27.7835 14 27 14.7835 27 15.75V33.25C27 34.2165 27.7835 35 28.75 35C29.7165 35 30.5 34.2165 30.5 33.25L30.5 15.75ZM29 44C30.1046 44 31 43.1046 31 42C31 40.8954 30.1046 40 29 40C27.8954 40 27 40.8954 27 42C27 43.1046 27.8954 44 29 44Z" fill="#FF000F" />
          </svg>
        </div>
        <h1 className={cx("title")}>{title}</h1>
        <p className={cx("infoText")}>{infoText}</p>
        <Button
          size="large"
          theme="dark"
          onClick={onClickProceed ?? onClose}
        >
          {proceedBtnText ?? closeBtnText}
        </Button>
        {onClickProceed && (
          <button className={cx("closeBtnWithProceed")} onClick={onClose}>
            {closeBtnText}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default AlertModal;
