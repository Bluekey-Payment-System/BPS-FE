import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postTrack } from "@/services/api/requests/tracks/tracks.post.api";
import { IPostTrackRequest, IPostTrackResponse } from "@/services/api/types/tracks";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

const useAddTrack = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation<
  IPostTrackResponse,
  unknown,
  { albumId: number, data: IPostTrackRequest },
  unknown
  >((body: { albumId:number, data: IPostTrackRequest }) => {
    return postTrack(body.albumId, body.data);
  }, {
    onSuccess: (data) => {
      showToast("수록곡이 추가되었습니다.");
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({ queryKey: [MEMBER_ROLE.ADMIN, "albums", `albumId=${data.albumId}`] });
    },
  });

  return query;
};

export default useAddTrack;
