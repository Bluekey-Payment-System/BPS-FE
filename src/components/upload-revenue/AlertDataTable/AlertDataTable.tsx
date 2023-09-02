import { CSVLink } from "react-csv";

import classNames from "classnames/bind";

import ModalTooltipRoot from "@/components/common/Tooltip/ModalTooltip";
import { ALERT_DATA_HEADERS } from "@/constants/alertDataHeaders";
import { ITransactionUploadAlert } from "@/types/dto";

import TableBodyUI from "../../common/Table/Composition/TableBodyUI";
import TableCellUI from "../../common/Table/Composition/TableCellUI";
import TableContainerUI from "../../common/Table/Composition/TableContainerUI";
import TableHeaderUI from "../../common/Table/Composition/TableHeaderUI";
import TableRowUI from "../../common/Table/Composition/TableRowUI";

import styles from "./AlertDataTable.module.scss";
import { formatToExcelData } from "./AlertDataTable.utils";

const cx = classNames.bind(styles);

const AlertDataTable = ({ data }: { data: ITransactionUploadAlert[] }) => {
  return (
    <div className={cx("tableContainer")}>
      <CSVLink
        headers={ALERT_DATA_HEADERS}
        data={formatToExcelData(data)}
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
          {data.map((item) => {
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
