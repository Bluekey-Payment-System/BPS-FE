/**
 * 년/월을 'yyyy-mm' 형태로 변환하는 함수입니다.
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param {string} yearMonth 'yyyymm'으로 구성된 문자열
 * @returns {string} 'yyyy-mm' 형태의 문자열
 */
const convertYearMonthToQuery = (yearMonth: string): string => {
  const year = yearMonth.slice(0, 4);
  const month = yearMonth.slice(-2);

  return `${year}-${month}`;
};

export default convertYearMonthToQuery;
