/* eslint-disable no-void */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { requestAuthoritiesList } from "@/services/api/requests/notification-controller/notification-controller.get.api";
import {
  authorityRequestApprove, authorityRequestReject,
} from "@/services/api/requests/notification-controller/notification-controller.patch.api";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { IGetRequestAuthorities, IPatchAuthorizationResponse } from "@/services/api/types/notification-contoller";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_ROLE } from "@/types/enums/user.enum";
import { isCommonError } from "@/utils/type.predicates";

/* 권한 요청 리스트 가져오기 */
export const useRequestAuthoritiesList = () => {
  const query = useQuery<IGetRequestAuthorities>([MEMBER_ROLE.SUPER_ADMIN, "request-authority-list"], requestAuthoritiesList);
  return query;
};

/* 권한 요청 승인 */
export const useRequestAuthorityApprove = (requestAuthorityId: number) => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const queryClient = useQueryClient();
  const mutation = useMutation<IPatchAuthorizationResponse, unknown, number, unknown>([MEMBER_ROLE.SUPER_ADMIN, "request-authority-approve", requestAuthorityId], (data) => { return authorityRequestApprove(data); }, {
    onSuccess: (data) => {
      showToast(`${data.nickName}(${data.loginId})님을 승인하였습니다`);
      void queryClient.invalidateQueries([MEMBER_ROLE.SUPER_ADMIN, "request-authority-list"]);
      void queryClient.invalidateQueries([MEMBER_ROLE.SUPER_ADMIN, "check-pending-status"]);
    },
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal({
            type: MODAL_TYPE.ERROR,
            title: "권한 요청 승인 에러",
            message: err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.",
          });
        }
      } else console.error(err);
    },
  });
  return mutation;
};

/* 권한 요청 거절 */
export const useRequestAuthorityReject = (requestAuthorityId: number) => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const queryClient = useQueryClient();
  const mutation = useMutation<IPatchAuthorizationResponse, unknown, number, unknown>([MEMBER_ROLE.SUPER_ADMIN, "request-authority-reject", requestAuthorityId], (data) => { return authorityRequestReject(data); }, {
    onSuccess: (data) => {
      showToast(`${data.nickName}(${data.loginId})님을 거절하였습니다`);
      void queryClient.invalidateQueries([MEMBER_ROLE.SUPER_ADMIN, "request-authority-list"]);
      void queryClient.invalidateQueries([MEMBER_ROLE.SUPER_ADMIN, "check-pending-status"]);
    },
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal({
            type: MODAL_TYPE.ERROR,
            title: "권한 요청 거절 에러",
            message: err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.",
          });
        }
      } else console.error(err);
    },
  });
  return mutation;
};
