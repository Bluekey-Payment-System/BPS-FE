import { useMutation } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { postAlbum } from "@/services/api/requests/albums/albums.post.api";
import { IPostAlbumData, IPostAlbumResponse } from "@/services/api/types/albums";

const useCreateAlbum = () => {
  const { showToast } = useToast();
  const mutation = useMutation<
  IPostAlbumResponse,
  unknown,
  IPostAlbumData,
  unknown
  >(postAlbum, {
    onSuccess: (data) => {
      showToast(`"${data.name}" 앨범 생성이 완료되었습니다.`);
    },
  });

  return mutation;
};

export default useCreateAlbum;
