import {
  QueryClient, UseQueryResult, useMutation, useQuery,
} from "@tanstack/react-query";

import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

import { IGETTransactionUploadResponse } from "../../api/types/transaction";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRevenueUploadHistory = (month: string): Promise<IGETTransactionUploadResponse> => {
  // TODO: (GET) 정산 업로드 내역
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTION_UPLOAD);
    }, 3000);
  });
};

const deleteRevenueUploadHistory = () => {
  // TODO: (DELETE) 정산 업로드 내역
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("업로드 내역이 삭제되었습니다.");
    }, 2000);
  });
};

/* 정산 업로드 내역 GET */
const useUploadHistoryGet = (month: string) => {
  const {
    data: revenueUploadHistory, isLoading, isError, isFetching,
  }: UseQueryResult<IGETTransactionUploadResponse> = useQuery(
    [MEMBER_TYPE.ADMIN, "settlement-upload-history"],
    () => { return getRevenueUploadHistory(month); },
  );

  return ({
    revenueUploadHistory, isLoading, isError, isFetching,
  });
};

/* 정산 업로드 내역 DELETE */
const useUploadHistoryDelete = (queryClient: QueryClient, showToast: (message: string) => void) => {
  const { mutate: deleteUploadHistory, isLoading } = useMutation(deleteRevenueUploadHistory, {
    // TODO: delete 실패 시 실패 문구 Toast 노출 처리
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "settlement-upload-history"]);
      showToast(data as string);
    },
  });

  return { deleteUploadHistory, isLoading };
};

export { getRevenueUploadHistory, useUploadHistoryGet, useUploadHistoryDelete };
