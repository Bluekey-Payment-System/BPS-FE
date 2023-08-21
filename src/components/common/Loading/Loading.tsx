import classNames from "classnames/bind";

import styles from "./Loading.module.scss";

interface LoadingProps {
  width: number | string,
  height: number | string,
}

const cx = classNames.bind(styles);

const Loading = ({ width, height }: LoadingProps) => {
  return (
    <div
      className={cx("container")}
      style={{
        width,
        height,
      }}
    >
      <div className={cx("loader")} />
    </div>
  );
};

export default Loading;
