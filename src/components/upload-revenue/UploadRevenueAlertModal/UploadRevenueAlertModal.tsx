import classNames from "classnames/bind";

import Spacing from "@/components/common/Layouts/Spacing";
import Modal from "@/components/common/Modals/Modal";
import { uploadRevenueAlertContents } from "@/constants/uploadRevenueAlertModalContent";
import { ITransactionUploadAlert } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import AlertDataTable from "../AlertDataTable/AlertDataTable";

import styles from "./UploadRevenueAlertModal.module.scss";

export interface UploadRevenueAlertModalProps {
  type: "warning" | "error";
  open: boolean;
  alertData: ITransactionUploadAlert[];
  onClose: () => void;
}

const cx = classNames.bind(styles);

const UploadRevenueAlertModal = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type, open, alertData, onClose,
}: UploadRevenueAlertModalProps) => {
  if (!type) return undefined;

  return (
    <Modal type={MODAL_TYPE.INFO} open={open} onClose={onClose}>
      <div className={cx("container")}>
        <h1 className={cx("title")}>{uploadRevenueAlertContents[type].title}</h1>
        <Spacing direction="vertical" size={18} />
        <p className={cx("description")}>
          {uploadRevenueAlertContents[type].message}
        </p>
        <Spacing direction="vertical" size={17} />
        <AlertDataTable data={alertData} />
        <Spacing direction="vertical" size={30} />
        <button className={cx("confirmButton")} type="button" onClick={onClose}>확인</button>
      </div>
    </Modal>
  );
};

export default UploadRevenueAlertModal;
