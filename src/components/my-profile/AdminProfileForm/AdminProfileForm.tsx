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

import styles from "./AdminProfileForm.module.scss";

const cx = classNames.bind(styles);

interface AdminProfileFormProps {
  onSubmit: SubmitHandler<IAdminUpdateProfileFieldValues>;
}

const AdminProfileForm = ({ onSubmit }: AdminProfileFormProps) => {
  const { register, handleSubmit } = useFormContext();
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
          {...register("loginId")}
          errors={{}}
        />
        <TextField
          label="닉네임"
          {...register("nickName")}
          errors={{}}
          onSave={() => {}}
        />
        <TextField
          label="계정 이메일"
          errors={{}}
          onSave={() => {}}
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
