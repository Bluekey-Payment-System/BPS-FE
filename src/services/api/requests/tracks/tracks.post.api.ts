import { IPostTrackRequest, IPostTrackResponse } from "../../types/tracks";
import { postRequest } from "../requests.api";

/* 앨범의 트랙 등록 */
export const postTrack = async (
  albumId: number,
  body: IPostTrackRequest,
) => {
  const response = postRequest<IPostTrackResponse, IPostTrackRequest>(`albums/${albumId}`, body);
  return response;
};
