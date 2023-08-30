import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import useToast from "@/hooks/useToast";
import { IAlbumFieldValues } from "@/types/album.types";
import { IAlbumInfo } from "@/types/dto";

const patchAlbumInfo = (body: IAlbumFieldValues) => {
  return new Promise<IAlbumInfo>((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        ...MOCK_ALBUM_TRACKS, name: body.name ?? MOCK_ALBUM_TRACKS.name, enName: body.enName ?? MOCK_ALBUM_TRACKS.enName, albumImage: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbKkbJE%2FbtrNGwwhUUP%2FPwdFi2oUOBtBCdtxUpzFkk%2Fimg.jpg",
      });
      reject(new Error("에러가 발생했습니다."));
    }, 2000);
  });
};

const useUpdateAlbumInfo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const mutation = useMutation<
  IAlbumInfo,
  unknown,
  IAlbumFieldValues,
  unknown
  >(
    patchAlbumInfo,
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
