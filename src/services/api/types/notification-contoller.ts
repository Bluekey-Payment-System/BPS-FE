import { IRequestAuthority } from "@/types/dto";

export interface IGetRequestAuthorities {
  totalItems: number,
  contents: IRequestAuthority[]
}

export interface IGetHasPendingRequestAuthority {
  hasPendingRequestAuthority: boolean;
}

export interface IPatchApproveRequestAuthority {
  nickName: string,
  loginId: string,
}

export interface IPatchRejectRequestAuthority extends IPatchApproveRequestAuthority {}
