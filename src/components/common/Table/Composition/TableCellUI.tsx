import classNames from "classnames/bind";

import styles from "./TableCellUI.module.scss";

const cx = classNames.bind(styles);

interface TableCellUIProps {
  children: React.ReactNode
  isHeader?: boolean
  align?: "center" | "left"
  colWidth?: number
}

/**
 * #### 테이블 셀 컴포넌트입니다.
 * ##### 이 컴포넌트는 테이블의 각 셀을 나타내며, 헤더 셀과 바디 셀로 사용할 수 있습니다.
 * @param {boolean} isHeader - `(Optional / Default = false)` 헤더 셀인지 여부를 나타냅니다.
 * @param {"center" | "left"} align - `(Optional / Default = "center")` 셀 내부의 수평 정렬를 나타냅니다.
 * "center" 또는 "left" 값을 가질 수 있습니다.
 * @param {number} colWidth - `(Optional)` 열의 너비를 지정합니다. 헤더 셀에 isHeader와 함께 전달할 수 있습니다.
 * colWidth를 전달하지 않은 열들은 너비를 균등하게 나눠 가집니다.
 * @param {React.ReactNode} children - 테이블 내용을 포함한 React 노드입니다.
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 */
const TableCellUI = ({
  children, isHeader = false, align = "center", colWidth,
}: TableCellUIProps) => {
  return (
    isHeader
      ? (
        <th className={cx("cell", align)} style={{ width: colWidth ? `${colWidth}px` : "auto" }}>
          {children}
        </th>
      )
      : (
        <td className={cx("cell", align)}>
          {children}
        </td>
      )
  );
};

export default TableCellUI;
