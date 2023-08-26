import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";

import { IGETTransactionUploadResponse } from "../types/transaction";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRevenueUploadHistory = (month: string): Promise<IGETTransactionUploadResponse> => {
  // TODO: (GET) 정산 업로드 내역 가져오기
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTION_UPLOAD);
    }, 3000);
  });
};

const deleteRevenueUploadHistory = () => {
  // TODO: (DELETE) 정산 업로드 내역 삭제
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("업로드 내역이 삭제되었습니다.");
    }, 3000);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postRevenueUploadHistory = (file: File, uploadAt: string) => {
  // TODO: (POST) 정산 내역 업로드
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("정산 내역 업로드가 완료되었습니다.");
    }, 3000);
  });
};

export { getRevenueUploadHistory, deleteRevenueUploadHistory, postRevenueUploadHistory };
