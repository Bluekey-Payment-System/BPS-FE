/* eslint-disable no-void */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postArtist } from "@/services/api/requests/artist/artist.post.api";
import { IGetArtistsSimpleResponse, IPostArtistData, IPostArtistResponse } from "@/services/api/types/artist";
import { MEMBER_ROLE, MEMBER_TYPE } from "@/types/enums/user.enum";

const useCreateArtist = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<IPostArtistResponse, unknown, IPostArtistData, unknown>(
    postArtist,
    {
      onSuccess: (data) => {
        showToast(`아티스트 "${data.name}" 계정이 생성되었습니다.`);
        void queryClient.invalidateQueries({
          queryKey: [MEMBER_TYPE.ADMIN, "artists-status"],
          refetchType: "all",
        });
        void queryClient.invalidateQueries({
          predicate: (query) => {
            const { queryKey } = query;
            return (queryKey[0] === MEMBER_TYPE.ADMIN
              && queryKey[1] === "manage-accounts"
              && "artistPage" in (queryKey[2] as object));
          },
          refetchType: "all",
        });
        const staleData = queryClient.getQueryData<IGetArtistsSimpleResponse>([MEMBER_ROLE.ARTIST, "names"]);
        if (staleData) {
          queryClient.setQueryData(
            [MEMBER_ROLE.ARTIST, "names"],
            {
              artists: [...staleData.artists, {
                memberId: data.memberId,
                name: data.name,
                enName: data.enName,
                commissionRate: data.commissionRate || 0,
              }],
            },
          );
        }
      },
    },
  );
  return mutation;
};

export default useCreateArtist;
