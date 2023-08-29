import classNames from "classnames/bind";

import ModalTooltipRoot from "@/components/common/Tooltip/ModalTooltip";
import { ITransactionUploadAlert } from "@/types/dto";

import TableBodyUI from "../../common/Table/Composition/TableBodyUI";
import TableCellUI from "../../common/Table/Composition/TableCellUI";
import TableContainerUI from "../../common/Table/Composition/TableContainerUI";
import TableHeaderUI from "../../common/Table/Composition/TableHeaderUI";
import TableRowUI from "../../common/Table/Composition/TableRowUI";

import styles from "./AlertDataTable.module.scss";

const MOCK_WARNINGS = [
  {
    rowIndex: 1,
    columnIndex: 2,
    columnName: "아티스트명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 2,
    columnIndex: 2,
    columnName: "앨범명",
    cellValue: "ㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇ",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 3,
    columnIndex: 3,
    columnName: "곡명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 2,
    columnIndex: 3,
    columnName: "앨범명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
];

const cx = classNames.bind(styles);

const AlertDataTable = ({ data = MOCK_WARNINGS }: { data?: ITransactionUploadAlert[] }) => {
  return (
    <div className={cx("tableContainer")}>
      <button className={cx("copyButton")} type="button">전체 복사</button>
      <TableContainerUI
        stickyHeader
        tableHeight={282}
      >
        <TableHeaderUI>
          <TableCellUI isHeader colWidth={100}>행</TableCellUI>
          <TableCellUI isHeader colWidth={120}>분류</TableCellUI>
          <TableCellUI isHeader>값</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {data.map((item) => {
            return (
              <TableRowUI key={`${item.columnIndex}${item.rowIndex}`}>
                <TableCellUI>{item.columnIndex}</TableCellUI>
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
