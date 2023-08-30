import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postArtist } from "@/services/api/requests/artist/artist.post.api";
import { IGetArtistsSimpleResponse, IPostArtistData, IPostArtistResponse } from "@/services/api/types/artist";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

const useCreateArtist = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
  IPostArtistResponse, unknown, IPostArtistData, unknown
  >(
    postArtist,
    {
      onSuccess: (data) => {
        showToast(`아티스트 "${data.name}" 계정이 생성되었습니다.`);
        const staleData = queryClient.getQueryData<IGetArtistsSimpleResponse>([MEMBER_ROLE.ARTIST, "names"]);
        if (staleData) {
          queryClient.setQueryData(
            [MEMBER_ROLE.ARTIST, "names"],
            {
              artists: [...staleData.artists, {
                id: data.memberId,
                name: data.name,
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
