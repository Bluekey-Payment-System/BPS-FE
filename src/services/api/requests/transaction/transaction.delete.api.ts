import { IDeleteTransactionUploadResponse } from "../../types/transaction";
import { deleteRequest } from "../requests.api";

/* 엑셀 파일 업로드 History 삭제 API */
export const deleteUploadHistory = async (fileId: number) => {
  const response = await deleteRequest<IDeleteTransactionUploadResponse>(`transactions/${fileId}`);
  return response;
};
