import { useMutation } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postArtist } from "@/services/api/requests/artist/artist.post.api";
import { IPostArtistData, IPostArtistResponse } from "@/services/api/types/artist";

const useCreateArtist = () => {
  const { showToast } = useToast();
  const mutation = useMutation<
  IPostArtistResponse, unknown, IPostArtistData, unknown
  >(
    postArtist,
    {
      onSuccess: (data) => {
        showToast(`아티스트 "${data.name}" 계정이 생성되었습니다.`);
      },
    },
  );
  return mutation;
};

export default useCreateArtist;
