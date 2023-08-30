/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { resetUser } from "@/redux/slices/userSlice";
import { MEMBER_ROLE } from "@/types/enums/user.enum";
import { removeCookie } from "@/utils/cookies";

import { GnbInfoProps } from "../Layout.types";

import MobileGNB from "./MobileGNB";
import PCGNB from "./PCGNB";

const GNB = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginId, profileImage, role, onClickMenu,
}: GnbInfoProps) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickNotification = () => {
    showToast("알림창 오픈");
  };

  const handleSignout = async () => {
    setTimeout(() => { dispatch(resetUser()); }, 500);
    removeCookie("token", { path: "/" });
    showToast("로그아웃 되었습니다.");
    if (role === MEMBER_ROLE.ARTIST) {
      await router.push("/signin");
      return;
    }
    await router.push("/admin/signin");
  };

  return (
    <>
      <PCGNB
        loginId={loginId}
        profileImage={null} // api 수정 이후 변경하기!
        role={role}
        onClickNotification={handleClickNotification}
        onClickLogout={handleSignout}
      />
      <MobileGNB
        loginId={loginId}
        profileImage={null}
        role={role}
        onClickNotification={handleClickNotification}
        onClickLogout={handleSignout}
        onClickMenu={onClickMenu}
      />
    </>
  );
};

export default GNB;
