import { IPatchTrackRequest, IPatchTrackResponse } from "../../types/tracks";
import { patchRequest } from "../requests.api";

/* 앨범의 트랙 정보 변경 */
export const patchTrack = async (
  trackId: number,
  patchData: IPatchTrackRequest,
) => {
  const response = patchRequest<IPatchTrackResponse, IPatchTrackRequest>(
    `tracks/${trackId}`,
    patchData,
  );
  return response;
};
