import classNames from "classnames/bind";

import styles from "./ProgressBar.module.scss";

const cx = classNames.bind(styles);

/**
 * @author 임병욱
 * @param {number} value - 프로그래스바에서 사용될 값을 넘버 타입으로 넣어주시면 됩니다.
 */
const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className={cx("progressBar")}>
      <p>{`${value}%`}</p>
      <div className={cx("barWrapper")}>
        <div className={cx("bar")} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
