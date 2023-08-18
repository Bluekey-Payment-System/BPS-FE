import { useRef, useState } from "react";

import classNames from "classnames/bind";

import throttle from "@/utils/throttle";

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

/**
 * #### 테이블 컨테이너 컴포넌트입니다.
 * ##### 이 컴포넌트는 테이블을 감싸고 필요한 스타일 및 기능을 제공합니다.
 * @param {React.ReactNode} paginationElement - `(Optional)` 페이지네이션 컴포넌트
 * @param {boolean} stickyHeader - `(Optional / Default = false)` 테이블 헤더를 상단에 고정할지 여부를 나타냅니다.
 * 해당 속성은 아래 `tableHeight` 속성과 같이 사용해야 합니다.
 * @param {boolean} stickyFirstCol - `(Optional / Default = false)` 첫 번째 열을 왼쪽에 고정할지 여부를 나타냅니다.
 * 해당 속성은 아래 `tableWidth` 속성과 같이 사용해야 합니다.
 * @param {boolean} stickyLastCol - `(Optional / Default = false)` 마지막 열을 오른쪽에 고정할지 여부를 나타냅니다.
 * 해당 속성은 아래 `tableWidth` 속성과 같이 사용해야 합니다.
 * @param {number} tableWidth - `(Optional)` 열을 고정할 때 지정할 테이블의 너비입니다.
 * @param {number} tableHeight - `(Optional)` 헤더를 고정할 때 지정할 테이블의 높이입니다.
 * @param {React.ReactNode} children - 테이블 내용을 포함한 React 노드입니다.
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 */
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
            ? throttle(handleScrollTableContainer, 300)
            : undefined
        }
        ref={tableContainerRef}
        style={{ height: tableHeight ? `${tableHeight}px` : "auto" }}
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
