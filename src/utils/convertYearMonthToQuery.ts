/**
 * 년/월을 'yyyy-mm' 형태로 변환하는 함수입니다.
 * 파라미터로 년/월을 받지 않는 경우, 현재 날짜를 기준으로 변환합니다.
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param {string | undefined} yearMonth 'yyyymm'으로 구성된 문자열 또는 undefined
 * @returns {string} 'yyyy-mm' 형태의 문자열
 */
const convertYearMonthToQuery = (yearMonth?: string): string => {
  let year: string;
  let month: string;

  if (yearMonth) {
    year = yearMonth.slice(0, 4);
    month = yearMonth.slice(-2);
  }
  const now = new Date();
  year = now.getFullYear().toString();
  month = (now.getMonth() + 1).toString();

  if (month.length === 1) {
    month = month.padStart(2, "0");
  }

  return `${year}-${month}`;
};

export default convertYearMonthToQuery;
