import { IRequestAuthority } from "@/types/dto";

export interface IGetRequestAuthorities {
  totalItems: number,
  contents: IRequestAuthority[]
}
