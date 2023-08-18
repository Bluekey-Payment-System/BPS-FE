import {
  IAdminDashboardCard, IBarMonthlyEarnings,
  IDoughnutArtistRevenue, IDoughnutTrackRevenue, ITrackTransaction,
} from "@/types/dto";

export interface IGetAdminDashboardResponse extends IAdminDashboardCard {
}

export interface IGetAdminMonthlyEarningsTrendsResponse {
  contents: IBarMonthlyEarnings[]
}

export interface IGetAdminTrackTransactionResponse {
  totalItems: number,
  contents: ITrackTransaction[]
}

export interface IGetAdminEarningsTopArtistResponse {
  contents: IDoughnutArtistRevenue[]
}

export interface IGetAdminEarningsTopTrackResponse {
  contents: IDoughnutTrackRevenue[]
}
