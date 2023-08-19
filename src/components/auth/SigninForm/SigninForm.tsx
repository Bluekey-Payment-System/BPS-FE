import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import Link from "next/link";

import Button from "@/components/common/CommonBtns/Button/Button";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";
import useToast from "@/hooks/useToast";
import {
  AdminType, ArtistType, MEMBER_TYPE,
} from "@/types/enums/user.enum";

import styles from "./SigninForm.module.scss";

const cx = classNames.bind(styles);

interface SigninFormProps {
  title: string;
  type: AdminType | ArtistType;
}

const SigninForm = ({ title, type }:SigninFormProps) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { showToast } = useToast();
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    // TODO: try - catch 문 적용, artist로그인의 경우 response의 id값을 이용하여 router.push할 경로를 생성
    if (type === MEMBER_TYPE.ARTIST) {
      // TODO: 아티스트 로그인 api 호출
      // TODO: /api/v1/auth/member/login 에 POST 요청, router.push admin홈
      showToast("아티스트 로그인");
    } else {
      // TODO: 어드민 로그인 api 호출
      // TODO: /api/v1/auth/admin/login 에 POST 요청, router.push artist홈
      showToast("어드민 로그인");
    }
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data));
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cx("title")}>{title}</h1>
      <Spacing size={98} />
      <TextField {...register("loginId")} errors={errors} placeholder="아이디 입력" />
      <Spacing size={16} />
      <PasswordField {...register("password")} errors={errors} placeholder="비밀번호 입력" />
      <Spacing size={36} />
      <Button size="large" theme="dark" type="submit">로그인</Button>
      {type === MEMBER_TYPE.ADMIN && (
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
