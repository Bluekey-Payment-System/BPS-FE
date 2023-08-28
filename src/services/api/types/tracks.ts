import { ITrackInfo, ITrackParticipantInfo } from "@/types/dto";

import { AtLeastOne } from "./global";

export interface IDeleteTrackResponse {
  trackId: number,
}

export interface IPostTrackResponse extends ITrackInfo {
  albumId: number,
}

export interface IPostTrackRequest {
  name: string,
  enName: string,
  isOriginalTrack: boolean,
  artists: ITrackParticipantInfo[],
}

export interface IPatchTrackResponse extends IPostTrackResponse {
}

export type IPatchTrackRequest = AtLeastOne<IPostTrackRequest>;
