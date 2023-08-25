import Avatar from "boring-avatars";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import { COMBINATION_COLORS, RANDOM_PROFILES } from "@/constants/randomProfileList";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

import getRandomProfileIndex from "./GNB.utils";
import styles from "./MobileGNB.module.scss";
import { GNBProps } from "./PCGNB";

const cx = classNames.bind(styles);

interface MobileGNBProps extends GNBProps {
  onClickMenu: (isOpen: boolean) => void
}

const MobileGNB = ({
  loginId, profileImage, role, onClickNotification, onClickLogout, onClickMenu,
}: MobileGNBProps) => {
  const handleClickMenu = () => {
    onClickMenu(true);
  };

  return (
    <div className={cx("container")}>
      <button type="button" className={cx("menu")} onClick={handleClickMenu}>
        <Image src="/images/hamburger.svg" width={20} height={20} alt="메뉴" />
      </button>
      <Link href="/dashboard">
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
        <Link href="/my-profile">
          {profileImage
            ? <Image src={profileImage} width={30} height={30} alt="프로필 이미지" />
            : <Avatar size={20} name={RANDOM_PROFILES[getRandomProfileIndex(loginId)]} variant="marble" colors={COMBINATION_COLORS} />}
        </Link>
        <button type="button" onClick={onClickLogout}>
          <Image src="/images/logout.svg" width={20} height={17} alt="로그아웃" />
        </button>
      </div>
    </div>
  );
};

export default MobileGNB;
