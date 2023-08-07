import classNames from "classnames/bind";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  message: string,
  // children: HTMLElement
}

const cx = classNames.bind(styles);

const Tooltip = ({ message }: TooltipProps) => {
  return (
    <div className={cx("content")}>
      <div className={cx("tooltip")}>{message}</div>
    </div>
  );
};

export default Tooltip;

// padding
// 7 16 <- min-width 설정해야 될 듯. min-width: 117px
// 7 10
