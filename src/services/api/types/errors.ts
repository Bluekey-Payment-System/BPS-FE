import { ITransactionUploadAlert } from "@/types/dto";

interface FieldError {
  field: string;
  message: string;
}

export interface ICommonErrorResponse {
  message: string;
  code: string;
  fieldErrors: FieldError[] | null;
}

/* Transaction POST ERROR */
/* 셀 값에서 문제가 있는 경우 */
export interface IPostTransactionUploadErrorResponse {
  code: string;
  message: string;
  totalErrorNums: number;
  errors: ITransactionUploadAlert[];
}
