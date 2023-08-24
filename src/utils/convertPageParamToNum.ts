/**
 * 페이지 파라미터를 숫자로 변환하는 함수입니다.
 * 변환 중에 발생한 오류나 음수 값은 처리하여 유효한 페이지 번호를 반환합니다.
 * @param {string | undefined} pageParam - 페이지 파라미터로 전달되는 문자열입니다.
 * @returns {number} 변환된 유효한 페이지 번호를 반환합니다.
 *                   파라미터가 숫자로 변환되지 않거나 1보다 작으면 1을 반환합니다.
 * @author 연우킴 https://github.com/drizzle96
 */
const convertPageParamToNum = (pageParam: string | undefined) => {
  return (Number.isNaN(Number(pageParam)) || Number(pageParam) < 1)
    ? 1
    : Math.floor(Number(pageParam));
};

export default convertPageParamToNum;
