import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";

import styles from "../SigninForm/SigninForm.module.scss";

const cx = classNames.bind(styles);

interface SignupFormProps {
  title: string;
}

const SignupForm = ({ title }:SignupFormProps) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // TODO: 관리자 권한 승인/거절 기능 추가 후 router.push("/admin/pending")
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cx("title")}>{title}</h1>
      <Spacing size={48} />
      <TextField label="이메일" {...register("email")} errors={errors} placeholder="example@bluekeymusic.com" />
      <Spacing size={16} />
      <TextField label="아이디" {...register("loginId")} errors={errors} placeholder="5~20자의 영문 소문자, 숫자, 특수기호(_),(-) 포함" />
      <Spacing size={16} />
      <TextField label="닉네임" {...register("nickname")} errors={errors} placeholder="닉네임 입력" />
      <Spacing size={16} />
      <PasswordField label="비밀번호" {...register("password")} errors={errors} placeholder="8~16자의 영문 대/소문자, 숫자, 특수문자" />
      <Spacing size={16} />
      <PasswordField label="비밀번호 확인" {...register("password-confirm")} errors={errors} placeholder="8~16자의 영문 대/소문자, 숫자, 특수문자" />
      <Spacing size={16} />
      <Button size="large" theme="dark" type="submit">가입하기</Button>
    </form>
  );
};

export default SignupForm;
