import classNames from "classnames/bind";

import styles from "./Chip.module.scss";

type Fluctuation = "increase" | "decrease" | "same";

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param percentage 백분율 값
 * @returns 백분율을 나타내는 Chip 컴포넌트
 */
const Chip = ({ percentage }: { percentage: number | null }) => {
  let fluctuation: Fluctuation;

  if (!percentage) {
    fluctuation = "same";
  } else if (percentage > 0) {
    fluctuation = "increase";
  } else {
    fluctuation = "decrease";
  }

  return (
    <div className={cx("chipBox", fluctuation)}>{percentage ? `${percentage}%` : "0%"}</div>
  );
};

export default Chip;
