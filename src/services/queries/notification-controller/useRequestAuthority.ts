import { useMutation } from "@tanstack/react-query";

import useAlertModal, { IShowAlertModalParam } from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { postRequestAuthority } from "@/services/api/requests/notification-controller/notification-controller.post.api";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

const getErrorModalInfo = (message: string, title = "권한 요청 에러"): IShowAlertModalParam => {
  return {
    type: MODAL_TYPE.ERROR,
    title,
    message,
  };
};

export const useRequestAuthority = () => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation(
    postRequestAuthority,
    {
      onSuccess: () => {
        showToast("관리자 권한이 재요청 되었습니다.");
      },
      onError: () => {
        showAlertModal(getErrorModalInfo("알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해 주세요."));
      },
    },
  );
  return mutation;
};
