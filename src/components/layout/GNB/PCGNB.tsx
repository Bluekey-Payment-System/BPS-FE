import Avatar from "boring-avatars";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import { RANDOM_PROFILES } from "@/constants/randomProfileList";

import getRandomProfileIndex from "./GNB.utils";
import styles from "./PCGNB.module.scss";

interface PCGNBProps {
  loginId: string,
  profileImage: string | null,
  type: "SUPER_ADMIN" | "ADMIN" | "ARTIST",
  onClickNotification: () => void,
  onClickLogout: () => void,
}

const cx = classNames.bind(styles);

const PCGNB = ({
  loginId, profileImage, type, onClickNotification, onClickLogout,
}: PCGNBProps) => {
  return (
    <div className={cx("container")}>
      <Link href="/dashboard">
        <Image src="/images/bluekey-music-logo.svg" width={153} height={36} alt="블루키 뮤직" />
      </Link>
      <div className={cx("rightSide")}>
        {type === "SUPER_ADMIN"
          && (
            <button type="button" onClick={onClickNotification}>
              <Image src="/images/bell.svg" width={20} height={20} alt="알림" />
            </button>
          )}
        <Link href="/my-profile" className={cx("profile")}>
          {profileImage
            ? <Image src={profileImage} width={30} height={30} alt="프로필 이미지" />
            : <Avatar size={30} name={RANDOM_PROFILES[getRandomProfileIndex(loginId)]} variant="marble" colors={["#bfd4f9", "#76a3f2", "#387ffd", "#ffd8d8", "#9b88ed"]} />}
          <span className={cx("profileName")}>{`${loginId} 님`}</span>
        </Link>
        <button className={cx("logoutButton")} type="button" onClick={onClickLogout}>
          <Image src="/images/logout.svg" width={18} height={15} alt="로그아웃" />
        </button>
      </div>
    </div>
  );
};

export default PCGNB;
