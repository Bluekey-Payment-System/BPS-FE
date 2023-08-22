import { SubmitHandler, useFormContext } from "react-hook-form";

import classNames from "classnames/bind";

import TextField from "@/components/common/Inputs/TextField/TextField";
import { IArtistUpdateProfileFieldValues } from "@/types/dto";

import styles from "./ArtistProfileForm.module.scss";

const cx = classNames.bind(styles);

interface ArtistProfileFormProps {
  onSubmit: SubmitHandler<IArtistUpdateProfileFieldValues>;
}

const ArtistProfileForm = ({ onSubmit }: ArtistProfileFormProps) => {
  const { register, handleSubmit } = useFormContext();
  return (
    <div className={cx("container")}>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="활동 예명 (한글)"
          {...register("name")}
          errors={{}}
        />
        <TextField
          label="활동 예명 (영문)"
          {...register("enName")}
          errors={{}}
        />
        <TextField
          label="계정 ID"
          {...register("loginId")}
          errors={{}}
        />
        <TextField
          label="계정 이메일"
          {...register("email")}
          errors={{}}
          bottomText="*해당 메일로 정산 완료 메일이 발송됩니다"
          onSave={() => {}}
        />
      </form>
    </div>
  );
};

export default ArtistProfileForm;
