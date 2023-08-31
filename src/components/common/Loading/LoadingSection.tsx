import classNames from "classnames/bind";

import styles from "./LoadingSection.module.scss";
import Orbit from "./Orbit";

interface LoadingSectionProps {
  width?: number,
  height?: number,
  dark?: boolean
}

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param width 섹션 width (default: 100%)
 * @param height 섹션 height (default: 100%)
 * @param dark Orbit 검정 색상 설정
 * @returns 섹션 내 Orbit 로딩
 */
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
