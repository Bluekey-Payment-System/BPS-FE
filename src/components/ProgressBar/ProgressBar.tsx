import classNames from "classnames";

import styles from "./ProgressBar.module.scss";

const cx = classNames.bind(styles);

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
