import classNames from "classnames/bind";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  message: string,
  style: { left:number, top: number }
  // children: HTMLElement
}

const cx = classNames.bind(styles);

const Tooltip = ({ message, style }: TooltipProps) => {
  return (
    <div className={cx("content")}>
      <div className={cx("tooltip")} style={{ left: style.left, top: style.top }}>{message}</div>
    </div>
  );
};

export default Tooltip;

// padding
// 7 16 <- min-width 설정해야 될 듯. min-width: 117px
// 7 10
