import SigninForm from "@/components/auth/SigninForm/SigninForm";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const AdminSigninPage = () => {
  return (
    <SigninForm title="관리자 로그인" type={MEMBER_TYPE.ADMIN} />
  );
};

export default AdminSigninPage;
