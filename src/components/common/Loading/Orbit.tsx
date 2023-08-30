import classNames from "classnames/bind";

import styles from "./Orbit.module.scss";

const cx = classNames.bind(styles);

const Orbit = ({ dark = false }: { dark?: boolean }) => {
  return (
    <div className={cx("orbit", { dark: dark === true })} />
  );
};

export default Orbit;
