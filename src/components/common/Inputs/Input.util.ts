let idCounter = 0;
/**
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param prefix {string} 생성살 id 문자열의 prefix를 지정합니다. 기본값은 `bluekeymusic-id-`입니다.
 * @returns {string} `${prefix}${idCounter}`;
 * @example
 * ```ts
 * const newId = generateID("button-"); // button-1, button-2등의 고유한 id 문자열이 생성됩니다.
 * ```
 */
const generateID = (prefix = "blukeymusic-id-") => {
  idCounter += 1;
  return `${prefix}${idCounter}`;
};

export default generateID;
