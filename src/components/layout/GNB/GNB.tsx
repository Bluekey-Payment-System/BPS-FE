import useToast from "@/hooks/useToast";

import { GnbInfoProps } from "../Layout.types";

import MobileGNB from "./MobileGNB";
import PCGNB from "./PCGNB";

const GNB = ({ loginId, profileImage, type }: GnbInfoProps) => {
  const { showToast } = useToast();

  const handleClickNotification = () => {
    showToast("알림창 오픈");
  };

  const handleLogout = () => {
    showToast("로그아웃 되었습니다.");
  };

  return (
    <>
      <PCGNB
        loginId={loginId}
        profileImage={profileImage}
        type={type}
        onClickNotification={handleClickNotification}
        onClickLogout={handleLogout}
      />
      <MobileGNB
        profileImage={profileImage}
        type={type}
        onClickNotification={handleClickNotification}
        onClickLogout={handleLogout}
      />
    </>
  );
};

export default GNB;
