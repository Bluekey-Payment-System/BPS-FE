import { ITransactionUploadAlert } from "@/types/dto";

import TableBodyUI from "../../common/Table/Composition/TableBodyUI";
import TableCellUI from "../../common/Table/Composition/TableCellUI";
import TableContainerUI from "../../common/Table/Composition/TableContainerUI";
import TableHeaderUI from "../../common/Table/Composition/TableHeaderUI";
import TableRowUI from "../../common/Table/Composition/TableRowUI";

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
    cellValue: "0.0",
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

const AlertDataTable = ({ data = MOCK_WARNINGS }: { data?: ITransactionUploadAlert[] }) => {
  return (
    <div>
      <button>복사하기</button>
      <TableContainerUI
        stickyHeader
        tableHeight={278}
        tableWidth={455}
      >
        <TableHeaderUI>
          <TableCellUI isHeader>행</TableCellUI>
          <TableCellUI isHeader>분류</TableCellUI>
          <TableCellUI isHeader>값</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {data.map((item) => {
            return (
              <TableRowUI key={`${item.columnIndex}${item.rowIndex}`}>
                <TableCellUI>{item.columnIndex}</TableCellUI>
                <TableCellUI>{item.columnName}</TableCellUI>
                <TableCellUI>{item.cellValue}</TableCellUI>
              </TableRowUI>
            );
          })}
        </TableBodyUI>
      </TableContainerUI>
    </div>
  );
};

export default AlertDataTable;
