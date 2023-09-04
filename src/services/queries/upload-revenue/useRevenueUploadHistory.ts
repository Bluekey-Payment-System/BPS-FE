/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  UseQueryResult, useMutation, useQuery, useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { UPLOAD_REVENUE_ERROR_STATUS_MAP } from "@/constants/errorStatusMapping";
import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import useUploadRevenueAlertModal from "@/hooks/useUploadRevenueAlertModal";
import { deleteTransaction } from "@/services/api/requests/transaction/transaction.delete.api";
import { getTransaction } from "@/services/api/requests/transaction/transaction.get.api";
import { uploadTransaction } from "@/services/api/requests/transaction/transaction.post.api";
import { ICommonErrorResponse } from "@/services/api/types/errors";
import { IGetTransactionUploadResponse, IPostTransactionUploadData, IPostTransactionUploadResponse } from "@/services/api/types/transaction";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
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
) => {
  const queryClient = useQueryClient();
  const { showAlertModal } = useAlertModal();
  const { showToast } = useToast();
  const {
    mutate: deleteUploadHistory,
    isLoading,
  } = useMutation((fileId: number) => { return deleteTransaction(fileId); }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [MEMBER_TYPE.ADMIN, "revenue-upload-history", month] });
      await queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard"], refetchType: "all" });
      await queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard"], refetchType: "all" });
      await queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard"], refetchType: "all" });

      showToast("업로드 내역이 삭제되었습니다.");
    },
    onError: () => {
      showAlertModal({
        type: MODAL_TYPE.ERROR,
        title: "정산 내역 삭제 실패",
        message: "정산 내역 삭제에 실패했습니다.\n잠시 후 다시 시도해주세요.",
      });
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
      onSuccess: (data: IPostTransactionUploadResponse) => {
        if (data.warnings.length > 0) {
          showUploadRevenueAlertModal({
            type: "warning",
            fileName: data.name,
            alertData: data.warnings,
            onClose: () => {
              showToast("정산 내역 업로드가 완료되었습니다.");
            },
          });
        } else {
          showToast("정산 내역 업로드가 완료되었습니다.");
        }

        queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "revenue-upload-history", month]);
        queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard"], refetchType: "all" });
        queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard"], refetchType: "all" });
        queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard"], refetchType: "all" });
      },
      onError: (error: AxiosError | Error) => {
        if (axios.isAxiosError<ICommonErrorResponse>(error)) {
          if (!error.response) {
            showAlertModal({
              type: MODAL_TYPE.ERROR,
              title: UPLOAD_REVENUE_ERROR_STATUS_MAP.NETWORK_ERROR.title,
              message: UPLOAD_REVENUE_ERROR_STATUS_MAP.NETWORK_ERROR.message,
            });
          } else if (isUploadRevenueError(error.response.data)) {
            showUploadRevenueAlertModal({
              type: "error",
              // TODO) error가 발생한 파일명으로 교체하기
              fileName: "파일",
              alertData: error.response.data.errors,
            });
          } else {
            switch (error.response.status) {
              case 400: {
                if (error.response.data.code === "TR_002") {
                  showAlertModal({
                    type: MODAL_TYPE.ERROR,
                    title: UPLOAD_REVENUE_ERROR_STATUS_MAP.TR_002.title,
                    message: UPLOAD_REVENUE_ERROR_STATUS_MAP.TR_002.message,
                  });
                } else { // TR_004
                  showAlertModal({
                    type: MODAL_TYPE.ERROR,
                    title: UPLOAD_REVENUE_ERROR_STATUS_MAP.TR_004.title,
                    message: UPLOAD_REVENUE_ERROR_STATUS_MAP.TR_004.message,
                  });
                }
                break;
              }

              case 403: {
                showAlertModal({
                  type: MODAL_TYPE.ERROR,
                  title: UPLOAD_REVENUE_ERROR_STATUS_MAP[403].title,
                  message: UPLOAD_REVENUE_ERROR_STATUS_MAP[403].message,
                });
                break;
              }

              case 500: {
                showAlertModal({
                  type: MODAL_TYPE.ERROR,
                  title: UPLOAD_REVENUE_ERROR_STATUS_MAP[500].title,
                  message: UPLOAD_REVENUE_ERROR_STATUS_MAP[500].message,
                });
                break;
              }

              default: {
                showAlertModal({
                  type: MODAL_TYPE.ERROR,
                  title: UPLOAD_REVENUE_ERROR_STATUS_MAP.DEFAULT.title,
                  message: UPLOAD_REVENUE_ERROR_STATUS_MAP.DEFAULT.message,
                });
                break;
              }
            }
          }
        }
      },
    },
  );

  return { postUploadHistory, isLoading };
};

export { useUploadHistoryGet, useUploadHistoryDelete, useUploadHistoryPost };
