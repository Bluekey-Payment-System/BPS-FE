/**
 * 정규표현식과 최소, 최대 길이를 받아 랜덤 문자열을 생성하는 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param regex {RegExp} 정규표현식
 * @param minLength {number} 문자열 최소 길이
 * @param maxLength {number} 문자열 최대 길이
 * @returns {string} 정규 표현식과 최소, 최대 길이에 맞는 랜덤 스트링 반환
 */
export const generateRandomStringWithRegex = (
  regex: RegExp,
  minLength: number,
  maxLength: number,
): string => {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?@*-_";
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let randomString = "";
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  while (!regex.test(randomString)) {
    randomString = "";
    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  }

  return randomString;
};
