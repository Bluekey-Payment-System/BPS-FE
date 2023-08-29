/* eslint-disable radix */
const subtractMonths = (yyyymm: string, months: number): string[] => {
  const year = parseInt(yyyymm.slice(0, 4));
  const month = parseInt(yyyymm.slice(4)) - 1; // 월은 0부터 11로 표현됨

  const targetDate = new Date(year, month, 1);
  targetDate.setMonth(targetDate.getMonth() - months);

  const newYear = targetDate.getFullYear();
  const newMonth = targetDate.getMonth() + 1;

  const newMonthsAdjusted = newMonth.toString().padStart(2, "0");
  const newYyyymm = `${newYear}${newMonthsAdjusted}`;

  return [yyyymm, newYyyymm];
};

export default subtractMonths;
