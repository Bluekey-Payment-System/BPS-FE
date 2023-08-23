import { useState } from "react";

import classNames from "classnames/bind";

import styles from "./ChangePasswordForm.module.scss";
import CurrentPasswordForm from "./CurrentPasswordForm/CurrentPasswordForm";
import NewPasswordForm from "./NewPasswordForm/NewPasswordForm";

const cx = classNames.bind(styles);
/**
 * 비밀번호 변경 폼
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {Fucntion} onComplete 비밀번호 변경 모든 단계를 완료한 뒤 실행할 함수
 * @example
 * ```tsx
 * const [showModal, setShowModal] = useState(false);
 * ...
 * <Modal isOpen={showModal}>
 *   <ChangePasswordForm onComplete={()=>{alert("비밀번호 변경 완료!"); setShowModal(false)}} />
 * </Modal>
 * ```
 */
const ChangePasswordForm = ({ onComplete }: { onComplete: () => void }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>비밀번호 재설정</h1>
      {currentPage === 1 ? (
        <CurrentPasswordForm
          onSuccess={() => { setCurrentPage((prev) => { return prev + 1; }); }}
        />
      ) : (
        <NewPasswordForm
          onSuccess={() => { onComplete(); setTimeout(() => { setCurrentPage(1); }, 500); }}
        />
      )}
    </div>
  );
};

export default ChangePasswordForm;
