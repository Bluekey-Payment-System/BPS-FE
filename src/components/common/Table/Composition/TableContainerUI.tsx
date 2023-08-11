import { useRef, useState } from "react";

import classNames from "classnames/bind";

import styles from "./TableContainerUI.module.scss";

const cx = classNames.bind(styles);

interface TableContainerUIProps {
  paginationElement?: React.ReactNode
  stickyColumns?: [boolean, boolean, boolean]
  children: React.ReactNode
}

const TableContainerUI = ({
  paginationElement,
  stickyColumns = [false, false, false],
  children,
}: TableContainerUIProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isShownColumnShadow, setIsShowColumnShadow] = useState([false, false, false]);
  const handleScrollTableContainer = () => {
    // TODO: 스로틀링
    if (!tableContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
    setIsShowColumnShadow((prev) => {
      return [(scrollLeft > 0), prev[1], (scrollLeft + 1 < scrollWidth - clientWidth)];
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("tableContainer")} onScroll={handleScrollTableContainer} ref={tableContainerRef}>
        <table className={cx("table", {
          firstSticky: stickyColumns[0],
          firstShadow: isShownColumnShadow[0],
          lastSticky: stickyColumns[2],
          lastShadow: isShownColumnShadow[2],
        })}
        >
          {children}
        </table>
      </div>
      {paginationElement && <div className={cx("paginationContainer")}>{paginationElement}</div>}
    </div>
  );
};

export default TableContainerUI;
