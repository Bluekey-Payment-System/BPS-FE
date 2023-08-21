import classNames from "classnames/bind";

import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { ITrackInfo } from "@/types/dto";

import styles from "./TrackListTable.module.scss";

const cx = classNames.bind(styles);

interface TrackListTableProps {
  tracks: ITrackInfo[]
}

const TrackListTable = ({ tracks }: TrackListTableProps) => {
  return (
    <TableContainerUI
      stickyHeader
      tableHeight={523}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>번호</TableCellUI>
        <TableCellUI isHeader>트랙명 (한글)</TableCellUI>
        <TableCellUI isHeader>트랙명 (영문)</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {tracks.map((track, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <TableRowUI key={idx}>
              <TableCellUI>
                {idx + 1}
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={track.koTrackName}>
                  <p className={cx("ellipsis")}>{track.koTrackName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={track.enTrackName}>
                  <p className={cx("ellipsis")}>{track.enTrackName}</p>
                </TooltipRoot>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default TrackListTable;
