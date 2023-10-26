/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
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
  loginId, profileImage, role, onClickMenu,
}: GnbInfoProps) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const handleClickNotification = () => {
    setOpenNotification(!openNotification);
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
        profileImage={profileImage}
        role={role}
        openNotification={openNotification}
        onClickNotification={handleClickNotification}
        onClickLogout={handleSignout}
      />
      <MobileGNB
        loginId={loginId}
        profileImage={profileImage}
        role={role}
        openNotification={openNotification}
        onClickNotification={handleClickNotification}
        onClickLogout={handleSignout}
        onClickMenu={onClickMenu}
      />
    </>
  );
};

export default GNB;
