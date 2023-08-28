import { ITrackParticipantInfo } from "@/types/dto";

import { IPatchTrackData, IPatchTrackResponse } from "../../types/tracks";
import { patchRequest } from "../requests.api";

/* 앨범의 트랙 정보 변경 */
export const patchTrack = async (
  trackId: number,
  trackKoName: string,
  trackEnName: string,
  isOriginalTrack: boolean,
  artists: ITrackParticipantInfo[],
) => {
  const response = patchRequest<IPatchTrackResponse, IPatchTrackData>(`tracks/albums/${trackId}`, {
    name: trackKoName,
    enName: trackEnName,
    isOriginalTrack,
    artists,
  });
  return response;
};
