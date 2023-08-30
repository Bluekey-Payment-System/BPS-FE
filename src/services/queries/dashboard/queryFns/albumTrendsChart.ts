/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { MOCK_ALBUM_LINE } from "@/constants/mock";
import { IGetAlbumTracksTrendsResponse } from "@/services/api/types/albums";

export const getMemberAlbumTrendsChart = (month: string, albumId: number): Promise<IGetAlbumTracksTrendsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => { return resolve(MOCK_ALBUM_LINE); }, 2000);
  });
};
