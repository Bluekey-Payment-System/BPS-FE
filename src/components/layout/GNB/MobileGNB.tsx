import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import DefaultProfileImage from "@/components/common/DefaultProfileImage/DefaultProfileImage";
import Notification from "@/components/layout/Notification/Notification";
import { useAppSelector } from "@/redux/hooks";
import { MEMBER_ROLE, MEMBER_TYPE } from "@/types/enums/user.enum";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

import styles from "./MobileGNB.module.scss";
import { GNBProps } from "./PCGNB";

const cx = classNames.bind(styles);

interface MobileGNBProps extends GNBProps {
  onClickMenu: (isOpen: boolean) => void
}

const MobileGNB = ({
  loginId, profileImage, role, openNotification, onClickNotification, onClickLogout, onClickMenu,
}: MobileGNBProps) => {
  const { type, memberId } = useAppSelector((state) => { return state.user.member; });
  const homeURL = (type === MEMBER_TYPE.ADMIN)
    ? `/admin/dashboard/${getLatestYearMonthString()}`
    : `/artists/${memberId}/dashboard/${getLatestYearMonthString()}`;
  const profileURL = (type === MEMBER_TYPE.ADMIN)
    ? "/admin/my-profile"
    : `/artists/${memberId}/my-profile`;

  const handleClickMenu = () => {
    onClickMenu(true);
  };

  return (
    <div className={cx("container")}>
      <button type="button" className={cx("menu")} onClick={handleClickMenu}>
        <Image src="/images/hamburger.svg" width={20} height={20} alt="메뉴" />
      </button>
      <Link href={homeURL}>
        <Image src="/images/logo.svg" width={23} height={23} alt="블루키 뮤직 정산 시스템" />
      </Link>
      <div className={cx("rightSide")}>
        {
          role === MEMBER_ROLE.SUPER_ADMIN
          && (
            <button type="button" onClick={onClickNotification}>
              <Image src="/images/bell.svg" width={20} height={20} alt="알림" />
            </button>
          )
        }
        {
          openNotification && (
            <dialog
              open
              style={{
                left: "50%",
              }}
            >
              <Notification onClickNotification={onClickNotification} />
            </dialog>

          )
        }
        <Link href={profileURL}>
          {profileImage
            ? <Image src={profileImage} width={30} height={30} alt="프로필 이미지" />
            : <DefaultProfileImage size={20} userId={loginId} />}
        </Link>
        <button type="button" onClick={onClickLogout}>
          <Image src="/images/logout.svg" width={20} height={17} alt="로그아웃" />
        </button>
      </div>
    </div>
  );
};

export default MobileGNB;
