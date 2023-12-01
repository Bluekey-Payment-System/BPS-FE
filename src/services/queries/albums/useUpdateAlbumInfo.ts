/* eslint-disable no-void */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { patchAlbum } from "@/services/api/requests/albums/albums.patch.api";
import { IPatchAlbumResponse } from "@/services/api/types/albums";
import { IAlbumFieldValues } from "@/types/album.types";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const useUpdateAlbumInfo = (albumId: number) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPatchAlbumResponse,
  unknown,
  IAlbumFieldValues,
  unknown
  >(
    (body) => { return patchAlbum(albumId, body); },
    {
      onSuccess: (data) => {
        showToast("앨범 수정이 완료되었습니다.");
        queryClient.setQueryData(["albums", data.albumId], data);
        void queryClient.invalidateQueries({ queryKey: ["albums", data.albumId] });
        void queryClient.invalidateQueries({ queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "albumInfo", data.albumId] });
      },
    },
  );

  return mutation;
};

export default useUpdateAlbumInfo;
