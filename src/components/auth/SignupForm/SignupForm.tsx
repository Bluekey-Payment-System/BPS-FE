import { SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithMaxBytes from "@/components/common/Inputs/TextFieldWithMaxBytes/TextFieldWithMaxBytes";
import Spacing from "@/components/common/Layouts/Spacing";
import { IPostAdminSignUpRequest } from "@/services/api/types/auth";
import useSignup from "@/services/queries/auth/useSignup";
import getStringBytes from "@/utils/getStringBytes";

import styles from "../SigninForm/SigninForm.module.scss";

const cx = classNames.bind(styles);

interface IAdminSignUpFieldValues extends IPostAdminSignUpRequest {
  "password-confirm": string;
}

const SignupForm = ({ title }:{ title: string }) => {
  const {
    register, formState: { errors }, handleSubmit, getValues,
  } = useForm<IAdminSignUpFieldValues>({ mode: "onBlur" });
  const { mutate: signup, isLoading } = useSignup();
  const onSubmit: SubmitHandler<IAdminSignUpFieldValues> = (data) => {
    // TODO: 회원가입 api 뮤테이션 훅 사용
    // TODO: 관리자 권한 승인/거절 기능 추가 후 router.push("/admin/pending")
    // eslint-disable-next-line no-console
    console.log(data);
    const { "password-confirm": passwordConfirm, ...body } = data;
    signup(body);
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cx("title")}>{title}</h1>
      <Spacing size={48} />
      <TextField
        label="이메일"
        {...register("email", {
          required: "*이메일을 입력하세요.",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
            message: "*올바른 이메일을 입력해주세요.",
          },
        })}
        errors={errors}
        placeholder="example@bluekeymusic.com"
      />
      <Spacing size={16} />
      <TextField
        label="아이디"
        {...register("loginId", {
          required: "*아이디를 입력하세요.",
          minLength: {
            value: 5,
            message: "*아이디는 5자 이상으로 입력해주세요.",
          },
          maxLength: {
            value: 20,
            message: "*아이디는 20자 이하로 입력해주세요.",
          },
          pattern: {
            value: /[-_a-z0-9]$/,
            message: "*영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다.",
          },
          validate: {
            startsWithChar: (v: string) => { return /^[a-z]/g.test(v) || "*아이디의 첫 글자는 영문 소문자로 시작해야 합니다."; },
          },
        })}
        errors={errors}
        placeholder="5~20자의 영문 소문자, 숫자, 특수기호(_),(-) 사용"
      />
      <Spacing size={16} />
      <TextFieldWithMaxBytes
        label="닉네임"
        maxBytes={20}
        {...register("nickname", {
          required: "*닉네임을 입력하세요.",
          pattern: {
            value: /^[가-힣a-zA-Z0-9]*$/,
            message: "*한글, 영문, 숫자만 사용해주세요.",
          },
          validate: {
            isLongerThan1B: (v: string) => { return getStringBytes(v) >= 2 || "*2바이트 이상 입력해주세요"; },
          },
        })}
        errors={errors}
        placeholder="닉네임 입력"
      />
      <Spacing size={16} />
      <PasswordField
        label="비밀번호"
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
        placeholder="8~16자의 영문 대/소문자, 숫자, 특수문자 사용"
      />
      <Spacing size={16} />
      <PasswordField
        label="비밀번호 확인"
        {...register("password-confirm", {
          required: "*비밀번호를 확인해주세요.",
          validate: {
            matchesPassword: (v: string) => { return v === getValues("password") || "*비밀번호가 일치하지 않습니다."; },
          },
        })}
        errors={errors}
        placeholder="비밀번호 확인"
      />
      <Spacing size={30} />
      <Button size="large" theme="dark" type="submit">{!isLoading ? "가입하기" : "회원가입 중..."}</Button>
    </form>
  );
};

export default SignupForm;
