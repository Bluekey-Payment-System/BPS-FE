import {
  QueryClient, UseQueryResult, useMutation, useQuery,
} from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { IGetTransactionUploadResponse } from "@/services/api/types/transaction";
import { deleteRevenueUploadHistory, getRevenueUploadHistory, postRevenueUploadHistory } from "@/services/api/upload-revenue/upload-revenue-mock-api";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

/* 정산 업로드 내역 GET */
const useUploadHistoryGet = (month: string) => {
  const {
    data: revenueUploadHistory, isLoading, isError, isFetching,
  }: UseQueryResult<IGetTransactionUploadResponse> = useQuery(
    [MEMBER_TYPE.ADMIN, "revenue-upload-history"],
    () => { return getRevenueUploadHistory(month); },
    {
      staleTime: Infinity,
    },
  );

  return ({
    revenueUploadHistory, isLoading, isError, isFetching,
  });
};

/* 정산 업로드 내역 DELETE */
const useUploadHistoryDelete = (
  queryClient: QueryClient,
) => {
  const { showToast } = useToast();
  const { mutate: deleteUploadHistory, isLoading } = useMutation(deleteRevenueUploadHistory, {
    // TODO: delete 실패 시 실패 문구 Toast 노출 처리
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "revenue-upload-history"]);
      showToast(data as string);
    },
  });

  return { deleteUploadHistory, isLoading };
};

/* 정산 업로드 내역 POST */
interface IFileData {
  file: File,
  uploadAt: string,
}

const useUploadHistoryPost = (
  queryClient: QueryClient,
) => {
  const { showToast } = useToast();
  const { mutate: postUploadHistory, isLoading } = useMutation((fileData: IFileData) => {
    return postRevenueUploadHistory(fileData.file, fileData.uploadAt);
  }, {
    // TODO: post 실패 또는 warnings 있을 경우 알림 모달 띄우기
    onSuccess: (data) => {
      showToast(data as string);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "revenue-upload-history"]);
    },
  });

  return { postUploadHistory, isLoading };
};

export { useUploadHistoryGet, useUploadHistoryDelete, useUploadHistoryPost };
