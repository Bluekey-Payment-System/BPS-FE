/* eslint-disable no-void */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postAlbum } from "@/services/api/requests/albums/albums.post.api";
import { IPostAlbumData, IPostAlbumResponse } from "@/services/api/types/albums";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const useCreateAlbum = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<IPostAlbumResponse, unknown, IPostAlbumData, unknown>(postAlbum, {
    onSuccess: (data) => {
      showToast(`"${data.name}" 앨범 생성이 완료되었습니다.`);
      void queryClient.invalidateQueries({
        queryKey: [MEMBER_TYPE.ADMIN, "albums"],
        refetchType: "all",
      });
    },
  });

  return mutation;
};

export default useCreateAlbum;
