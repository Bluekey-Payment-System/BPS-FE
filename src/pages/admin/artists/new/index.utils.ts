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
