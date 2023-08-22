import classNames from "classnames/bind";

import styles from "./Chip.module.scss";

type Fluctuation = "increase" | "decrease" | "same";

const cx = classNames.bind(styles);

/**
 * 숫자를 받아 상승/감소율 Chip을 리턴합니다. null의 경우 '-%'로 변환됩니다.
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param {number | null} percentage 백분율 값
 * @returns 백분율을 나타내는 Chip 컴포넌트
 */
const Chip = ({ percentage }: { percentage: number | null }) => {
  let fluctuation: Fluctuation;

  let percentageToString: string;
  if (percentage === null) {
    percentageToString = "- ";
    fluctuation = "same";
  } else {
    percentageToString = percentage.toString();

    if (percentage === 0) {
      fluctuation = "same";
    } else if (percentage > 0) {
      percentageToString = `+${percentageToString}`;
      fluctuation = "increase";
    } else {
      fluctuation = "decrease";
    }
  }

  return (
    <div className={cx("chipBox", fluctuation)}>{`${percentageToString}%`}</div>
  );
};

export default Chip;
