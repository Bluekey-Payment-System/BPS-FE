import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { IPostAlbumTrackRequest, IPostAlbumTrackResponse } from "@/services/api/types/albums";

const postAlbumTrackByAlbumId = (albumId: number, body: IPostAlbumTrackRequest) => {
  // TODO: /api/v1/tracks/albums/{albumId} 로 post 요청
  // eslint-disable-next-line no-void
  void albumId;
  // eslint-disable-next-line no-void
  void body;
  return new Promise<IPostAlbumTrackResponse>((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        trackId: 1,
        albumId: 1,
        name: "사랑",
        enName: "love",
        artists: [
          {
            memberId: 1,
            name: "1",
            commissionRate: 50,
          },
        ],
        isOriginalTrack: false,
      });
      reject(new Error("에러가 발생했습니다."));
    }, 2000);
  });
};

const useAddAlbumTrack = (albumId: number) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPostAlbumTrackResponse,
  unknown,
  IPostAlbumTrackRequest,
  unknown
  >(
    (body: IPostAlbumTrackRequest) => { return postAlbumTrackByAlbumId(albumId, body); },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["albums", `${data.albumId}`] });
        showToast("수록곡 추가가 완료되었습니다.");
      },
    },
  );

  return mutation;
};

export default useAddAlbumTrack;
