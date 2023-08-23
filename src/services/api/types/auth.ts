import { IAdminSignup, ISignIn } from "@/types/dto";

export interface IPostAdminSignInRequest extends ISignIn {
}

export interface IPostAdminSignUpRequest extends IAdminSignup {
}

export interface IPostMemberSignInRequest extends ISignIn {
}

export interface IPatchChangePassword extends Omit<ISignIn, "loginId"> {
}

export interface IPostConfirmPasswordRequest extends Omit<ISignIn, "loginId"> {
}
