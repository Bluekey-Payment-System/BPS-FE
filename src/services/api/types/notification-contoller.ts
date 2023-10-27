import { IRequestAuthority } from "@/types/dto";

export interface IGetRequestAuthorities {
  totalItems: number,
  contents: IRequestAuthority[]
}

export interface IGetPendingRequestAuthority {
  hasPendingRequestAuthority: boolean
}

export interface IPatchAuthorizationRequest {
  requestAuthorityId: number
}

export interface IPatchAuthorizationResponse {
  nickName: string
  loginId: string
}
