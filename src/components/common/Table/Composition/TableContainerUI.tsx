import classNames from "classnames/bind";

import styles from "./TableContainerUI.module.scss";

const cx = classNames.bind(styles);

interface TableContainerUIProps {
  children: React.ReactNode
  paginationElement?: React.ReactNode
}

const TableContainerUI = ({ paginationElement, children }: TableContainerUIProps) => {
  return (
    <div className={cx("wrapper")}>
      <table className={cx("table")}>{children}</table>
      {paginationElement && <div className={cx("paginationWrapper")}>{paginationElement}</div>}
    </div>
  );
};

export default TableContainerUI;
