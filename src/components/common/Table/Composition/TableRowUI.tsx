import classNames from "classnames/bind";

import styles from "./TableRowUI.module.scss";

const cx = classNames.bind(styles);

const TableRowUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr className={cx("row")}>
      {children}
    </tr>
  );
};

export default TableRowUI;
