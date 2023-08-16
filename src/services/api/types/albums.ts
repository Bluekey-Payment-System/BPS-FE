import {
  IAlbumCard, IAlbumInfo, IBarMonthlySettlement, ILineTrackSettlementTrends, ITrack,
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
  contents: ITrack[]
}
