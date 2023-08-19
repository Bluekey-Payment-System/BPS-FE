import SigninForm from "@/components/auth/SigninForm/SigninForm";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const ArtistSigninPage = () => {
  return (
    <SigninForm title="아티스트 로그인" type={MEMBER_TYPE.ARTIST} />
  );
};

export default ArtistSigninPage;
