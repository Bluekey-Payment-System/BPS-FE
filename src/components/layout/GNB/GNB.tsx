/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { resetUser } from "@/redux/slices/userSlice";

import { GnbInfoProps } from "../Layout.types";

import MobileGNB from "./MobileGNB";
import PCGNB from "./PCGNB";

const GNB = ({
  loginId, profileImage, role, onClickMenu,
}: GnbInfoProps) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const route = useRouter();

  const handleClickNotification = () => {
    showToast("알림창 오픈");
  };

  const handleLogout = async () => {
    // showToast("로그아웃 되었습니다.");
    setTimeout(() => { dispatch(resetUser()); }, 500);
    await route.push("/signin");
  };

  return (
    <>
      <PCGNB
        loginId={loginId}
        profileImage={profileImage}
        role={role}
        onClickNotification={handleClickNotification}
        onClickLogout={handleLogout}
      />
      <MobileGNB
        loginId={loginId}
        profileImage={profileImage}
        role={role}
        onClickNotification={handleClickNotification}
        onClickLogout={handleLogout}
        onClickMenu={onClickMenu}
      />
    </>
  );
};

export default GNB;
