import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";

import { IGetTransactionUploadResponse } from "../../types/transaction";
import { getRequest } from "../requests.api";

export const getUploadHistory = async (month: string) => {
  const response = await getRequest<IGetTransactionUploadResponse>(`/transactions?monthly=${convertToYearMonthFormat(month)}`);
  return response;
};
