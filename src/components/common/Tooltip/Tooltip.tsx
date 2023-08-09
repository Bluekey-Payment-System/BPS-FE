import classNames from "classnames/bind";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  message: string,
  style?: { x: number, y: number },
}

const cx = classNames.bind(styles);

const Tooltip = ({ message, style }: TooltipProps) => {
  return (
    <div className={cx("content")} style={{ left: style?.x, top: style?.y }}>
      <div className={cx("tooltip")}>{message}</div>
    </div>
  );
};

export default Tooltip;
