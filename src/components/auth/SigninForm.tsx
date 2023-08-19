import { useForm } from "react-hook-form";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../common/CommonBtns/Button/Button";
import PasswordField from "../common/Inputs/PasswordInput/PasswordField";
import TextField from "../common/Inputs/TextField/TextField";

import styles from "./SigninForm.module.scss";

const cx = classNames.bind(styles);

interface SigninFormProps {
  title: string;
  onSubmit: () => Promise<void>;
}

const SigninForm = ({ title, onSubmit }:SigninFormProps) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const isAdmin = useRouter().pathname.includes("admin");

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cx("title")}>{title}</h1>
      <div className={cx("textFieldWrapper")}>
        <TextField {...register("loginId")} errors={errors} placeholder="아이디 입력" />
      </div>
      <div className={cx("textFieldWrapper")}>
        <PasswordField {...register("password")} errors={errors} placeholder="비밀번호 입력" />
      </div>
      <div className={cx("signinBtnWrapper")}>
        <Button size="large" theme="dark" type="submit">로그인</Button>
      </div>
      {isAdmin && (
        <p>
          아직 회원이 아니세요?
          {" "}
          <Link href="/admin/signup">회원가입</Link>
        </p>
      )}
    </form>
  );
};

export default SigninForm;
