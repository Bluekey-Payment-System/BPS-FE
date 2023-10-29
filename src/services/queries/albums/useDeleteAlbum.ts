import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { deleteAlbum } from "@/services/api/requests/albums/albums.delete.api";
import { IDeleteAlbumResponse } from "@/services/api/types/albums";
import { ICommonErrorResponse } from "@/services/api/types/global";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import { isCommonError } from "@/utils/type.predicates";

const useDeleteAlbum = () => {
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const queryClient = useQueryClient();

  // eslint-disable-next-line max-len
  const mutation = useMutation<IDeleteAlbumResponse, unknown, number, unknown>((id) => { return deleteAlbum(id); }, {
    onSuccess: (data) => {
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "albums"]);
      showToast(`${data.name} 앨범을 삭제하였습니다.`);
    },
    onError: (err) => {
      if (isAxiosError<ICommonErrorResponse>(err)) {
        if (isCommonError(err.response?.data)) {
          showAlertModal({
            type: MODAL_TYPE.ERROR,
            title: "앨범 삭제 에러",
            message: err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.",
          });
        }
      } else console.error(err);
    },
  });

  return mutation;
};

export default useDeleteAlbum;
