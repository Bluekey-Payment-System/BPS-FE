import classNames from "classnames/bind";

import styles from "./TableHeaderUI.module.scss";

const cx = classNames.bind(styles);

interface TableHeaderUIProps {
  children: React.ReactNode
}

const TableHeaderUI = ({ children }: TableHeaderUIProps) => {
  return (
    <thead className={cx("head")}>
      <tr className={cx("headRow")}>{children}</tr>
    </thead>
  );
};

export default TableHeaderUI;
