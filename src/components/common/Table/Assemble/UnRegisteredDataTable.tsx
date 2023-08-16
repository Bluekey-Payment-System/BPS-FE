import { IUnRegisteredData } from "@/types/dto.temp";

import TableBodyUI from "../Composition/TableBodyUI";
import TableCellUI from "../Composition/TableCellUI";
import TableContainerUI from "../Composition/TableContainerUI";
import TableHeaderUI from "../Composition/TableHeaderUI";
import TableRowUI from "../Composition/TableRowUI";

interface UnRegisteredDataTableProps {
  data: IUnRegisteredData[]
}

const UnRegisteredDataTable = ({ data }: UnRegisteredDataTableProps) => {
  return (
    <TableContainerUI
      stickyHeader
      tableHeight={278}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>행</TableCellUI>
        <TableCellUI isHeader>분류</TableCellUI>
        <TableCellUI isHeader>값</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {data.map((item) => {
          return (
            <TableRowUI key={item.id}>
              <TableCellUI>{item.row}</TableCellUI>
              <TableCellUI>{item.category}</TableCellUI>
              <TableCellUI>{item.value}</TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default UnRegisteredDataTable;
