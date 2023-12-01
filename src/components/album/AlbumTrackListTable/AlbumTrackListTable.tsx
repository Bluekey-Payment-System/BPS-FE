import { useCallback, useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import AddTrackModal from "@/components/album/AddTrackModal/AddTrackModal";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import AlertModal from "@/components/common/Modals/AlertModal/AlertModal";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import useToast from "@/hooks/useToast";
import useDeleteAlbumTrack from "@/services/queries/tracks/useDeleteAlbumTrack";
import { ITrackInfo, ITrackParticipantInfo } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import styles from "./AlbumTrackListTable.module.scss";

const cx = classNames.bind(styles);

interface AlbumTrackListTableProps {
  albumId: number,
  tracks: ITrackInfo[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AlbumTrackListTable = ({ albumId, tracks }: AlbumTrackListTableProps) => {
  const [isEditTrackModalOpen, setIsEditTrackModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTrackInfo, setSelectedTrackInfo] = useState<ITrackInfo>(tracks[0]);
  const { mutateAsync: deleteTrack } = useDeleteAlbumTrack(albumId);
  const { showToast } = useToast();

  const getCompanyCommissionRate = useCallback((artists:ITrackParticipantInfo[]) => {
    const sum = artists.reduce((accumulator, artist) => {
      return accumulator + (artist.commissionRate || 0);
    }, 0);
    return 100 - sum;
  }, []);

  const getArtistNames = useCallback((artists: ITrackParticipantInfo[]) => {
    if (artists.length === 1) return artists[0].name;
    return artists.reduce((accumulator, artist, idx) => {
      if (idx === 0) {
        return artist.name;
      }
      return `${accumulator}, ${artist.name}`;
    }, "");
  }, []);

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
        <TableCellUI isHeader>사측 요율</TableCellUI>
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
                <p>{`${getArtistNames(item.artists)}`}</p>
              </TableCellUI>
              <TableCellUI>
                <p>{`${getCompanyCommissionRate(item.artists)}%`}</p>
              </TableCellUI>
              <TableCellUI>{!item.originalTrack ? "-" : <Image src="/images/selected.svg" width={10.34} height={8.36} alt="체크" />}</TableCellUI>
              <TableCellUI>
                <div className={cx("buttonContainer")}>
                  <ChipButton
                    onClick={() => {
                      setIsEditTrackModalOpen(true);
                      setSelectedTrackInfo(item);
                    }}
                  >
                    수정
                  </ChipButton>
                  <ChipButton onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSelectedTrackInfo(item);
                  }}
                  >
                    삭제
                  </ChipButton>
                </div>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
      <AddTrackModal
        open={isEditTrackModalOpen}
        onClose={() => { setIsEditTrackModalOpen(false); }}
        albumId={albumId}
        trackInfo={selectedTrackInfo}
      />
      <AlertModal
        open={isDeleteModalOpen}
        type={MODAL_TYPE.CONFIRM}
        title="수록곡 삭제"
        message={`수록곡 "${selectedTrackInfo?.name}"을 삭제 하시겠습니까?`}
        closeBtnText="취소"
        proceedBtnText="삭제"
        onClickProceed={async () => {
          try {
            await deleteTrack(selectedTrackInfo?.trackId);
            showToast(`수록곡 "${selectedTrackInfo.name}"이(가)) 삭제되었습니다.`);
          } catch (err) {
            showToast("일시적인 오류가 발생했습니다. 잠시 뒤에 다시 시도해주세요.", "toast-root", "FAIL");
          } finally {
            setIsDeleteModalOpen(false);
          }
        }}
        onClose={() => { setIsDeleteModalOpen(false); }}
      />
    </TableContainerUI>
  );
};

export default AlbumTrackListTable;
