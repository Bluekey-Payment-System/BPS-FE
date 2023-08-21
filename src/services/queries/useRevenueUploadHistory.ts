import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

import { IGETTransactionUploadResponse } from "../api/types/transaction";

const getRevenueUploadHistory = (): Promise<IGETTransactionUploadResponse> => {
  // TODO: 정산 업로드 내역 GET
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTION_UPLOAD);
    }, 3000);
  });
};

const useRevenueUploadHistory = () => {
  const {
    data: revenueUploadHistory, isLoading, isError, isFetching,
  }: UseQueryResult<IGETTransactionUploadResponse> = useQuery(
    [MEMBER_TYPE.ADMIN, "settlement-upload-history"],
    getRevenueUploadHistory,
    {
      staleTime: Infinity,
    },
  );

  return ({
    revenueUploadHistory, isLoading, isError, isFetching,
  });
};

export default useRevenueUploadHistory;
