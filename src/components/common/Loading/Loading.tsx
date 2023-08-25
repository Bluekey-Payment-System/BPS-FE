import classNames from "classnames/bind";

import styles from "./Loading.module.scss";

interface LoadingProps {
  width?: number | string,
  height?: number | string,
}

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param width 로딩 박스 width (default: 100%)
 * @param height 로딩 박스 height (default: 100%)
 * @returns 로딩 UI 컴포넌트
 */
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
