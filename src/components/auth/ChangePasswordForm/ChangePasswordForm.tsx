import { useState } from "react";

import classNames from "classnames/bind";

import styles from "./ChangePasswordForm.module.scss";
import CurrentPasswordForm from "./CurrentPasswordForm/CurrentPasswordForm";
import NewPasswordForm from "./NewPasswordForm/NewPasswordForm";

const cx = classNames.bind(styles);

const ChangePasswordForm = ({ onComplete }: { onComplete: () => void }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>비밀번호 재설정</h1>
      {currentPage === 1 ? (
        <CurrentPasswordForm
          onSuccess={() => { setCurrentPage((prev) => { return prev + 1; }); }}
        />
      ) : <NewPasswordForm onSuccess={onComplete} />}
    </div>
  );
};

export default ChangePasswordForm;
