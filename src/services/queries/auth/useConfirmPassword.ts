import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import useAlertModal from "@/hooks/useAlertModal";
import { confirmPassword } from "@/services/api/requests/auth/auth.post.api";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { isCommonError } from "@/utils/type.predicates";

const useConfirmPassword = () => {
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation(confirmPassword, {
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal({
            type: MODAL_TYPE.ERROR,
            title: "비밀번호 확인 에러",
            message: err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.",
          });
        }
      }
    },
  });
  return mutation;
};

export default useConfirmPassword;
