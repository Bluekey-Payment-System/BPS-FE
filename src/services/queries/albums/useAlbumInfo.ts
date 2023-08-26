import { useQuery } from "@tanstack/react-query";

import { MOCK_ALBUM_TRACKS } from "@/constants/mock";

const getAlbumInfoById = (albumId: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line no-void
      void albumId;
      return resolve(MOCK_ALBUM_TRACKS);
      reject(new Error("에러가 발생했습니다."));
    }, 2000);
  });
};

const useAlbumInfo = (albumId: number) => {
  const query = useQuery(
    ["albums", `${albumId}`],
    () => { return getAlbumInfoById(albumId); },
  );

  return query;
};

export default useAlbumInfo;
