import classNames from "classnames/bind";

import styles from "./TableCellUI.module.scss";

const cx = classNames.bind(styles);

interface TableCellUIProps {
  children: React.ReactNode
  isHeader?: boolean
}

const TableCellUI = ({ children, isHeader = false }: TableCellUIProps) => {
  return (
    isHeader
      ? (
        <th className={cx("headCell")}>
          {children}
        </th>
      )
      : (
        <td className={cx("bodyCell")}>
          {children}
        </td>
      )
  );
};

export default TableCellUI;
