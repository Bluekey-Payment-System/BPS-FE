import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { patchTrack } from "@/services/api/requests/tracks/tracks.patch.api";
import { IPatchTrackRequest, IPatchTrackResponse } from "@/services/api/types/tracks";

type PatchTrackRequest = {
  trackId: number,
  body: IPatchTrackRequest,
};

const useUpdateAlbumTrack = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPatchTrackResponse,
  unknown,
  PatchTrackRequest,
  unknown
  >(
    ({ trackId, body }) => { return patchTrack(trackId, body); },
    {
      onSuccess: (data) => {
        // eslint-disable-next-line no-void
        void queryClient.invalidateQueries({ queryKey: ["albums", data.albumId] });
        showToast("수록곡 수정이 완료되었습니다.");
      },
    },
  );

  return mutation;
};

export default useUpdateAlbumTrack;
