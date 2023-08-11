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
      <div className={cx("tableContainer")}>
        <table className={cx("table")}>{children}</table>
      </div>
      {paginationElement && <div className={cx("paginationContainer")}>{paginationElement}</div>}
    </div>
  );
};

export default TableContainerUI;
