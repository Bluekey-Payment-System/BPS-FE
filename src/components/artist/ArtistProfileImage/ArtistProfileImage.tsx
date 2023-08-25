import classNames from "classnames/bind";
import Image from "next/image";

import DefaultProfileImage from "@/components/common/DefaultProfileImage/DefaultProfileImage";

import styles from "./ArtistProfileImage.module.scss";

interface ArtistProfileImageProps {
  memberId: number,
  profileImageUrl: string | null,
}

const cx = classNames.bind(styles);

const ArtistProfileImage = ({ memberId, profileImageUrl }: ArtistProfileImageProps) => {
  if (!profileImageUrl) {
    return (
      <DefaultProfileImage
        size={30}
        userId={memberId}
      />
    );
  }

  return (
    <Image className={cx("profileImage")} src={profileImageUrl} width={30} height={30} alt="아티스트 프로필 이미지" />
  );
};

export default ArtistProfileImage;
