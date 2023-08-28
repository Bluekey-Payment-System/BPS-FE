import { postRequest } from "../requests.api";

/* 엑셀 파일 업로드 API */
export const uploadTransaction = async (file: File, uploadAt: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify({ uploadAt }));

  const response = await postRequest("/transactions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
