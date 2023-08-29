import { IPostTransactionUploadData, IPostTransactionUploadResponse } from "../../types/transaction";
import { postRequest } from "../requests.api";

/* 엑셀 파일 업로드 API */
export const uploadTransaction = async (postData: IPostTransactionUploadData) => {
  const formData = new FormData();
  const dataList: { [key : string]: string } = {};

  Object.entries(postData).forEach((item) => {
    const [key, value] = item;
    if (key === "file") {
      formData.append("file", value as File);
      return;
    }
    dataList[key] = value as string;
  });
  formData.append("data", JSON.stringify(dataList));

  const response = await postRequest<IPostTransactionUploadResponse, FormData>("/transactions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
