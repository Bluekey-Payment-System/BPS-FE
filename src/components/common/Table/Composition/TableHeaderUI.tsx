import classNames from "classnames/bind";

import styles from "./TableHeaderUI.module.scss";

const cx = classNames.bind(styles);

const TableHeaderUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
      <tr className={cx("headRow")}>{children}</tr>
    </thead>
  );
};

export default TableHeaderUI;
