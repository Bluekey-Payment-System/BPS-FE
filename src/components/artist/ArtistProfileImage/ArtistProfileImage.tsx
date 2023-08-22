import Avatar from "boring-avatars";
import classNames from "classnames/bind";
import Image from "next/image";

import { COMBINATION_COLORS, RANDOM_PROFILES } from "@/constants/randomProfileList";
import getRandomProfileIndex from "@/utils/getRandomProfileIndex";

import styles from "./ArtistProfileImage.module.scss";

interface ArtistProfileImageProps {
  memberId: number,
  profileImageUrl: string | null,
}

const cx = classNames.bind(styles);

const ArtistProfileImage = ({ memberId, profileImageUrl }: ArtistProfileImageProps) => {
  if (!profileImageUrl) {
    return (
      <Avatar
        size={30}
        name={RANDOM_PROFILES[getRandomProfileIndex(memberId)]}
        variant="marble"
        colors={COMBINATION_COLORS}
      />
    );
  }

  return (
    <Image className={cx("profileImage")} src={profileImageUrl} width={30} height={30} alt="아티스트 프로필 이미지" />
  );
};

export default ArtistProfileImage;
