import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import DefaultProfileImage from "@/components/common/DefaultProfileImage/DefaultProfileImage";
import { useAppSelector } from "@/redux/hooks";
import useCheckPendingStatus from "@/services/queries/notification-controller/useCheckPendingStatus";
import { MEMBER_TYPE, MemberRole } from "@/types/enums/user.enum";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

import Notification from "../Notification/Notification";

import styles from "./PCGNB.module.scss";

interface GNBProps {
  loginId: string,
  profileImage: string | null,
  role: MemberRole,
  openNotification: boolean,
  onClickNotification: () => void,
  onClickLogout: () => void,
}

const cx = classNames.bind(styles);

const PCGNB = ({
  loginId, profileImage, role, openNotification, onClickNotification, onClickLogout,
}: GNBProps) => {
  const { type, memberId } = useAppSelector((state) => { return state.user.member; });
  const homeURL = (type === MEMBER_TYPE.ADMIN)
    ? `/admin/dashboard/${getLatestYearMonthString()}`
    : `/artists/${memberId}/dashboard/${getLatestYearMonthString()}`;
  const profileURL = (type === MEMBER_TYPE.ADMIN)
    ? "/admin/my-profile"
    : `/artists/${memberId}/my-profile`;
  const { data: hasCheckPendingStatus } = useCheckPendingStatus();

  return (
    <div className={cx("container")}>
      <Link href={homeURL}>
        <Image className={cx("logo")} src="/images/bluekey-insight-logo.svg" width={155} height={30} alt="블루키 뮤직" />
      </Link>
      <div className={cx("rightSide")}>
        {role === "SUPER_ADMIN"
          && (
            <div className={cx("notificationSection")}>
              <button type="button" onClick={onClickNotification}>
                {hasCheckPendingStatus?.hasPendingRequestAuthority
                  ? <Image src="/images/bell-on.svg" width={23} height={23} alt="새로운 알림" />
                  : <Image src="/images/bell.svg" width={20} height={20} alt="알림" />}
              </button>
              {openNotification && (<Notification onClickNotification={onClickNotification} />)}
            </div>
          )}
        <Link href={profileURL} className={cx("profile")}>
          {profileImage
            ? <Image className={cx("profileImage")} src={profileImage} width={30} height={30} alt="프로필 이미지" />
            : <DefaultProfileImage size={30} userId={loginId} />}
          <span className={cx("profileName")}>{`${loginId} 님`}</span>
        </Link>
        <button className={cx("logoutButton")} type="button" onClick={onClickLogout}>
          <Image src="/images/logout.svg" width={18} height={15} alt="로그아웃" />
        </button>
      </div>
    </div>
  );
};

export type { GNBProps };
export default PCGNB;
