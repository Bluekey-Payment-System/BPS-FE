import { ITransactionUpload } from "@/types/dto";

export interface IGetTransactionUploadResponse {
  totalItems: number,
  contents: ITransactionUpload[]
}

export interface IPostTransactionUploadResponse extends ITransactionUpload {
}
