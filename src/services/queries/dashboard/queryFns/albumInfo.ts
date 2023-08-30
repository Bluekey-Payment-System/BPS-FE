/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import { IGetAlbumTracksResponse } from "@/services/api/types/albums";

export const getDashboardAlbumInfo = (
  month: string,
  albumId: number,
): Promise<IGetAlbumTracksResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => { return resolve(MOCK_ALBUM_TRACKS); }, 2000);
  });
};
