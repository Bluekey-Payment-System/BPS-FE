import {
  IAdminProfile, IAdminSignup, IProfile, ISignIn,
} from "@/types/dto";
import {
  AdminRole, AdminType, ArtistRole, UserRole, UserType,
} from "@/types/enums/user.enum";

export interface IPostAdminSignInRequest extends ISignIn {
}

export interface IPostAdminSignUpRequest extends IAdminSignup {
}

export interface IPostArtistSignInRequest extends ISignIn {
}

export interface IPatchChangePasswordRequest extends Pick<ISignIn, "password"> {
}

export interface IPatchReissuePasswordRequest extends Pick<IProfile, "memberId"> {
}

export interface IPostConfirmPasswordRequest extends Pick<ISignIn, "password"> {
}

interface ICommonSignInInfo {
  memberId: number,
  loginId: string,
  profileImage: string | null,
}

interface IAdminSignInInfo extends ICommonSignInInfo {
  email: string,
  nickname: string,
  type: AdminType, // 기존의 MEMBER_TYPE과의 관계가 불분명한 것 같고 사용하는 쪽이 아직 없어 enum 처리 안함
  role: AdminRole | Omit<UserRole, "APPROVED">,
}

interface IArtistSignInInfo extends ICommonSignInInfo {
  email: string,
  name: string,
  enName: string,
  type: UserType,
  role: ArtistRole,
}

export interface IPostAdminSignInResponse {
  member: IAdminSignInInfo,
  jwtInformation: {
    accessToken: string
  }
}

export interface IPostArtistSignInResponse {
  member: IArtistSignInInfo
  jwtInformation: {
    accessToken: string
  }
}

export interface IPostAdminSignUpResponse extends Omit<IAdminProfile, "profileImage"> {
}

export interface IPatchReissuePasswordResponse {
  newPassword: string;
}

export interface IDeleteMemberResponse {
  memberId: number;
}

export interface IDeleteMemberReqeust {
  memberId: number;
  name: string;
}
