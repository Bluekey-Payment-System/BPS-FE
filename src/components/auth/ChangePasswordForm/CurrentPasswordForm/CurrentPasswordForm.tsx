import { SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import useConfirmPassword from "@/services/queries/auth/useConfirmPassword";

import styles from "./CurrentPasswordForm.module.scss";

const cx = classNames.bind(styles);

interface IChangePasswordFieldValues {
  password: string;
}

interface CurrentPasswordFormProps {
  onSuccess: () => void;
}

const CurrentPasswordForm = ({ onSuccess }: CurrentPasswordFormProps) => {
  const { register, formState: { errors }, handleSubmit } = useForm<IChangePasswordFieldValues>();
  const { mutateAsync: confirmPassword, isSuccess } = useConfirmPassword();
  const handleClickNext: SubmitHandler<IChangePasswordFieldValues> = async (data) => {
    await confirmPassword(data);
    if (isSuccess) onSuccess();
  };
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(handleClickNext)} className={cx("container")}>
        <PasswordField
          label="현재 비밀번호 입력"
          {...register("password")}
          errors={errors}
        />
        <Button theme="dark" size="medium" type="submit">다음</Button>
      </form>
    </>
  );
};

export default CurrentPasswordForm;
