import Avatar from "boring-avatars";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import useToast from "@/hooks/useToast";

import styles from "./GNB.module.scss";

interface GNBProps {
  userName: string,
  profileImage: string | null,
}

const cx = classNames.bind(styles);

const GNB = ({ userName, profileImage }: GNBProps) => {
  const { showToast } = useToast();

  const handleClickNotification = () => {
    showToast("알림창 오픈");
  };

  const handleLogout = () => {
    showToast("로그아웃 되었습니다.");
  };

  return (
    <div className={cx("container")}>
      <Link href="/dashboard">
        <Image src="/images/bluekey-music-logo.svg" width={153} height={36} alt="블루키 뮤직" />
      </Link>
      <div className={cx("rightSide")}>
        <button type="button" onClick={handleClickNotification}>
          <Image src="/images/bell.svg" width={20} height={20} alt="알림" />
        </button>
        <Link href="/my-profile" className={cx("profile")}>
          {profileImage
            ? <Image src={profileImage} width={30} height={30} alt="프로필 이미지" />
            : <Avatar size={30} name="Alicia Dickerson" variant="marble" colors={["#bfd4f9", "#76a3f2", "#387ffd", "#ffd8d8", "#9b88ed"]} />}
          <span className={cx("profileName")}>{`${userName} 님`}</span>
        </Link>
        <button className={cx("logoutButton")} type="button" onClick={handleLogout}>
          <Image src="/images/logout.svg" width={18} height={15} alt="로그아웃" />
        </button>
      </div>
    </div>
  );
};

export default GNB;
