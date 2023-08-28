import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";

import { IGetTransactionUploadResponse } from "../../types/transaction";
import { getRequest } from "../requests.api";

/* 엑셀 파일 업로드 History 조회 */
export const getUploadHistory = async (month: string) => {
  const response = await getRequest<IGetTransactionUploadResponse>(`/transactions?monthly=${convertToYearMonthFormat(month)}`);
  return response;
};
