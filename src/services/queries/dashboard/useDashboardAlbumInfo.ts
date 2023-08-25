/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import { IGetAlbumTracksResponse } from "@/services/api/types/albums";

export const getDashboardAlbumInfo = (
  month: string,
  albumId: string,
): Promise<IGetAlbumTracksResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => { return resolve(MOCK_ALBUM_TRACKS); }, 2000);
  });
};

const useDashboardAlbumInfo = (month: string, albumId: string) => {
  const { data: albumInfo, isLoading: isAlbumInfoLoading, isError: isalbumInfoError } = useQuery(
    ["dashboard", "albumInfo"],
    () => { return getDashboardAlbumInfo(month, albumId); },
    { staleTime: 5000 },
  );

  return {
    albumInfo, isAlbumInfoLoading, isalbumInfoError,
  };
};

export default useDashboardAlbumInfo;
