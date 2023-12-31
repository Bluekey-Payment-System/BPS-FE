import {
  IAlbumCard,
  IArtist,
  IArtistAccount,
  IArtistDashboardCard,
  IArtistList,
  IArtistProfile,
  IBarMonthlyEarnings,
  IDoughnutTrackRevenue,
  ITrackTransaction,
} from "@/types/dto";

import { AtLeastOne } from "./global";

export interface IGetArtistsResponse {
  totalItems: number,
  contents: IArtistList[]
}

export interface IGetArtistDashboardResponse extends IArtistDashboardCard {
}

export interface IGetArtistTrackTransactionResponse {
  totalItems: number,
  contents: Omit<ITrackTransaction, "netIncome">[]
}

export interface IGetArtistEarningsTopTrackResponse {
  contents: IDoughnutTrackRevenue[]
}

export interface IGetArtistMonthlyTrendsResponse {
  contents: IBarMonthlyEarnings[]
}

export interface IGetArtistAlbumsResponse {
  totalItems: number,
  contents: IAlbumCard[]
}

interface IDropdownArtist extends IArtist {
  commissionRate: number | null
}
export interface IGetArtistsSimpleResponse {
  artists: IDropdownArtist[]
}

export type IPostArtistData = {
  file: File | null,
  email: string,
  loginId: string,
  name: string,
  enName: string,
  password: string,
  commissionRate: number | null,
};

export interface IPostArtistResponse extends IGetArtistProfileResponse {
  commissionRate: number | null
}

export interface IPatchArtistProfileForAdminResponse extends IArtistAccount {
}

export type IPatchArtistProfileForAdminRequest = AtLeastOne<{
  name: string,
  enName: string,
  commissionRate: number | null,
}>;

export type IPatchArtistProfileData = AtLeastOne<{
  file: File | null,
  email: string,
}>;

export interface IPatchArtistProfileResponse extends Omit<IArtistProfile, "type"> {
}

export interface IGetArtistProfileResponse extends Omit<IArtistProfile, "type"> {
}
