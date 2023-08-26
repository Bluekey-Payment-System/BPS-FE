import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import { IAlbumFieldValues } from "@/types/album.types";
import { IAlbumInfo } from "@/types/dto";

const patchAlbumInfo = (body: IAlbumFieldValues) => {
  return new Promise<IAlbumInfo>((resolve, reject) => {
    setTimeout(() => {
      return resolve({ ...MOCK_ALBUM_TRACKS, koAlbumName: body.name, enAlbumName: body.enName });
      reject(new Error("에러가 발생했습니다."));
    }, 2000);
  });
};

const useUpdateAlbumInfo = (body: IAlbumFieldValues) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
  IAlbumInfo,
  unknown,
  IAlbumFieldValues,
  unknown
  >(
    () => {
      return patchAlbumInfo(body);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["albums", `${data.albumId}`], data);
      },
    },
  );

  return mutation;
};

export default useUpdateAlbumInfo;
