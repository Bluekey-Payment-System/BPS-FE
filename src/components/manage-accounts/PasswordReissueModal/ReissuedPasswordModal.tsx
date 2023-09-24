import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import TextFieldWithCopy from "@/components/common/Inputs/TextFieldWithCopy/TextFieldWithCopy";
import Spacing from "@/components/common/Layouts/Spacing";
import Modal from "@/components/common/Modals/Modal";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import styles from "./ReissuedPasswordModal.module.scss";

const cx = classNames.bind(styles);

interface ReissuedPasswordModalProps {
  newPassword: string
  open: boolean;
  onClose: () => void;
}

const ReissuedPasswordModal = ({
  newPassword,
  open,
  onClose,
}: ReissuedPasswordModalProps) => {
  return (
    <Modal type={MODAL_TYPE.INFO} open={open} onClose={onClose} id="reissueModal">
      <div className={cx("container")}>
        <h2 className={cx("title")}>비밀번호 재발급</h2>
        <Spacing size={32} />
        <div className={cx("passwordContainer")}>
          <TextFieldWithCopy errors={{}} label="새로 발급된 비밀번호" value={newPassword} disabled />
        </div>
        <Spacing size={50} />
        <div className={cx("buttonWrapper")}>
          <Button size="medium" theme="dark" onClick={() => { return onClose(); }}>닫기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReissuedPasswordModal;
