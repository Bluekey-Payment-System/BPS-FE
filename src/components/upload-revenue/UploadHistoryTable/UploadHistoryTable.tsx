import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import EmptyData from "@/components/common/EmptyData/EmptyData";
import Loading from "@/components/common/Loading/Loading";
import AlertModal from "@/components/common/Modals/AlertModal/AlertModal";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import useToast from "@/hooks/useToast";
import { ITransactionUpload } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

interface FileData {
  fileId: number,
  fileName: string
}

const UploadHistroyTable = (
  { uploadList }: { uploadList?: ITransactionUpload[] },
) => {
  const queryClient = useQueryClient();
  const [isCancelUploadModalOpen, setIsCancelUploadModalOpen] = useState(false);
  const [fileData, setFileData] = useState<FileData>({} as FileData);
  const { showToast } = useToast();

  const mutationTest = useMutation(() => {
    // TODO: 업로드 내역 삭제 DELETE
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("업로드 내역이 삭제되었습니다.");
      }, 2000);
    });
  }, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "settlement-upload-history"]);
      showToast(data as string);
    },
  });

  const handleClickCancelUploadBtn = (fileId: number, fileName: string) => {
    setIsCancelUploadModalOpen(true);
    setFileData({
      fileId,
      fileName,
    });
  };

  const handleCancelUpload = (fileId: number, fileName: string) => {
    // TODO: 업로드 취소 API 작업
    // eslint-disable-next-line no-console
    console.log(`(${fileId}) ${fileName} 파일 삭제`);
    mutationTest.mutate();

    setIsCancelUploadModalOpen(false);
  };

  if (uploadList?.length === 0) {
    return <EmptyData type="no-data" text="업로드 내역이 없습니다." />;
  }

  if (mutationTest.isLoading) {
    return <Loading width="100%" height={218} />;
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
          {uploadList?.map((item) => {
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
          return handleCancelUpload(fileData.fileId, fileData.fileName);
        }}
        proceedBtnText="네, 삭제할게요"
        closeBtnText="아니요"
      />
    </>
  );
};

export default UploadHistroyTable;
