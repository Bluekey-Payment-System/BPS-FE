import { ITrackStatus } from "@/types/dto";
import utilFormatMoney from "@/utils/utilFormatMoney";

import ProgressBar from "../ProgressBar/ProgressBar";

import TableBodyUI from "./Composition/TableBodyUI";
import TableCellUI from "./Composition/TableCellUI";
import TableContainerUI from "./Composition/TableContainerUI";
import TableRowUI from "./Composition/TableRowUI";

interface TrackStatusTableProps {
  data: ITrackStatus[]
  paginationElement?: React.ReactNode
}

const TrackStatusTable = ({ data, paginationElement }: TrackStatusTableProps) => {
  return (
    <TableContainerUI
      paginationElement={paginationElement}
    >
      <TableRowUI>
        <TableCellUI isHeader>곡명</TableCellUI>
        <TableCellUI isHeader>앨범명</TableCellUI>
        <TableCellUI isHeader>아티스트명</TableCellUI>
        <TableCellUI isHeader>매출액</TableCellUI>
        <TableCellUI isHeader>회사 이익</TableCellUI>
        <TableCellUI isHeader>정산액</TableCellUI>
        <TableCellUI isHeader>요율</TableCellUI>
      </TableRowUI>
      <TableBodyUI>
        {data.map((item) => {
          return (
            <TableRowUI key={item.track.id}>
              <TableCellUI>{item.track.name}</TableCellUI>
              <TableCellUI>{item.album.name}</TableCellUI>
              <TableCellUI>
                <div>
                  <p>{item.artist.name}</p>
                  <p>{item.artist.enName}</p>
                </div>
              </TableCellUI>
              <TableCellUI>{utilFormatMoney(item.revenue, "table")}</TableCellUI>
              <TableCellUI>{utilFormatMoney(item.netIncome, "table")}</TableCellUI>
              <TableCellUI>{utilFormatMoney(item.settlementAmount, "table")}</TableCellUI>
              <TableCellUI><ProgressBar value={item.commissionRate} /></TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default TrackStatusTable;
