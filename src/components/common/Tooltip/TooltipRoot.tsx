import { useState, useRef } from "react";

import { getPosition, PosType } from "./getPosition";
import Tooltip from "./Tooltip";
import TooltipPortal from "./TooltipPortal";

interface PortalRootProps {
  children: React.ReactNode;
  message: string;
  gap?: number;
}

const PortalRoot = ({ children, message, gap }: PortalRootProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pos = useRef<PosType | null>(null);

  const handleMouseOver = () => {
    pos.current = getPosition(ref, gap);
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

export default PortalRoot;
