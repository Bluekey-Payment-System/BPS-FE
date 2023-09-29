import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { patchArtistProfileForAdmin } from "@/services/api/requests/artist/artist.patch.api";
import { IPatchArtistProfileForAdminRequest, IPatchArtistProfileForAdminResponse } from "@/services/api/types/artist";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import { isCommonError } from "@/utils/type.predicates";

const useUpdateArtistProfile = () => {
  const queryClient = useQueryClient();
  const { showAlertModal } = useAlertModal();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPatchArtistProfileForAdminResponse,
  unknown,
  {
    memberId: number,
    patchData: IPatchArtistProfileForAdminRequest;
  },
  unknown>(
    (data) => { return patchArtistProfileForAdmin(data.memberId, data.patchData); },
    {
      onSuccess: () => {
        showToast("수정이 완료되었습니다.");
        // eslint-disable-next-line no-void
        void queryClient.refetchQueries({ queryKey: [MEMBER_TYPE.ADMIN, "manage-accounts"], type: "all" });
      },
      onError: (err) => {
        if (isAxiosError<ICommonErrorResponse>(err)) {
          if (isCommonError(err.response?.data)) {
            showAlertModal({
              type: MODAL_TYPE.ERROR,
              title: "계정 수정 에러",
              message: err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.",
            });
          }
        } else console.error(err);
      },
    },
  );

  return mutation;
};

export default useUpdateArtistProfile;
