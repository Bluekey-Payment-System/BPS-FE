import SigninForm from "@/components/auth/SigninForm";
import useToast from "@/hooks/useToast";

const AdminSigninPage = () => {
  const { showToast } = useToast();
  // TODO: /api/v1/auth/admin/login 에 POST요청
  // TODO: useFormContext 사용하여 handleSignin함수와 폼 입력값 연동
  const handleSignin = () => {
    return new Promise<void>(() => {
      setTimeout(() => { showToast("어드민으로 로그인 되었습니다"); }, 1000);
    });
  };
  return (
    <SigninForm title="관리자 로그인" onSubmit={handleSignin} />
  );
};

export default AdminSigninPage;
