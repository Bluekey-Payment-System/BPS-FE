import classNames from "classnames/bind";

import styles from "./TableCellUI.module.scss";

const cx = classNames.bind(styles);

interface TableCellUIProps {
  children: React.ReactNode
  isHeader?: boolean
  align?: "center" | "left";
}

const TableCellUI = ({ children, isHeader = false, align = "center" }: TableCellUIProps) => {
  return (
    isHeader
      ? (
        <th className={cx("cell", align === "left" && "left")}>
          {children}
        </th>
      )
      : (
        <td className={cx("cell", align === "left" && "left")}>
          {children}
        </td>
      )
  );
};

export default TableCellUI;
