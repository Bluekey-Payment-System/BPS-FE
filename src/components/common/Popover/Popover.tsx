import React, { useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

type Unit = "px" | "rem" | "em" | "%" | "vh" | "vw" | "vmin" | "vmax";
type InsetValue = `${number}${Unit}`;

interface PopoverProps {
  top?: InsetValue;
  left?: InsetValue;
  right?: InsetValue;
  bottom?: InsetValue;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * 팝오버 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {InsetValue} top
 *  팝오버 컴포넌트의 위치 관련 top inset 값 (position relative부모 기준))
 * @param {InsetValue} left
 *  팝오버 컴포넌트의 위치 관련 top inset 값 (position relative부모 기준))
 * @param {InsetValue} right
 *  팝오버 컴포넌트의 위치 관련 top inset 값 (position relative부모 기준))
 * @param {InsetValue} bottom
 *  팝오버 컴포넌트의 위치 관련 top inset 값 (position relative부모 기준))
 * @param {Function} onClose 팝오버 바깥 영역 클릭 시 실행할 콜백함수 (주로 팝오버를 닫는 함수가 될 것 같습니다)
 *
 * @param {ReactNode} children 팝오버 안의 내용이 될 자식 컴포넌트들
 *
 * @example
 * ```
 * <div className="popover-parent" style={{position: "relative"}}>
 *  { isPopoverOpen &&
 *   <Popover
 *     top="10px" // popoverParent기준으로 해당 팝오버는 10px 아래에서 나타남
 *     onClose={()=>{setIsPopoverOpen(false)}}
 *   >
 *     <div>팝오버 내용</div>
 *   </Popover>
 *  }
 * </div>
 *```
 */
const Popover = React.memo(({
  top,
  left,
  right,
  bottom,
  onClose,
  children,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popoverRef, onClose);
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: `${top ?? "auto"}`,
        left: `${left ?? "auto"}`,
        right: `${right ?? "auto"}`,
        bottom: `${bottom ?? "auto"}`,
        cursor: "default",
      }}
      ref={popoverRef}
      role="presentation"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      {children}
    </div>
  );
});

export default Popover;
