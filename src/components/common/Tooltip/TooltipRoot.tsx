import {
  useState, useRef, MouseEvent,
} from "react";

import Tooltip from "./Tooltip";
import { checkTextOverflow, getPosition, PosType } from "./Tooltip.utils";
import TooltipPortal from "./TooltipPortal";

interface TooltipRootProps {
  message: string;
  alwaysVisible?: boolean
  children: React.ReactNode;
}

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param message 툴팁 메시지
 * @param alwaysVisible 텍스트 overflow 상관없이 hover 시 툴팁 항상 노출
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
const TooltipRoot = ({ children, message, alwaysVisible = false }: TooltipRootProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pos = useRef<PosType | null>(null);

  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    if (alwaysVisible) {
      setIsVisible(true);
    } else {
      pos.current = getPosition(ref);
      const visible = checkTextOverflow(e.currentTarget?.children[0]);
      setIsVisible(visible);
    }
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
