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

interface AlertDataTableProps {
  fileName: string;
  data: ITransactionUploadAlert[];
}

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param fileName 파일명
 * @param data 정산 내역 업로드 관련 warnings / errors 데이터
 * @returns warning / errors를 표시하는 데이터 테이블
 */
const AlertDataTable = ({ fileName, data }: AlertDataTableProps) => {
  return (
    <div className={cx("tableContainer")}>
      <CSVLink
        headers={ALERT_DATA_HEADERS}
        data={formatToExcelData(data)}
        filename={`${fileName}_경고 내역`}
        className={cx("copyButton")}
        target="_blank"
      >
        내역 다운로드
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
