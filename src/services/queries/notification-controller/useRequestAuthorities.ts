/* eslint-disable @typescript-eslint/no-floating-promises */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import useAlertModal, { IShowAlertModalParam } from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { getRequestAuthoritiesList } from "@/services/api/requests/notification-controller/notification-controller.get.api";
import { patchApproveAuthorityRequest, patchRejectAuthorityRequest } from "@/services/api/requests/notification-controller/notification-controller.patch.api";
import { postRequestAuthority } from "@/services/api/requests/notification-controller/notification-controller.post.api";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { IGetRequestAuthorities, IPatchAuthorityResponse } from "@/services/api/types/notification-contoller";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_ROLE } from "@/types/enums/user.enum";
import { isCommonError } from "@/utils/type.predicates";

const getErrorModalInfo = (message: string, title = "권한 요청 에러"): IShowAlertModalParam => {
  return {
    type: MODAL_TYPE.ERROR,
    title,
    message,
  };
};

/* 권한 요청 리스트 가져오기 */
export const useRequestAuthoritiesList = () => {
  const query = useQuery<IGetRequestAuthorities>([MEMBER_ROLE.SUPER_ADMIN, "request-authority-list"], getRequestAuthoritiesList);
  return query;
};

/* 어드민 권한 요청하기 */

export const useRequestAuthority = () => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation(
    postRequestAuthority,
    {
      onSuccess: () => {
        showToast("관리자 권한이 재요청 되었습니다.");
      },
      onError: (err) => {
        if (isAxiosError<ICommonErrorResponse>(err)) {
          if (isCommonError(err.response?.data)) {
            showAlertModal(getErrorModalInfo(err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.", "권한 요청 에러"));
          }
        } else console.error(err);
      },
    },
  );
  return mutation;
};

/* 권한 요청 승인 */
export const useApproveRequestAuthority = (requestAuthorityId: number) => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const queryClient = useQueryClient();
  const mutation = useMutation<IPatchAuthorityResponse, unknown, number, unknown>([MEMBER_ROLE.SUPER_ADMIN, "request-authority-approve", requestAuthorityId], (data) => { return patchApproveAuthorityRequest(data); }, {
    onSuccess: (data) => {
      showToast(`${data.nickName}(${data.loginId})님을 승인하였습니다`);
      queryClient.invalidateQueries([MEMBER_ROLE.SUPER_ADMIN, "request-authority-list"]);
      queryClient.invalidateQueries(["check-pending-status"]);
    },
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal(getErrorModalInfo(err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.", "권한 요청 승인 에러"));
        }
      } else console.error(err);
    },
  });
  return mutation;
};

/* 권한 요청 거절 */
export const useRejectRequestAuthority = (requestAuthorityId: number) => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const queryClient = useQueryClient();
  const mutation = useMutation<IPatchAuthorityResponse, unknown, number, unknown>([MEMBER_ROLE.SUPER_ADMIN, "request-authority-reject", requestAuthorityId], (data) => { return patchRejectAuthorityRequest(data); }, {
    onSuccess: (data) => {
      showToast(`${data.nickName}(${data.loginId})님을 거절하였습니다`);
      queryClient.invalidateQueries([MEMBER_ROLE.SUPER_ADMIN, "request-authority-list"]);
      queryClient.invalidateQueries(["check-pending-status"]);
    },
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal(getErrorModalInfo(err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.", "권한 요청 거절 에러"));
        }
      } else console.error(err);
    },
  });
  return mutation;
};
