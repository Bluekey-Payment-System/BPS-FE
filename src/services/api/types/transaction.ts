import { ITransactionUpload } from "@/types/dto";

export interface IGetTransactionUploadResponse {
  totalItems: number,
  contents: ITransactionUpload[]
}

export type IPostTransactionUploadData = {
  file: File,
  uploadMonth: string,
};

export interface IPostTransactionUploadResponse extends ITransactionUpload {
}

export interface IDeleteTransactionUploadResponse extends ITransactionUpload {
}
