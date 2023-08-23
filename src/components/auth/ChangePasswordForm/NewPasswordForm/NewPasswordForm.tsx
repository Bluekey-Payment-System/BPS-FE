// import { useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";

import styles from "../CurrentPasswordForm/CurrentPasswordForm.module.scss";

const cx = classNames.bind(styles);

// interface INewPasswordFieldValues {
//   password: string;
//   confirmPassword: string;
// }

const NewPasswordForm = () => {
  // const { register } = useForm<INewPasswordFieldValues>();
  return (
    <div className={cx("container", "newPasswordForm")}>
      <div className={cx("inputGroupContainer")}>
        <PasswordField
          label="새 비밀번호 입력"
          errors={{}}
        />
        <PasswordField
          label="비밀번호 확인"
          errors={{}}
        />
      </div>
      <Button size="medium" theme="dark" type="submit">변경 완료</Button>
    </div>
  );
};

export default NewPasswordForm;
