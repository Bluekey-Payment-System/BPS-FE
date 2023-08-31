/**
 * 소수점 이하 자릿수를 설정한 최대 자릿수 이하로 포맷팅합니다.
 * @param {number} num - 포맷팅할 숫자입니다.
 * @param {number} maxNumDigits - 소수점 이하 최대 자릿수입니다.
 * @returns {string} 포맷팅된 숫자를 문자열로 반환합니다.
 */
const formatNumDigits = (num: number, maxNumDigits: number) => {
  const numDigits = (num).toString().split(".")[1]?.length || 0;
  const formattedNum = num.toFixed(Math.min(maxNumDigits, numDigits));

  return formattedNum;
};

/**
 * 차트 용 금액 포맷팅 함수입니다.
 * @param {number} money - 포맷팅할 금액입니다.
 * @returns {string}  포맷팅된 금액을 금액의 크기에 맞는 suffix와 함께 문자열로 반환합니다.
 */
const formatMoneyForChart = (money: number) => {
  let formattedMoney = money;
  const suffixes = ["", "K", "M", "B"];
  let suffixIndex = 0;

  while (formattedMoney >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedMoney /= 1000;
    suffixIndex += 1;
  }

  let maxNumDigits;
  if (suffixIndex === 0 || formattedMoney >= 100) {
    maxNumDigits = 0;
  } else if (formattedMoney >= 10) {
    maxNumDigits = 1;
  } else {
    maxNumDigits = 2;
  }

  const formattedNum = formatNumDigits(formattedMoney, maxNumDigits);
  return `₩${formattedNum}${suffixes[suffixIndex]}`;
};

/**
 * @author 연우킴 https://github.com/drizzle96
 * @param money 포맷팅할 금액입니다. `number | null` 타입의 값이 들어올 수 있습니다.
 * 금액으로 `null`이 들어오면 `- 원` 또는 `-`으로 포맷팅 됩니다.
 * @param formatType 금액 포맷 타입을 지정합니다. `card`, `chart`, `table` 중 하나의 값이어야 합니다.
 * @returns 타입에 맞게 포맷된 `string` 형태의 금액
 */
const formatMoney = (money: number | null, formatType: "card" | "chart" | "table") => {
  if (money === null) {
    return formatType === "card" ? "- 원" : "-";
  }
  const unit = 100000000;
  switch (formatType) {
    case "card":
      if (money >= unit) {
        return `${formatNumDigits(money / unit, 3)}억원`;
      } return `${money.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}원`;
    case "chart":
      return formatMoneyForChart(money);
    case "table":
      if (money >= unit) {
        return `₩${formatNumDigits(money / unit, 3)}억`;
      } return `₩${money.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}`;
    default:
      return "-";
  }
};

export default formatMoney;
