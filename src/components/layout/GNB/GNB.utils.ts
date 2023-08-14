import { RANDOM_PROFILES_LENGTH } from "@/constants/randomProfileList";

const calculateAsciiSum = (loginId: string) => {
  let totalSum = 0;

  for (let i = 0; i < loginId.length; i += 1) {
    totalSum += loginId.charCodeAt(i);
  }

  return totalSum;
};

const getRandomProfileIndex = (loginId: string) => {
  const totlaAsciiSum = calculateAsciiSum(loginId);

  return totlaAsciiSum % RANDOM_PROFILES_LENGTH;
};

export default getRandomProfileIndex;
