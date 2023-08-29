import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

import useAlertModal from "@/hooks/useAlertModal";
import { adminSignUp } from "@/services/api/requests/auth/auth.post.api";
import { IPostAdminSignUpRequest, IPostAdminSignUpResponse } from "@/services/api/types/auth";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

const useSignup = () => {
  const { showAlertModal } = useAlertModal();
  const router = useRouter();
  const mutation = useMutation<IPostAdminSignUpResponse, unknown, IPostAdminSignUpRequest, unknown>(
    adminSignUp,
    {
      onSuccess: () => {
        showAlertModal({
          type: MODAL_TYPE.CONFIRM,
          title: "회원가입 성공",
          message: "회원가입이 완료되었습니다!",
          onClickProceed: () => {
            // eslint-disable-next-line no-void
            void router.push("/admin/signin");
          },
          proceedBtnText: "로그인 하러 가기",
          closeBtnText: "창 닫기",
        });
      },
      onError: (error) => {
        showAlertModal({
          type: MODAL_TYPE.ERROR,
          title: "회원가입 실패",
          message: axios.isAxiosError<ICommonErrorResponse>(error) ? error.response?.data?.message ?? "" : "알 수 없는 에러가 발생했습니다.",
        });
      },
    },
  );
  return mutation;
};

export default useSignup;
