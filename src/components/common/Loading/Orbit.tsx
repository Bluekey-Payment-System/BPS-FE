import classNames from "classnames/bind";

import styles from "./Orbit.module.scss";

const cx = classNames.bind(styles);

const Orbit = () => {
  return (
    <div className={cx("orbit")} />
  );
};

export default Orbit;
