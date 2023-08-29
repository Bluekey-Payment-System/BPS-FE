import classNames from "classnames/bind";

import Spacing from "@/components/common/Layouts/Spacing";
import Modal from "@/components/common/Modals/Modal";
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
  return (
    <Modal type={MODAL_TYPE.INFO} open={open} onClose={onClose}>
      <div className={cx("container")}>
        <h1 className={cx("title")}>경고!</h1>
        <Spacing direction="vertical" size={18} />
        <p className={cx("description")}>
          해당 데이터가 맞는지 다시 한 번 확인 해주세요.
          <br />
          그 외 정산 데이터를 성공적으로 업로드했습니다.
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
