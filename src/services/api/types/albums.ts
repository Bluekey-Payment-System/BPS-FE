import {
  IAlbumCard,
  IAlbumDashboardCard,
  IAlbumInfo,
  IBarMonthlySettlement,
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

export interface IGetAlbumMonthlySettlementResponse {
  contents: IBarMonthlySettlement[]
}

export interface IGetAlbumTrackSettlementTrendsResponse {
  tracks: ILineTrackSettlementTrends[]
}

export interface IGetAlbumRevenueTopTrackResponse {
  contents: IDoughnutTrackRevenue[]
}

export interface IPostAlbumResponse extends IAlbumCard {
}

export interface IDeleteAlbumResponse extends IAlbumCard {
}

export type IPatchAlbumData = AtLeastOne<{
  file: string,
  name: string,
  enName: string,
  memberId: number | null
}>;

export interface IPatchAlbumResponse extends IAlbumCard {
}
