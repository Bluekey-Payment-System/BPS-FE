import { ITrackParticipantInfo } from "@/types/dto";

import { IPostTrackData, IPostTrackResponse } from "../../types/tracks";
import { postRequest } from "../requests.api";

/* 앨범의 트랙 등록 */
export const postTrack = async (
  albumId: number,
  trackKoName: string,
  trackEnName: string,
  isOriginalTrack: boolean,
  artists: ITrackParticipantInfo[],
) => {
  const response = postRequest<IPostTrackResponse, IPostTrackData>(`albums/${albumId}`, {
    name: trackKoName,
    enName: trackEnName,
    isOriginalTrack,
    artists,
  });
  return response;
};
