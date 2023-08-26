/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param num 1000 이상의 숫자
 * @return K 단위가 붙는 숫자 포맷
 * @example const numberFormatToKilo = formatNumberToKilo(10000.12345); // '10K'
 */
const formatNumberToKilo = (num: number): string => {
  let formatPercentage = Math.trunc(num / 1000).toString();
  formatPercentage += "K";

  return formatPercentage;
};

export default formatNumberToKilo;
