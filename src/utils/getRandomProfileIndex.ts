import { RANDOM_PROFILES_LENGTH } from "@/constants/randomProfileList";

const calculateAsciiSum = (loginId: string) => {
  let totalSum = 0;

  for (let i = 0; i < loginId.length; i += 1) {
    totalSum += loginId.charCodeAt(i);
  }

  return totalSum;
};

const getRandomProfileIndex = (userId: string | number) => {
  if (typeof userId === "string") {
    const totalAsciiSum = calculateAsciiSum(userId);
    return totalAsciiSum % RANDOM_PROFILES_LENGTH;
  }
  return userId % RANDOM_PROFILES_LENGTH;
};

export default getRandomProfileIndex;
