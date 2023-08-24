import { MouseEvent, useRef, useState } from "react";

import classNames from "classnames/bind";

import Tooltip from "./Tooltip";
import styles from "./Tooltip.module.scss";

interface ModalTooltipProps {
  message: string,
  children: React.ReactNode
}

const cx = classNames.bind(styles);

const ModalTooltipRoot = ({ message, children }: ModalTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget?.children[0]);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className={cx("tooltipRoot")}
      ref={tooltipRef}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible
      && <Tooltip message={message} style={{ x: 100, y: 100 }} />}
    </div>
  );
};

export default ModalTooltipRoot;
