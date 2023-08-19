import { useState } from "react";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import EmptyData from "@/components/common/EmptyData/EmptyData";
import AlertModal from "@/components/common/Modals/AlertModal/AlertModal";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import { ITransactionUpload } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

interface FileDataProps {
  fileId: number,
  fileName: string
}

const UploadHistroyTable = (
  { uploadList = MOCK_TRANSACTION_UPLOAD.contents }: { uploadList?: ITransactionUpload[] },
) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileData, setFileData] = useState<FileDataProps | null>(null);

  const handleClickCancelUpload = (fileId: number, fileName: string) => {
    setModalOpen(true);
    setFileData({
      fileId,
      fileName,
    });
  };

  if (uploadList.length === 0) {
    return <EmptyData type="no-data" text="업로드 내역이 없습니다." />;
  }

  return (
    <>
      <TableContainerUI
        stickyFirstCol
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
                    return handleClickCancelUpload(item.id, item.name);
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
        open={modalOpen}
        type={MODAL_TYPE.CONFIRM}
        title="업로드 내역 삭제"
        message={`파일 ${fileData?.fileName}의 업로드 내역을 삭제하시겠습니까?`}
        onClose={() => { setModalOpen(false); }}
        // eslint-disable-next-line no-console
        onClickProceed={() => { console.log(fileData?.fileId, fileData?.fileName); }}
        proceedBtnText="네, 삭제할게요"
        closeBtnText="아니요"
      />
    </>

  );
};

export default UploadHistroyTable;
