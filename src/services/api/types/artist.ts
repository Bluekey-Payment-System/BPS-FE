import {
  IAlbumCard,
  IArtistDashboardCard, IArtistList, IBarMonthlySettlement, ITrack, ITrackTransaction,
} from "@/types/dto";

export interface IGetArtistsResponse {
  totalItems: number,
  contents: IArtistList[]
}

export interface IGetArtistDashboardResponse extends IArtistDashboardCard {
}

export interface IGetArtistTrackTransactionResponse {
  totalItems: number,
  contents: ITrackTransaction[]
}

export interface IGetArtistEarningsTopTrackResponse {
  contents: ITrack[]
}

export interface IGetArtistMonthlySettlementResponse {
  contents: IBarMonthlySettlement[]
}

export interface IGetArtistAlbumsResponse {
  totalItems: number,
  contents: IAlbumCard[]
}
