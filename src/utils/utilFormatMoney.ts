const formatMoneyForDoughnut = (money: number) => {
  let formattedMoney = money;
  const suffixes = ["", "K", "M", "B"];
  let suffixIndex = 0;

  while (formattedMoney >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedMoney /= 1000;
    suffixIndex += 1;
  }

  let formattedNum;
  if (suffixIndex === 0 || formattedMoney >= 100) {
    formattedNum = formattedMoney.toFixed(0);
  } else if (formattedMoney >= 10) {
    formattedNum = formattedMoney.toFixed(1);
  } else {
    formattedNum = formattedMoney.toFixed(2);
  }

  return `₩${formattedNum}${suffixes[suffixIndex]}`;
};

const formatLargeNum = (num: number, unit: number) => {
  const numDigits = (num / unit).toString().split(".")[1]?.length || 0;
  const formattedNum = (numDigits <= 3)
    ? (Math.round((num / unit) * 1000) / 1000).toFixed(numDigits)
    : (Math.round((num / unit) * 1000) / 1000).toFixed(3);
  return formattedNum;
};

/**
 * @author 연우킴 https://github.com/drizzle96
 * @param money 금액
 * @param formatType 금액 포맷 타입을 지정합니다. "card", "doughnut", "table" 중 하나의 값이어야 합니다.
 * @returns 타입에 맞게 포맷된 string 형태의 금액
 */
const utilFormatMoney = (money: number, formatType: "card" | "doughnut" | "table") => {
  if (!money && money !== 0) return "-";
  const unit = 100000000;
  switch (formatType) {
    case "card":
      if (money >= unit) {
        return `${formatLargeNum(money, unit)}억원`;
      } return `${money.toLocaleString("ko-KR")}원`;
    case "doughnut":
      return formatMoneyForDoughnut(money);
    case "table":
      if (money >= unit) {
        return `₩${formatLargeNum(money, unit)}억`;
      } return `₩${money.toLocaleString("ko-KR")}`;
    default:
      return "-";
  }
};

export default utilFormatMoney;
