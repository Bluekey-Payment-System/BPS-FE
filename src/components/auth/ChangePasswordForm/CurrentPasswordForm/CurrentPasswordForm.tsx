import { SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import useAlertModal from "@/hooks/useAlertModal";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

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
  const { showAlertModal } = useAlertModal();
  const handleClickNext: SubmitHandler<IChangePasswordFieldValues> = (data) => {
    // TODO: /api/v1/auth/member/password/confirm 에 POST요청해서 response에 따라 성공, 에러 처리
    if (data.password === "1234qwer") {
      onSuccess();
    } else {
      showAlertModal({
        type: MODAL_TYPE.ERROR,
        title: "비밀번호 오류",
        message: "입력하신 비밀번호와 현재 비밀번호가 일치하지 않습니다.",
      });
    }
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
