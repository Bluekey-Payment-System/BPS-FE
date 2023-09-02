import { CSVLink } from "react-csv";

import classNames from "classnames/bind";

import ModalTooltipRoot from "@/components/common/Tooltip/ModalTooltip";
import { ITransactionUploadAlert } from "@/types/dto";

import TableBodyUI from "../../common/Table/Composition/TableBodyUI";
import TableCellUI from "../../common/Table/Composition/TableCellUI";
import TableContainerUI from "../../common/Table/Composition/TableContainerUI";
import TableHeaderUI from "../../common/Table/Composition/TableHeaderUI";
import TableRowUI from "../../common/Table/Composition/TableRowUI";

import styles from "./AlertDataTable.module.scss";

const cx = classNames.bind(styles);

/* 임시 */
const ExcelHeaders = [
  { label: "이름", key: "name" },
  { label: "전화번호", key: "number" },
  { label: "이메일", key: "email" },
];

const ExcelData = [
  { name: "kim", number: "12345", email: "nhy" },
  { name: "lee", number: "21555", email: "dfe" },
  { name: "park", number: "64467", email: "kih" },
];
/// ////////////////

const AlertDataTable = ({ data }: { data?: ITransactionUploadAlert[] }) => {
  return (
    <div className={cx("tableContainer")}>
      <CSVLink
        headers={ExcelHeaders}
        data={ExcelData}
        filename="미등록 데이터"
        className={cx("copyButton")}
        target="_blank"
      >
        전체 복사
      </CSVLink>
      <TableContainerUI
        stickyHeader
        tableHeight={282}
      >
        <TableHeaderUI>
          <TableCellUI isHeader colWidth={80}>행</TableCellUI>
          <TableCellUI isHeader colWidth={120}>분류</TableCellUI>
          <TableCellUI isHeader>값</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {data?.map((item) => {
            return (
              <TableRowUI key={`${item.columnIndex}${item.rowIndex}`}>
                <TableCellUI>{item.rowIndex}</TableCellUI>
                <TableCellUI>{item.columnName}</TableCellUI>
                <TableCellUI>
                  <ModalTooltipRoot message={item.cellValue}>
                    <p className={cx("ellipsis")}>
                      {item.cellValue}
                    </p>
                  </ModalTooltipRoot>
                </TableCellUI>
              </TableRowUI>
            );
          })}
        </TableBodyUI>
      </TableContainerUI>
    </div>
  );
};

export default AlertDataTable;
