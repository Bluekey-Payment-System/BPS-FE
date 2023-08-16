import {
  IAdminDashboardCard, IBarMonthlyEarnings, IDoughnutArtistRevenue, ITrackTransaction,
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
