import { useState, useRef } from "react";

import { getPosition, PosType } from "./getPosition";
import Tooltip from "./Tooltip";
import TooltipPortal from "./TooltipPortal";

// import { getPosition, PosType } from "@/utils/hoc";
// import TooltipBox from "@/views/components/common/tooltip/TooltipBox";

interface PortalRootProps {
  children: React.ReactNode | React.ReactNode[];
  message: string;
}

const PortalRoot = ({ children, message }: PortalRootProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const pos = useRef<PosType | null>(null);

  const handleMouseOver = () => {
    pos.current = getPosition(ref);
    setShow(true);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <span
      ref={ref}
      onMouseOver={handleMouseOver}
      onMouseLeave={() => { return setShow(false); }}
    >
      {children}
      {show
        && (
        <TooltipPortal>
          <Tooltip message={message} style={pos.current?.style} />
        </TooltipPortal>
        )}
    </span>
  );
};

export default PortalRoot;
