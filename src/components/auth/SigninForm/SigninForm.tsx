import { useForm } from "react-hook-form";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";

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
      <TextField {...register("loginId")} errors={errors} placeholder="아이디 입력" />
      <Spacing size={16} />
      <PasswordField {...register("password")} errors={errors} placeholder="비밀번호 입력" />
      <Spacing size={36} />
      <Button size="large" theme="dark" type="submit">로그인</Button>
      {isAdmin && (
        <>
          <Spacing size={24} />
          <p>
            아직 회원이 아니세요?
            {" "}
            <Link href="/admin/signup">회원가입</Link>
          </p>
        </>
      )}
    </form>
  );
};

export default SigninForm;
