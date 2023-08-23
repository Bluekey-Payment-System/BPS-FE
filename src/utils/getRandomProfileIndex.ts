import { RANDOM_PROFILES_LENGTH } from "@/constants/randomProfileList";

const calculateAsciiSum = (loginId: string) => {
  let totalSum = 0;

  for (let i = 0; i < loginId.length; i += 1) {
    totalSum += loginId.charCodeAt(i);
  }

  return totalSum;
};

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param userId 유저의 고유 id
 * @returns 유저에게 할당되는 고유한 프로필 이미지(svg 요소)
 */
const getRandomProfileIndex = (userId: string | number) => {
  if (typeof userId === "string") {
    const totlaAsciiSum = calculateAsciiSum(userId);
    return totlaAsciiSum % RANDOM_PROFILES_LENGTH;
  }
  return userId % RANDOM_PROFILES_LENGTH;
};

export default getRandomProfileIndex;
