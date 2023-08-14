import classNames from "classnames/bind";

import ProgressBar from "@/components/common/ProgressBar/ProgressBar";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { ITrackStatus } from "@/types/dto.temp";
import utilFormatMoney from "@/utils/utilFormatMoney";

import TableBodyUI from "./Composition/TableBodyUI";
import TableCellUI from "./Composition/TableCellUI";
import TableContainerUI from "./Composition/TableContainerUI";
import TableHeaderUI from "./Composition/TableHeaderUI";
import TableRowUI from "./Composition/TableRowUI";
import styles from "./TrackStatusTable.module.scss";

const cx = classNames.bind(styles);

interface TrackStatusTableProps {
  data: ITrackStatus[]
  paginationElement?: React.ReactNode
}

const TrackStatusTable = ({ data, paginationElement }: TrackStatusTableProps) => {
  return (
    <TableContainerUI
      paginationElement={paginationElement}
      stickyColumns={[true, false, false]}
      tableWidth={1200}
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
              <TableCellUI>
                <TooltipRoot message={item.track.name}>
                  <p className={cx("ellipsis")}>{item.track.name}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={item.album.name}>
                  <p className={cx("ellipsis")}>{item.album.name}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <div>
                  <TooltipRoot message={item.artist.name}>
                    <p className={cx("artistName", "ellipsis")}>{item.artist.name}</p>
                  </TooltipRoot>
                  <p className={cx("artistName", "enName", "ellipsis")}>{item.artist.enName}</p>
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
