import { useState } from "react";

import classNames from "classnames/bind";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import EmptyData from "@/components/common/EmptyData/EmptyData";
// import Loading from "@/components/common/Loading/Loading";
import Orbit from "@/components/common/Loading/Orbit";
import AlertModal from "@/components/common/Modals/AlertModal/AlertModal";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import { useUploadHistoryDelete } from "@/services/queries/upload-revenue/useRevenueUploadHistory";
import { ITransactionUpload } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import styles from "./UploqeHistoryTable.module.scss";

interface FileData {
  fileId: number,
  fileName: string
}

interface UploadHistroyTableProps {
  uploadList: ITransactionUpload[],
  month: string,
}

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param uploadList 정산 내역들이 담긴 배열
 * @returns 정산 내역 테이블
 */
const UploadHistroyTable = (
  { uploadList, month }: UploadHistroyTableProps,
) => {
  const [isCancelUploadModalOpen, setIsCancelUploadModalOpen] = useState(false);
  const [fileData, setFileData] = useState<FileData>({} as FileData);
  const { deleteUploadHistory, isLoading } = useUploadHistoryDelete(month);

  const handleClickCancelUploadBtn = (fileId: number, fileName: string) => {
    setIsCancelUploadModalOpen(true);
    setFileData({
      fileId,
      fileName,
    });
  };

  const handleCancelUpload = (fileId: number) => {
    deleteUploadHistory(fileId);
    setIsCancelUploadModalOpen(false);
  };

  if (uploadList.length === 0) {
    return <EmptyData type="no-data" text="업로드 내역이 없습니다." />;
  }

  if (isLoading) {
    return (
      <div className={cx("loading")}>
        <Orbit dark />
      </div>
    );
  }

  return (
    <>
      <TableContainerUI
        stickyLastCol
        tableWidth={730}
      >
        <TableHeaderUI>
          <TableCellUI isHeader>파일명</TableCellUI>
          <TableCellUI isHeader>업로드 날짜</TableCellUI>
          <TableCellUI isHeader>비고</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {uploadList.map((item) => {
            return (
              <TableRowUI key={item.id}>
                <TableCellUI>
                  <p>{item.name}</p>
                </TableCellUI>
                <TableCellUI>
                  <p>{item.uploadAt}</p>
                </TableCellUI>
                <TableCellUI>
                  <ChipButton onClick={() => {
                    return handleClickCancelUploadBtn(item.id, item.name);
                  }}
                  >
                    업로드 취소
                  </ChipButton>
                </TableCellUI>
              </TableRowUI>
            );
          })}
        </TableBodyUI>
      </TableContainerUI>
      <AlertModal
        open={isCancelUploadModalOpen}
        type={MODAL_TYPE.CONFIRM}
        title="업로드 내역 삭제"
        message={`파일 ${fileData?.fileName}의 업로드 내역을 삭제하시겠습니까?`}
        onClose={() => { setIsCancelUploadModalOpen(false); }}
        onClickProceed={() => {
          return handleCancelUpload(fileData.fileId);
        }}
        proceedBtnText="네, 삭제할게요"
        closeBtnText="아니요"
      />
    </>
  );
};

export default UploadHistroyTable;
