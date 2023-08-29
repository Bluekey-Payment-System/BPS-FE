/* eslint-disable radix */

/**
 * @author 임병욱
 * @param {string} yyyymm 원하는 날짜 yyyymm 형식
 * @param {number} months 지정된 날짜에서 number에 해당하는 월만큼 빼기
 * @return {string} ex)202306, 3이 입력되면 202304 출력
*/
const subtractMonths = (yyyymm: string, months: number): string => {
  const year = parseInt(yyyymm.slice(0, 4));
  const month = parseInt(yyyymm.slice(4)) - 1; // 월은 0부터 11로 표현됨

  const targetDate = new Date(year, month, 1);
  targetDate.setMonth(targetDate.getMonth() - months + 1);

  const newYear = targetDate.getFullYear();
  const newMonth = targetDate.getMonth() + 1;

  const newMonthsAdjusted = newMonth.toString().padStart(2, "0");
  const newYyyymm = `${newYear}${newMonthsAdjusted}`;

  return newYyyymm;
};

export default subtractMonths;
