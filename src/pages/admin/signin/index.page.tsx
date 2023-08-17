import { useRouter } from "next/router";

import SigninForm from "@/components/auth/SigninForm/SigninForm";
import useToast from "@/hooks/useToast";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const AdminSigninPage = () => {
  const { showToast } = useToast();
  const router = useRouter();

  // TODO: /api/v1/auth/admin/login 에 POST요청
  // TODO: useFormContext 사용하여 handleSignin함수와 폼 입력값 연동
  const handleSignin = () => {
    return new Promise<void>(() => {
      setTimeout(() => {
        router.push(`/admin/dashboard/${getLatestYearMonthString()}`)
          .then(() => { showToast("어드민으로 로그인 되었습니다"); })
          .catch(() => { showToast("로그인 실패"); });
      }, 1000);
    });
  };
  return (
    <SigninForm title="관리자 로그인" onSubmit={handleSignin} />
  );
};

export default AdminSigninPage;
