import Avatar from "boring-avatars";

import { COMBINATION_COLORS, RANDOM_PROFILES } from "@/constants/randomProfileList";
import getRandomProfileIndex from "@/utils/getRandomProfileIndex";

interface DefaultProfileImageProps {
  userId: string | number,
  size: number
}

/**
 * userId에 따라 기본 프로필 이미지를 고유하게 할당합니다.
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param {string | number} userId 유저 loginId 또는 memberId
 * @param {number} size 프로필 이미지 사이즈
 * @returns 기본 프로필 이미지
 */
const DefaultProfileImage = ({ userId, size }: DefaultProfileImageProps) => {
  return (
    <Avatar
      size={size}
      name={RANDOM_PROFILES[getRandomProfileIndex(userId)]}
      variant="marble"
      colors={COMBINATION_COLORS}
    />
  );
};

export default DefaultProfileImage;
