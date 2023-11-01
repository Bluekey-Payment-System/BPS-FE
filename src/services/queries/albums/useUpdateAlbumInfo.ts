import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { patchAlbum } from "@/services/api/requests/albums/albums.patch.api";
import { IPatchAlbumResponse } from "@/services/api/types/albums";
import { IAlbumFieldValues } from "@/types/album.types";

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
        queryClient.setQueryData(["albums", `${data.albumId}`], data);
      },
    },
  );

  return mutation;
};

export default useUpdateAlbumInfo;
