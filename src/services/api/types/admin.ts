import {
  IAdminDashboardCard,
  IBarMonthlyEarnings,
  IDoughnutArtistRevenue,
  ITrackTransaction,
  IAdminAccount,
  IArtistAccount,
  IAdminProfile,
} from "@/types/dto";

import { AtLeastOne } from "./global";

export interface IGetAdminDashboardResponse extends IAdminDashboardCard {
}

export interface IGetAdminMonthlyTrendsResponse {
  contents: IBarMonthlyEarnings[]
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

export type IPatchAdminProfileData = AtLeastOne<{
  file: File | null,
  nickname: string,
  email: string,
}>;

export interface IPatchAdminProfileResponse extends Omit<IAdminProfile, "type"> {
}

export interface IGetAdminProfileResponse extends Omit<IAdminProfile, "type"> {
}
