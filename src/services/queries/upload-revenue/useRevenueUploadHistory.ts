import {
  QueryClient, UseQueryResult, useMutation, useQuery,
} from "@tanstack/react-query";

import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

import { IGETTransactionUploadResponse } from "../../api/types/transaction";

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

/* 정산 업로드 내역 GET */
const useUploadHistoryGet = (month: string) => {
  const {
    data: revenueUploadHistory, isLoading, isError, isFetching,
  }: UseQueryResult<IGETTransactionUploadResponse> = useQuery(
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
  showToast: (message: string) => void,
) => {
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
interface FileData {
  file: File,
  uploadAt: string,
}

const useUploadHistoryPost = (
  // file: File,
  // uploadAt: string,
  queryClient: QueryClient,
  showToast: (message: string) => void,
) => {
  const { mutate: postUploadHistory, isLoading } = useMutation((fileData: FileData) => {
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

export {
  getRevenueUploadHistory, useUploadHistoryGet, useUploadHistoryDelete, useUploadHistoryPost,
};
