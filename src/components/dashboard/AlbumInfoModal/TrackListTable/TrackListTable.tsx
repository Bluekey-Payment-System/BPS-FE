import classNames from "classnames/bind";

import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import ModalTooltipRoot from "@/components/common/Tooltip/ModalTooltip";
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
        <TableCellUI isHeader colWidth={74}>번호</TableCellUI>
        <TableCellUI isHeader>트랙명 (한글)</TableCellUI>
        <TableCellUI isHeader>트랙명 (영문)</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {tracks.map((track, idx) => {
          return (
            <TableRowUI key={track.trackId}>
              <TableCellUI>
                {idx + 1}
              </TableCellUI>
              <TableCellUI>
                <ModalTooltipRoot message={track.name}>
                  <p className={cx("ellipsis")}>{track.name}</p>
                </ModalTooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <ModalTooltipRoot message={track.enName}>
                  <p className={cx("ellipsis")}>{track.enName}</p>
                </ModalTooltipRoot>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default TrackListTable;
