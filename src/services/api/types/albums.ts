import {
  IAlbumCard,
  IAlbumInfo,
  IBarMonthlySettlement,
  IDoughnutTrackRevenue,
  ILineTrackSettlementTrends,
} from "@/types/dto";

export interface IGetAlbumsResponse {
  totalItems: number,
  contents: IAlbumCard[]
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
