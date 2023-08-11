import classNames from "classnames/bind";

import styles from "./TableContainerUI.module.scss";

const cx = classNames.bind(styles);

interface TableContainerUIProps {
  paginationElement?: React.ReactNode
  stickyColumns?: [boolean, boolean, boolean]
  children: React.ReactNode
}

const TableContainerUI = ({
  paginationElement,
  stickyColumns = [false, false, false],
  children,
}: TableContainerUIProps) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("tableContainer")}>
        <table className={cx("table", { firstSticky: stickyColumns[0], lastSticky: stickyColumns[2] })}>{children}</table>
      </div>
      {paginationElement && <div className={cx("paginationContainer")}>{paginationElement}</div>}
    </div>
  );
};

export default TableContainerUI;
