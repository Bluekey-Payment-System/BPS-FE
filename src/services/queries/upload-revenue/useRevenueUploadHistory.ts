import {
  UseQueryResult, useMutation, useQuery, useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { UPLOAD_REVENUE_ERROR_STATUS_MAPPER } from "@/constants/errorStatusMapping";
import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import useUploadRevenueAlertModal from "@/hooks/useUploadRevenueAlertModal";
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
  const { showUploadRevenueAlertModal } = useUploadRevenueAlertModal();
  const { mutate: postUploadHistory, isLoading } = useMutation(
    (fileData: IPostTransactionUploadData) => { return uploadTransaction(fileData); },
    {
    // TODO: post 실패 또는 warnings 있을 경우 알림 모달 띄우기
      onSuccess: () => {
        showToast("정산 내역 업로드가 완료되었습니다.");

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "revenue-upload-history", month]);
      },
      onError: (error: AxiosError | Error) => {
        if (axios.isAxiosError<object>(error)) {
          if (!error.response) {
            showAlertModal({
              type: MODAL_TYPE.ERROR,
              title: UPLOAD_REVENUE_ERROR_STATUS_MAPPER.no_res.title,
              message: UPLOAD_REVENUE_ERROR_STATUS_MAPPER.no_res.message,
            });
          } else if (isUploadRevenueError(error.response.data)) {
            // TODO) 테스트 필요
            showUploadRevenueAlertModal({
              type: "warning",
              alertData: error.response.data.errors,
            });
          } else {
            // TODO) 중복 코드 개편
            switch (error.response.status) {
              case (400):
                showAlertModal({
                  type: MODAL_TYPE.ERROR,
                  title: UPLOAD_REVENUE_ERROR_STATUS_MAPPER[400].title,
                  message: UPLOAD_REVENUE_ERROR_STATUS_MAPPER[400].message,
                });
                break;

              case (403):
                showAlertModal({
                  type: MODAL_TYPE.ERROR,
                  title: UPLOAD_REVENUE_ERROR_STATUS_MAPPER[403].title,
                  message: UPLOAD_REVENUE_ERROR_STATUS_MAPPER[403].message,
                });
                break;

              case (500):
                showAlertModal({
                  type: MODAL_TYPE.ERROR,
                  title: UPLOAD_REVENUE_ERROR_STATUS_MAPPER[500].title,
                  message: UPLOAD_REVENUE_ERROR_STATUS_MAPPER[500].message,
                });
                break;

              default:
                break;
            }
          }
        }
      },
    },
  );

  return { postUploadHistory, isLoading };
};

export { useUploadHistoryGet, useUploadHistoryDelete, useUploadHistoryPost };
