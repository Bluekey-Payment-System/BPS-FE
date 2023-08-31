import classNames from "classnames/bind";

import styles from "./LoadingSection.module.scss";
import Orbit from "./Orbit";

interface LoadingSectionProps {
  width?: number,
  height?: number,
  dark?: boolean
}

const cx = classNames.bind(styles);

const LoadingSection = ({
  width, height, dark = false,
}: LoadingSectionProps) => {
  return (
    <div
      className={cx("container")}
      style={{
        width,
        height,
      }}
    >
      <Orbit dark={dark} />
    </div>
  );
};

export default LoadingSection;
