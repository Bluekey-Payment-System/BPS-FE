import classNames from "classnames/bind";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  message: string,
  style: { left: number, top: number } | undefined,
}

const cx = classNames.bind(styles);

const Tooltip = ({ message, style }: TooltipProps) => {
  return (
    <div className={cx("content")} style={{ left: style?.left, top: style?.top }}>
      <div className={cx("tooltip")}>{message}</div>
    </div>
  );
};

export default Tooltip;
