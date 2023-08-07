// import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// const TooltipPortal = ({ children }: { children: React.ReactNode }) => {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//     return () => { return setMounted(false); };
//   }, []);

//   const tooltipRoot = typeof window !== "undefined" && document.getElementById("tooltip-root");
//   if (!mounted) return null;
//   return createPortal(children, tooltipRoot as HTMLElement);
// };

// export default TooltipPortal;

const TooltipPortal = ({ children }: { children: React.ReactNode }) => {
  const tooltipRoot = document.getElementById("tooltip-root");
  return createPortal(children, tooltipRoot as Element);
};

export default TooltipPortal;
