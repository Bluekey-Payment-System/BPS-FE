import { useRef, useState } from "react";

import classNames from "classnames/bind";

import utilThrottle from "@/utils/utilThrottle";

import styles from "./TableContainerUI.module.scss";

const cx = classNames.bind(styles);

interface TableContainerUIProps {
  paginationElement?: React.ReactNode
  stickyHeader?: boolean
  stickyFirstCol?: boolean
  stickyLastCol?: boolean
  tableWidth?: number
  tableHeight?: number
  children: React.ReactNode
}

const TableContainerUI = ({
  paginationElement,
  stickyHeader = false,
  stickyFirstCol = false,
  stickyLastCol = false,
  tableWidth,
  tableHeight,
  children,
}: TableContainerUIProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [showFirstColShadow, setShowFirstColShadow] = useState(false);
  const [showLastColShadow, setShowLastColShadow] = useState(false);
  const handleScrollTableContainer = () => {
    if (!tableContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
    if (stickyFirstCol) setShowFirstColShadow(scrollLeft > 0);
    if (stickyLastCol) setShowLastColShadow(scrollLeft + 1 < scrollWidth - clientWidth);
  };

  return (
    <div className={cx("container")}>
      <div
        className={cx("tableWrapper")}
        onScroll={
          (stickyFirstCol || stickyLastCol)
            ? utilThrottle(() => { handleScrollTableContainer(); }, 300)
            : undefined
        }
        ref={tableContainerRef}
        style={{ height: tableHeight ? `${tableHeight}px` : "100%" }}
      >
        <table
          className={cx("table", {
            stickyHeader,
            stickyFirstCol,
            stickyLastCol,
            showFirstColShadow,
            showLastColShadow,
          })}
          style={{ width: tableWidth ? `${tableWidth}px` : "100%" }}
        >
          {children}
        </table>
      </div>
      {paginationElement && <div className={cx("paginationWrapper")}>{paginationElement}</div>}
    </div>
  );
};

export default TableContainerUI;
