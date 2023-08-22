import { IAdminAccount, IArtistAccount } from "@/types/dto";

export interface IGetAccountsResponse {
  artistList: {
    totalItems: number,
    contents: IArtistAccount[],
  },
  adminList?: { // 슈퍼 어드민만 adminList를 받음
    totalItems: number,
    contents: IAdminAccount[]
  }
}
