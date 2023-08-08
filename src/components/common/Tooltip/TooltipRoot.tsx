import { useState, useRef } from "react";

import { getPosition, PosType } from "./getPosition";
import Tooltip from "./Tooltip";
import TooltipPortal from "./TooltipPortal";

interface TooltipRootProps {
  children: React.ReactNode;
  message: string;
}

/**
 * @param message 툴팁 메시지
 * @param children hover 대상 요소
 * @example
 * ```
 * <div className={cx("priceBox")}>
    <TooltipRoot message="이름이 긴 아티스트">
      <p className={cx("price")}>이름이 긴 아...</p>
    </TooltipRoot>
    <Chip percentage={2.5} />
 * </div>
 * ```
 * @returns hover 대상 요소 하단에 툴팁 노출
 */
const TooltipRoot = ({ children, message }: TooltipRootProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pos = useRef<PosType | null>(null);

  const handleMouseOver = () => {
    pos.current = getPosition(ref);
    setIsVisible(true);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      style={{ display: "inline-block" }}
      ref={ref}
      onMouseOver={handleMouseOver}
      onMouseLeave={() => { return setIsVisible(false); }}
    >
      {children}
      {isVisible
        && (
        <TooltipPortal>
          <Tooltip message={message} style={pos.current?.style} />
        </TooltipPortal>
        )}
    </div>
  );
};

export default TooltipRoot;
