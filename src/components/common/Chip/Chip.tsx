import classNames from "classnames/bind";

import formatNumberToKilo from "@/utils/formatNumberToKilo";

import styles from "./Chip.module.scss";
import { Fluctuation, getFluctuation } from "./Chip.utils";

const cx = classNames.bind(styles);

/**
 * 숫자를 받아 상승/감소율 Chip을 리턴합니다. null의 경우 '-%'로 변환됩니다.
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param {number | null} percentage 백분율 값
 * @returns 백분율을 나타내는 Chip 컴포넌트
 */
const Chip = ({ percentage }: { percentage: number | null }) => {
  const fluctuation: Fluctuation = getFluctuation(percentage);
  let percentageFormat: string;

  if (percentage === null) {
    percentageFormat = "- ";
  } else if (percentage === 0) {
    percentageFormat = "0";
  } else {
    percentageFormat = percentage.toString();
    if (Math.abs(percentage) >= 1000) {
      percentageFormat = formatNumberToKilo(percentage);
    }
    if (fluctuation === "increase") {
      percentageFormat = `+${percentageFormat}`;
    }
  }

  return (
    <div className={cx("chipBox", fluctuation)}>{`${percentageFormat}%`}</div>
  );
};

export default Chip;
