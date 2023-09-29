import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { withdrawMember } from "@/services/api/requests/auth/auth.delete.api";
import { IDeleteMemberReqeust, IDeleteMemberResponse } from "@/services/api/types/auth";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import { isCommonError } from "@/utils/type.predicates";

const useWithdrawMember = () => {
  const queryClient = useQueryClient();
  const { showAlertModal } = useAlertModal();
  const { showToast } = useToast();
  const mutation = useMutation<
  IDeleteMemberResponse,
  unknown,
  IDeleteMemberReqeust,
  unknown>((data) => {
    return withdrawMember(data.memberId);
  }, {
    onSuccess: (_, variables) => {
      showToast(`“${variables.name}” 계정이 삭제되었습니다.`);
      // eslint-disable-next-line no-void
      void queryClient.refetchQueries({ queryKey: [MEMBER_TYPE.ADMIN, "manage-accounts"], type: "all" });
    },
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal({
            type: MODAL_TYPE.ERROR,
            title: "계정 탈퇴 에러",
            message: err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.",
          });
        }
      } else console.error(err);
    },
  });

  return mutation;
};

export default useWithdrawMember;
