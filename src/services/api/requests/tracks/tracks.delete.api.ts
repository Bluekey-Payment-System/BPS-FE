import { IDeleteTrackResponse } from "../../types/tracks";
import { deleteRequest } from "../requests.api";

/* 트랙 삭제 */
export const deleteTrack = async (trackId: number) => {
  const response = deleteRequest<IDeleteTrackResponse>(`tracks/${trackId}`);
  return response;
};
