import { IGetTransactionUploadResponse } from "../../types/transaction";
import { getRequest } from "../requests.api";

/* 엑셀 파일 업로드 History 조회 */
export const getTransaction = async (month: string) => {
  const response = await getRequest<IGetTransactionUploadResponse>(`/transactions?monthly=${month}`);
  return response;
};
