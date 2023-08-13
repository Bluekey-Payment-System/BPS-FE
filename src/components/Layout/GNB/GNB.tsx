import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import useToast from "@/hooks/useToast";

import styles from "./GNB.module.scss";

const cx = classNames.bind(styles);

const GNB = () => {
  const { showToast } = useToast();

  const handleLogout = () => {
    showToast("로그아웃");
  };

  return (
    <div className={cx("container")}>
      <Link href="/dashboard">
        <Image src="/images/bluekey-music-logo.svg" width={153} height={36} alt="블루키 뮤직" />
      </Link>
      <div className={cx("rightSide")}>
        <button type="button">
          <Image src="/images/bell.svg" width={20} height={20} alt="알림" />
        </button>
        <Link href="/my-profile" className={cx("profile")}>
          <Image className={cx("profileImage")} src="/images/default-profile-image.svg" width={30} height={30} alt="프로필 이미지" />
          <span className={cx("profileName")}>bluekeymusic_domain 님</span>
        </Link>
        <button className={cx("logoutButton")} type="button" onClick={handleLogout}>
          <Image src="/images/logout.svg" width={18} height={15} alt="로그아웃" />
        </button>
      </div>
    </div>
  );
};

export default GNB;
