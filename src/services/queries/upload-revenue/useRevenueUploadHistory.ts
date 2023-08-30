import {
  UseQueryResult, useMutation, useQuery, useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { deleteTransaction } from "@/services/api/requests/transaction/transaction.delete.api";
import { getTransaction } from "@/services/api/requests/transaction/transaction.get.api";
import { uploadTransaction } from "@/services/api/requests/transaction/transaction.post.api";
import { IGetTransactionUploadResponse, IPostTransactionUploadData } from "@/services/api/types/transaction";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import { isUploadRevenueError } from "@/utils/type.predicates";

/* 정산 업로드 내역 GET */
const useUploadHistoryGet = (month: string) => {
  const {
    data: revenueUploadHistory, isLoading, isError, isFetching,
  }: UseQueryResult<IGetTransactionUploadResponse> = useQuery(
    [MEMBER_TYPE.ADMIN, "revenue-upload-history", month],
    () => { return getTransaction(month); },
  );

  return ({
    revenueUploadHistory, isLoading, isError, isFetching,
  });
};

/* 정산 업로드 내역 DELETE */
const useUploadHistoryDelete = (
  month: string,
  // fileId: number,
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const {
    mutate: deleteUploadHistory,
    isLoading,
  } = useMutation((fileId: number) => { return deleteTransaction(fileId); }, {
    // TODO: delete 실패 시 실패 문구 Toast 노출 처리
    onSuccess: async () => {
      await queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "revenue-upload-history", month]);
      showToast("업로드 내역이 삭제되었습니다.");
    },
  });

  return { deleteUploadHistory, isLoading };
};

/* 정산 업로드 내역 POST */
const useUploadHistoryPost = (
  month: string,
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const { mutate: postUploadHistory, isLoading } = useMutation(
    (fileData: IPostTransactionUploadData) => { return uploadTransaction(fileData); },
    {
    // TODO: post 실패 또는 warnings 있을 경우 알림 모달 띄우기
      onSuccess: () => {
        showToast("정산 내역 업로드가 완료되었습니다.");

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "revenue-upload-history", month]);
      },
      onError: (error) => {
        if (axios.isAxiosError<object>(error)) {
          if (isUploadRevenueError(error.response?.data)) {
            showAlertModal({
              type: MODAL_TYPE.ERROR,
              title: "미등록 데이터 발견",
              message: "파일을 다시 확인하고 업로드해주세요.",
            });
          } else {
            showAlertModal({
              type: MODAL_TYPE.ERROR,
              title: "파일 포맷 오류",
              message: "엑셀 파일의 포맷을 다시 확인하고 업로드해주세요.",
            });
          }
        }
      },
    },
  );

  return { postUploadHistory, isLoading };
};

export { useUploadHistoryGet, useUploadHistoryDelete, useUploadHistoryPost };
