import { useRef, useState } from "react";

import classNames from "classnames/bind";

import utilThrottle from "@/utils/utilThrottle";

import styles from "./TableContainerUI.module.scss";

const cx = classNames.bind(styles);

interface TableContainerUIProps {
  paginationElement?: React.ReactNode
  stickyColumns?: [boolean, boolean, boolean]
  tableWidth?: number
  children: React.ReactNode
}

const TableContainerUI = ({
  paginationElement,
  stickyColumns = [false, false, false],
  tableWidth,
  children,
}: TableContainerUIProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isShownColumnShadow, setIsShowColumnShadow] = useState([false, false, false]);
  const handleScrollTableContainer = () => {
    if (!tableContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
    setIsShowColumnShadow((prev) => {
      return [(scrollLeft > 0), prev[1], (scrollLeft + 1 < scrollWidth - clientWidth)];
    });
  };

  return (
    <div className={cx("container")}>
      <div className={cx("tableWrapper")} onScroll={utilThrottle(() => { handleScrollTableContainer(); }, 300)} ref={tableContainerRef}>
        <table
          className={cx("table", {
            firstSticky: stickyColumns[0],
            firstShadow: isShownColumnShadow[0],
            lastSticky: stickyColumns[2],
            lastShadow: isShownColumnShadow[2],
          })}
          style={{ width: tableWidth ? `${tableWidth}px` : "auto" }}
        >
          {children}
        </table>
      </div>
      {paginationElement && <div className={cx("paginationWrapper")}>{paginationElement}</div>}
    </div>
  );
};

export default TableContainerUI;
