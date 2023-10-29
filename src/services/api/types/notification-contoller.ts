import { IRequestAuthority } from "@/types/dto";

export interface IGetRequestAuthorities {
  totalItems: number,
  contents: IRequestAuthority[]
}

export interface IGetPendingRequestAuthority {
  hasPendingRequestAuthority: boolean
}

export interface IPatchAuthorityRequest {
  requestAuthorityId: number
}

export interface IPatchAuthorityResponse {
  nickName: string
  loginId: string
}
