import { ITrackStatus } from "@/types/dto";
import utilFormatMoney from "@/utils/utilFormatMoney";

import ProgressBar from "../ProgressBar/ProgressBar";

import TableBodyUI from "./Composition/TableBodyUI";
import TableCellUI from "./Composition/TableCellUI";
import TableContainerUI from "./Composition/TableContainerUI";
import TableHeaderUI from "./Composition/TableHeaderUI";
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
      <TableHeaderUI>
        <TableCellUI isHeader>곡명</TableCellUI>
        <TableCellUI isHeader>앨범명</TableCellUI>
        <TableCellUI isHeader>아티스트명</TableCellUI>
        <TableCellUI isHeader>매출액</TableCellUI>
        <TableCellUI isHeader>회사 이익</TableCellUI>
        <TableCellUI isHeader>정산액</TableCellUI>
        <TableCellUI isHeader align="left">요율</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {data.map((item) => {
          return (
            <TableRowUI key={item.track.id}>
              <TableCellUI>{item.track.name}</TableCellUI>
              <TableCellUI>{item.album.name}</TableCellUI>
              <TableCellUI>
                <div style={{ textAlign: "center" }}>
                  <p>{item.artist.name}</p>
                  <p>{item.artist.enName}</p>
                </div>
              </TableCellUI>
              <TableCellUI>{utilFormatMoney(item.revenue, "table")}</TableCellUI>
              <TableCellUI>{utilFormatMoney(item.netIncome, "table")}</TableCellUI>
              <TableCellUI>{utilFormatMoney(item.settlementAmount, "table")}</TableCellUI>
              <TableCellUI align="left"><ProgressBar value={item.commissionRate} /></TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default TrackStatusTable;
