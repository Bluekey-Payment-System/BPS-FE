import classNames from "classnames/bind";

import styles from "./Chip.module.scss";

type Fluctuation = "increase" | "decrease" | "same";

const cx = classNames.bind(styles);

/**
 * @param percentage 백분율 값
 * @returns 백분율을 나타내는 Chip 컴포넌트
 */
const Chip = ({ percentage }: { percentage: number }) => {
  let fluctuation: Fluctuation;

  if (percentage > 0) {
    fluctuation = "increase";
  } else if (percentage === 0) {
    fluctuation = "same";
  } else {
    fluctuation = "decrease";
  }

  return (
    <div className={cx("chipBox", fluctuation)}>{`${percentage}%`}</div>
  );
};

export default Chip;
