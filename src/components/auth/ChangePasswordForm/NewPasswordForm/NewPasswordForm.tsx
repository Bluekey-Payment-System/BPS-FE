import { SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import useAlertModal from "@/hooks/useAlertModal";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

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
  const { showAlertModal } = useAlertModal({
    type: MODAL_TYPE.ERROR,
    title: "에러 발생",
    message: `알 수 없는 에러가 발생하였습니다. 
    잠시 후에 다시 시도해주세요.`,
  });
  const handleClickDone: SubmitHandler<INewPasswordFieldValues> = (data) => {
    // TODO: /api/v1/auth/member/password 로 patch요청 try-catch
    if (data.password === "1234qwer") {
      onSuccess();
    } else {
      showAlertModal();
    }
  };
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={cx("container", "newPasswordForm")} onSubmit={handleSubmit(handleClickDone)}>
        <div className={cx("inputGroupContainer")}>
          <PasswordField
            label="새 비밀번호 입력aaa"
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
