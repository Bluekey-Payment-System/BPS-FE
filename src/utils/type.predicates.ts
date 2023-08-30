import { ICommonErrorResponse, IPostTransactionUploadErrorResponse } from "@/services/api/types/errors";

export const isCommonError = (
  data?: object,
): data is ICommonErrorResponse => {
  if (!data) return false;
  return (
    Object.keys(data).length === 3
    && "message" in data
    && "code" in data
    && "fieldErrors" in data
  );
};

export const isUploadRevenueError = (
  data?: object,
): data is IPostTransactionUploadErrorResponse => {
  if (!data) return false;
  return (
    "totalErrorNums" in data
    && "errors" in data
  );
};
