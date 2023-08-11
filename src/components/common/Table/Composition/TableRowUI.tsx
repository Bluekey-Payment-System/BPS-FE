import classNames from "classnames/bind";

import styles from "./TableRowUI.module.scss";

const cx = classNames.bind(styles);

interface TableRowUIProps {
  children: React.ReactNode
}

const TableRowUI = ({ children }: TableRowUIProps) => {
  return (
    <tr className={cx("row")}>
      {children}
    </tr>
  );
};

export default TableRowUI;
