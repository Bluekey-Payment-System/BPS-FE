import classNames from "classnames/bind";

import ProgressBar from "@/components/common/ProgressBar/ProgressBar";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import formatMoney from "@/utils/formatMoney";

import styles from "./TrackStatusTable.module.scss";

const cx = classNames.bind(styles);

interface TrackStatusTableProps {
  data: IGetAdminTrackTransactionResponse
  paginationElement?: React.ReactNode
}

const TrackStatusTable = ({ data, paginationElement }: TrackStatusTableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalItems, contents } = data;
  return (
    <TableContainerUI
      paginationElement={paginationElement}
      stickyFirstCol
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
        {contents.map((item) => {
          return (
            <TableRowUI key={item.track.trackId}>
              <TableCellUI>
                <TooltipRoot message={item.track.koTrackName}>
                  <p className={cx("ellipsis")}>{item.track.koTrackName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={item.album.koAlbumName}>
                  <p className={cx("ellipsis")}>{item.album.koAlbumName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <div>
                  <TooltipRoot message={item.artists[0].koArtistName}>
                    <p className={cx("artistName", "ellipsis")}>{item.artists[0].koArtistName}</p>
                  </TooltipRoot>
                  <p className={cx("artistName", "enName", "ellipsis")}>{item.artists[0].enArtistName}</p>
                </div>
              </TableCellUI>
              <TableCellUI>{formatMoney(item.revenue, "table")}</TableCellUI>
              <TableCellUI>{formatMoney(item.netIncome, "table")}</TableCellUI>
              <TableCellUI>{formatMoney(item.settlementAmount, "table")}</TableCellUI>
              <TableCellUI align="left">{item.commissionRate && <ProgressBar value={item.commissionRate} />}</TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default TrackStatusTable;
