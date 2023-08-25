import Avatar from "boring-avatars";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import { COMBINATION_COLORS, RANDOM_PROFILES } from "@/constants/randomProfileList";
import { MemberRole } from "@/types/enums/user.enum";

import getRandomProfileIndex from "./GNB.utils";
import styles from "./PCGNB.module.scss";

interface GNBProps {
  loginId: string,
  profileImage: string | null,
  role: MemberRole,
  onClickNotification: () => void,
  onClickLogout: () => void,
}

const cx = classNames.bind(styles);

const PCGNB = ({
  loginId, profileImage, role, onClickNotification, onClickLogout,
}: GNBProps) => {
  return (
    <div className={cx("container")}>
      <Link href="/dashboard">
        <Image className={cx("logo")} src="/images/bluekey-music-insight-logo.svg" width={206} height={30} alt="블루키 뮤직" />
      </Link>
      <div className={cx("rightSide")}>
        {role === "SUPER_ADMIN"
          && (
            <button type="button" onClick={onClickNotification}>
              <Image src="/images/bell.svg" width={20} height={20} alt="알림" />
            </button>
          )}
        <Link href="/my-profile" className={cx("profile")}>
          {profileImage
            ? <Image src={profileImage} width={30} height={30} alt="프로필 이미지" />
            : <Avatar size={30} name={RANDOM_PROFILES[getRandomProfileIndex(loginId)]} variant="marble" colors={COMBINATION_COLORS} />}
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
