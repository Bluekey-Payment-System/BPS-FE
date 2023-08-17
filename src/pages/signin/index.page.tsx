import router from "next/router";

import SigninForm from "@/components/auth/SigninForm";
import useToast from "@/hooks/useToast";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const ArtistSigninPage = () => {
  const { showToast } = useToast();
  // TODO: /api/v1/auth/member/login 에 POST 요청
  // TODO: useFormContext 사용하여 handleSignin함수와 폼 입력값 연동
  const handleSignin = () => {
    return new Promise<void>(() => {
      setTimeout(() => {
        router.push(`/artist/artistId/${getLatestYearMonthString()}`)
          .then(() => { showToast("아티스트로 로그인 되었습니다"); })
          .catch(() => { showToast("로그인 실패"); });
      }, 1000);
    });
  };
  return (
    <SigninForm title="아티스트 로그인" onSubmit={handleSignin} />
  );
};

export default ArtistSigninPage;
