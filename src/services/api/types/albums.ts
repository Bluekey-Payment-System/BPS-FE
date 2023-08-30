import { ITrackFieldValues } from "@/types/album.types";
import {
  IAlbumCard,
  IAlbumDashboardCard,
  IAlbumInfo,
  IBarMonthlyEarnings,
  IDoughnutTrackRevenue,
  ILineTrackSettlementTrends,
} from "@/types/dto";

import { AtLeastOne } from "./global";

export interface IGetAlbumsResponse {
  totalItems: number,
  contents: IAlbumCard[]
}

export interface IGetAlbumDashboardResponse extends IAlbumDashboardCard {
}

export interface IGetAlbumTracksResponse extends IAlbumInfo {
}

export interface IGetAlbumMonthlyTrendsResponse {
  contents: IBarMonthlyEarnings[]
}

export interface IGetAlbumTracksTrendsResponse {
  tracks: ILineTrackSettlementTrends[]
}

export interface IGetAlbumRevenueTopTrackResponse {
  contents: IDoughnutTrackRevenue[]
}

export interface IPostAlbumTrackRequest extends ITrackFieldValues {
}

export interface IPostAlbumTrackResponse extends IPostAlbumTrackRequest {
  trackId: number;
  albumId: number;
}

export type IPostAlbumData = {
  file: File | null,
  name: string,
  enName: string,
  memberId: number | null,
};

export interface IPostAlbumResponse extends IAlbumCard {
}

export interface IDeleteAlbumResponse extends IAlbumCard {
}

export type IPatchAlbumData = AtLeastOne<{
  file: File | null,
  name: string,
  enName: string,
  memberId: number | null
}>;

export interface IPatchAlbumResponse extends IAlbumCard {
}
