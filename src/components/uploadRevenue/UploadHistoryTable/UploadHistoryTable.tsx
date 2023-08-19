import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import EmptyData from "@/components/common/EmptyData/EmptyData";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import { MOCK_EMPTY_TRANSACTION_UPLOAD, MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import { ITransactionUpload } from "@/types/dto";

const UploadHistroyTable = (
  { uploadList = MOCK_EMPTY_TRANSACTION_UPLOAD.contents }: { uploadList?: ITransactionUpload[] },
) => {
  if (uploadList.length === 0) {
    return <EmptyData type="no-data" text="업로드 내역이 없습니다." />;
  }

  return (
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
                <ChipButton>업로드 취소</ChipButton>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default UploadHistroyTable;
