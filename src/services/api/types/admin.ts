import {
  IAdminDashboardCard,
  IBarMonthlyEarnings,
  IDoughnutArtistRevenue,
  ITrackTransaction,
  IBarMonthlySettlement,
  IAdminAccount,
  IArtistAccount,
} from "@/types/dto";

export interface IGetAdminDashboardResponse extends IAdminDashboardCard {
}

export interface IGetAdminMonthlyEarningsTrendsResponse {
  contents: IBarMonthlyEarnings[]
}

export interface IGetArtistMonthlyEarningsTrendsResponse {
  contents: IBarMonthlySettlement[]
}

export interface IGetAdminTrackTransactionResponse {
  totalItems: number,
  contents: ITrackTransaction[]
}

export interface IGetAdminEarningsTopArtistResponse {
  contents: IDoughnutArtistRevenue[]
}

export interface IGetAdminAccountsResponse {
  totalItems: number,
  contents: IAdminAccount[]
}

export interface IGetArtistAccountsResponse {
  totalItems: number,
  contents: IArtistAccount[]
}
