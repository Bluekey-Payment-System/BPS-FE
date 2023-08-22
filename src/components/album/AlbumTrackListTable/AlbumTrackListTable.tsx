import classNames from "classnames/bind";
import Image from "next/image";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { IGetAlbumTracksResponse } from "@/services/api/types/albums";

import styles from "./AlbumTrackListTable.module.scss";

const cx = classNames.bind(styles);

const AlbumTrackListTable = ({ data }: { data: IGetAlbumTracksResponse }) => {
  return (
    <TableContainerUI
      stickyLastCol
      tableWidth={1200}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>번호</TableCellUI>
        <TableCellUI isHeader>트랙명 (한글)</TableCellUI>
        <TableCellUI isHeader>트랙명 (영문)</TableCellUI>
        <TableCellUI isHeader>아티스트</TableCellUI>
        <TableCellUI isHeader>요율</TableCellUI>
        <TableCellUI isHeader>블루키 오리지널 트랙</TableCellUI>
        <TableCellUI isHeader>비고</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {data.tracks.map((item, index) => {
          return (
            <TableRowUI key={item.koTrackName}>
              <TableCellUI>{index + 1}</TableCellUI>
              <TableCellUI>
                <TooltipRoot message={item.koTrackName}>
                  <p className={cx("ellipsis")}>{item.koTrackName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={item.enTrackName}>
                  <p className={cx("ellipsis")}>{item.enTrackName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                {item.participants.map((participant) => {
                  return (
                    <>
                      <TooltipRoot
                        message={participant.koArtistName}
                        key={participant.koArtistName}
                      >
                        <p className={cx("ellipsis")}>{participant.koArtistName}</p>
                      </TooltipRoot>
                      <br />
                    </>
                  );
                })}
              </TableCellUI>
              <TableCellUI>
                {item.participants.map((participant) => {
                  return (
                    <p key={participant.koArtistName}>{`${participant.commissionRate}%`}</p>
                  );
                })}
              </TableCellUI>
              <TableCellUI>{item.bluekeyOriginalTrack ? "-" : <Image src="/images/selected.svg" width={10.34} height={8.36} alt="체크" />}</TableCellUI>
              <TableCellUI>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
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
