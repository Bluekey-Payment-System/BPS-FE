import { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import classNames from "classnames/bind";

import ChangePasswordForm from "@/components/auth/ChangePasswordForm/ChangePasswordForm";
import Button from "@/components/common/CommonBtns/Button/Button";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";
import Modal from "@/components/common/Modals/Modal";
import useToast from "@/hooks/useToast";
import { IAdminUpdateProfileFieldValues } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import getStringBytes from "@/utils/getStringBytes";

import styles from "./AdminProfileForm.module.scss";

const cx = classNames.bind(styles);

interface AdminProfileFormProps {
  loginId: string;
  onSubmit: SubmitHandler<IAdminUpdateProfileFieldValues>;
}

const AdminProfileForm = ({ loginId, onSubmit }: AdminProfileFormProps) => {
  const {
    register, handleSubmit, resetField, trigger, formState: { errors, defaultValues },
  } = useFormContext<IAdminUpdateProfileFieldValues>();
  const { showToast } = useToast();
  const [isChangePasswordFormOpen, setIsChangePasswordFormOpen] = useState(false);

  const closeModal = () => {
    setIsChangePasswordFormOpen(false);
  };

  const showModal = () => {
    setIsChangePasswordFormOpen(true);
  };

  return (
    <div className={cx("container")}>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="계정 아이디"
          value={loginId}
          disabled
          errors={{}}
        />
        <TextField
          label="닉네임"
          {...register("nickname", {
            pattern: {
              value: /^[가-힣a-zA-Z0-9]*$/,
              message: "*한글, 영문, 숫자만 사용해주세요.",
            },
            validate: {
              isLongerThan1B: (v: string | undefined) => { return getStringBytes(v as string) >= 2 || "*2바이트 이상 입력해주세요"; },
              isShorterThan20B: (v: string | undefined) => { return getStringBytes(v as string) <= 20 || "*20바이트 이하로 입력해주세요"; },
            },
            // eslint-disable-next-line no-void
            onChange: () => { void trigger("nickname"); },
            // eslint-disable-next-line no-void
            onBlur: () => { void trigger("nickname"); },
          })}
          errors={errors}
          onSave={() => { showToast("닉네임이 변경되었습니다."); }}
          originalValue={defaultValues?.nickname}
          resetField={resetField}
        />
        <TextField
          label="계정 이메일"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 이메일을 입력해주세요.",
            },
            // eslint-disable-next-line no-void
            onChange: () => { void trigger("email"); },
            // eslint-disable-next-line no-void
            onBlur: () => { void trigger("email"); },
          })}
          errors={errors}
          onSave={() => { showToast("계정 이메일이 변경되었습니다."); }}
          originalValue={defaultValues?.email}
          resetField={resetField}
        />
        <Spacing size={0} />
      </form>
      <Spacing size={6} />
      <Button size="medium" theme="dark" onClick={showModal}>비밀번호 재설정하기</Button>
      <Modal type={MODAL_TYPE.FORM} onClose={closeModal} open={isChangePasswordFormOpen}>
        <ChangePasswordForm onComplete={() => { closeModal(); showToast("비밀번호가 재설정 되었습니다"); }} />
      </Modal>
    </div>
  );
};

export default AdminProfileForm;
