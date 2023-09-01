import { SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import useChangePassword from "@/services/queries/auth/useChangePassword";

import styles from "../CurrentPasswordForm/CurrentPasswordForm.module.scss";

const cx = classNames.bind(styles);

interface INewPasswordFieldValues {
  password: string;
  confirmPassword: string;
}

const NewPasswordForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register, formState: { errors }, handleSubmit, getValues,
  } = useForm<INewPasswordFieldValues>({ mode: "onBlur" });
  const { mutateAsync: changePassword, isSuccess } = useChangePassword();
  const handleClickDone: SubmitHandler<INewPasswordFieldValues> = async (data) => {
    await changePassword({ password: data.password });
    if (isSuccess) onSuccess();
  };
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={cx("container", "newPasswordForm")} onSubmit={handleSubmit(handleClickDone)}>
        <div className={cx("inputGroupContainer")}>
          <PasswordField
            label="새 비밀번호 입력"
            {...register("password", {
              required: "*비밀번호를 입력하세요.",
              minLength: {
                value: 8,
                message: "*비밀번호는 8자 이상으로 입력해주세요.",
              },
              maxLength: {
                value: 16,
                message: "*비밀번호는 16자 이하로 입력해주세요.",
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*()-_+=<>?]*$/,
                message: "*영문, 숫자, 특수문자(!@#$%^&*()-_+=<>?)만 사용해주세요.",
              },
            })}
            errors={errors}
          />
          <PasswordField
            label="비밀번호 확인"
            {...register("confirmPassword", {
              required: "*비밀번호를 확인해주세요.",
              validate: {
                matchesPassword: (v: string) => { return v === getValues("password") || "*비밀번호가 일치하지 않습니다."; },
              },
            })}
            errors={errors}
          />
        </div>
        <Button size="medium" theme="dark" type="submit">변경 완료</Button>
      </form>
    </>
  );
};

export default NewPasswordForm;
