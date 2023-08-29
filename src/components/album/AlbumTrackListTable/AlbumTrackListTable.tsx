import classNames from "classnames/bind";
import Image from "next/image";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { ITrackInfo } from "@/types/dto";

import styles from "./AlbumTrackListTable.module.scss";

const cx = classNames.bind(styles);

interface AlbumTrackListTableProps {
  albumId: number,
  tracks: ITrackInfo[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AlbumTrackListTable = ({ albumId, tracks }: AlbumTrackListTableProps) => {
  return (
    <TableContainerUI
      stickyLastCol
      tableWidth={1078}
    >
      <TableHeaderUI>
        <TableCellUI colWidth={130} isHeader>번호</TableCellUI>
        <TableCellUI isHeader>트랙명 (한글)</TableCellUI>
        <TableCellUI isHeader>트랙명 (영문)</TableCellUI>
        <TableCellUI isHeader>아티스트</TableCellUI>
        <TableCellUI isHeader>요율</TableCellUI>
        <TableCellUI isHeader>블루키 오리지널 트랙</TableCellUI>
        <TableCellUI isHeader>비고</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {tracks.map((item, index) => {
          return (
            <TableRowUI key={item.name}>
              <TableCellUI>{index + 1}</TableCellUI>
              <TableCellUI>
                <TooltipRoot message={item.name}>
                  <p className={cx("ellipsis")}>{item.name}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={item.enName}>
                  <p className={cx("ellipsis")}>{item.enName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                {item.participants.map((participant) => {
                  return (
                    <>
                      <TooltipRoot
                        message={participant.name}
                        key={participant.name}
                      >
                        <p className={cx("ellipsis")}>{participant.name}</p>
                      </TooltipRoot>
                      <br />
                    </>
                  );
                })}
              </TableCellUI>
              <TableCellUI>
                {item.participants.map((participant) => {
                  return (
                    <p key={participant.name}>{`${participant.commissionRate}%`}</p>
                  );
                })}
              </TableCellUI>
              <TableCellUI>{item.bluekeyOriginalTrack ? "-" : <Image src="/images/selected.svg" width={10.34} height={8.36} alt="체크" />}</TableCellUI>
              <TableCellUI>
                <div className={cx("buttonContainer")}>
                  <ChipButton onClick={() => { }}>수정</ChipButton>
                  <ChipButton onClick={() => { }}>삭제</ChipButton>
                </div>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default AlbumTrackListTable;
