import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postTrack } from "@/services/api/requests/tracks/tracks.post.api";
import { IPostTrackRequest, IPostTrackResponse } from "@/services/api/types/tracks";

const useAddAlbumTrack = (albumId: number) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPostTrackResponse,
  unknown,
  IPostTrackRequest,
  unknown
  >(
    (body) => { return postTrack(albumId, body); },
    {
      onSuccess: (data) => {
        // eslint-disable-next-line no-void
        void queryClient.invalidateQueries({ queryKey: ["albums", `${data.albumId}`] });
        showToast("수록곡 추가가 완료되었습니다.");
      },
    },
  );

  return mutation;
};

export default useAddAlbumTrack;
