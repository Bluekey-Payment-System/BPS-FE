import { ITrackInfo, ITrackParticipantInfo } from "@/types/dto";

export interface IDeleteTrackResponse {
  trackId: number,
}

export interface IPostTrackResponse extends ITrackInfo {
  albumId: number,
}

export interface IPostTrackData {
  name: string,
  enName: string,
  isOriginalTrack: boolean,
  artists: ITrackParticipantInfo[],
}

export interface IPatchTrackResponse extends IPostTrackResponse {
}

export interface IPatchTrackData extends IPostTrackData {
}
