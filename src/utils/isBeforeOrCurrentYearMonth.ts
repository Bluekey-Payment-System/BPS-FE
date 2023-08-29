/* eslint-disable radix */

/**
 * @author 임병욱
 * @param {string} yearMonth 현재 시간보다 미래의 시간이 오면 false를 반환합니다.
 * @return {boolean}
*/
const isBeforeOrCurrentYearMonth = (yearMonth: string): boolean => {
  if (!/^\d{6}$/.test(yearMonth)) {
    return false; // yyyymm 형식이 아닌 경우
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const inputYear = parseInt(yearMonth.substring(0, 4));
  const inputMonth = parseInt(yearMonth.substring(4, 6));

  if (inputYear > currentYear || (inputYear === currentYear && inputMonth > currentMonth)) {
    return false;
  }

  return true;
};

export default isBeforeOrCurrentYearMonth;
