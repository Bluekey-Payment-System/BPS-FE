/**
 * getCurrentMonthAsPath 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @returns {string} 현재 월을 기준으로 한달 전의 YYYYMM을 문자열로 반환합니다.
 */

const getLatestYearMonthString = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1); // 한 달을 빼줍니다.

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.

  const yearStr = year.toString();
  const monthStr = month < 10 ? `0${month}` : month.toString(); // 월이 한 자리 수인 경우 앞에 0을 붙입니다.

  const yyyymm = yearStr + monthStr;
  return yyyymm;
};

export default getLatestYearMonthString;
