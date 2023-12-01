import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTrack } from "@/services/api/requests/tracks/tracks.delete.api";
import { IDeleteTrackResponse } from "@/services/api/types/tracks";

type TrackId = number;

const useDeleteAlbumTrack = (albumId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
  IDeleteTrackResponse,
  unknown,
  TrackId,
  unknown
  >(
    deleteTrack,
    {
      onSuccess: () => {
        // eslint-disable-next-line no-void
        void queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      },
    },
  );

  return mutation;
};

export default useDeleteAlbumTrack;
