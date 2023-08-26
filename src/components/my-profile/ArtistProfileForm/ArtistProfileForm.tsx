import { useState } from "react";
import {
  FieldValues,
  SubmitHandler, UseFormResetField, useFormContext,
} from "react-hook-form";

import classNames from "classnames/bind";

import ChangePasswordForm from "@/components/auth/ChangePasswordForm/ChangePasswordForm";
import Button from "@/components/common/CommonBtns/Button/Button";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";
import Modal from "@/components/common/Modals/Modal";
import useToast from "@/hooks/useToast";
import { IArtistUpdateProfileFieldValues } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import styles from "./ArtistProfileForm.module.scss";

const cx = classNames.bind(styles);

interface ArtistProfileFormProps {
  name: string;
  enName: string;
  loginId: string;
  onSubmit: SubmitHandler<IArtistUpdateProfileFieldValues>;
}

const ArtistProfileForm = ({
  name, enName, loginId, onSubmit,
}: ArtistProfileFormProps) => {
  const {
    register, handleSubmit, formState: { errors, defaultValues }, trigger, resetField, getValues,
  } = useFormContext<IArtistUpdateProfileFieldValues>();
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
          label="활동 예명 (한글)"
          value={name}
          disabled
          errors={{}}
        />
        <TextField
          label="활동 예명 (영문)"
          value={enName}
          disabled
          errors={{}}
        />
        <TextField
          label="계정 ID"
          value={loginId}
          disabled
          errors={{}}
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
          bottomText="*해당 메일로 정산 완료 메일이 발송됩니다"
          onSave={() => { onSubmit(getValues()); }}
          originalValue={defaultValues?.email ?? ""}
          resetField={resetField as UseFormResetField<FieldValues>}
        />
      </form>
      <Spacing size={6} />
      <Button size="medium" theme="dark" onClick={showModal}>비밀번호 재설정하기</Button>
      <Modal type={MODAL_TYPE.FORM} onClose={closeModal} open={isChangePasswordFormOpen}>
        <ChangePasswordForm onComplete={() => { closeModal(); showToast("비밀번호가 재설정 되었습니다"); }} />
      </Modal>
    </div>
  );
};

export default ArtistProfileForm;
