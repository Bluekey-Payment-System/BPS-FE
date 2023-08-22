import { SubmitHandler, useFormContext } from "react-hook-form";

import classNames from "classnames/bind";

import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";
import { IAdminUpdateProfileFieldValues } from "@/types/dto";

import styles from "./AdminProfileForm.module.scss";

const cx = classNames.bind(styles);

interface AdminProfileFormProps {
  onSubmit: SubmitHandler<IAdminUpdateProfileFieldValues>;
}

const AdminProfileForm = ({ onSubmit }: AdminProfileFormProps) => {
  const { register, handleSubmit } = useFormContext();
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
    </div>
  );
};

export default AdminProfileForm;
