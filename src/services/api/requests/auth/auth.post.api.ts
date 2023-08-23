import {
  IPostAdminSignInRequest,
  IPostAdminSignInResponse,
  IPostAdminSignUpRequest,
  IPostAdminSignUpResponse,
  IPostArtistSignInRequest,
  IPostArtistSignInResponse,
  IPostConfirmPasswordRequest,
} from "../../types/auth";
import { postRequest } from "../requests.api";

/**
 * 로그인 후 TODO
 * ```
 * const data = await signIn(
        'test-employer1@codeit.com',
        '1234asdf',
      )

      const { member, jwtInformation } = data;
      const { accessToken } = jwtInformation;
      // token을 로컬 스토리지에 저장하기
      }
    ```
 */
export const adminSignIn = async (
  {
    loginId,
    password,
  }: IPostAdminSignInRequest,
) => {
  const response = await postRequest<IPostAdminSignInResponse, IPostAdminSignInRequest>("/auth/admin/login", {
    loginId,
    password,
  });
  return response;
};

export const artistSigniIn = async ({
  loginId,
  password,
}: IPostArtistSignInRequest) => {
  const response = await postRequest<IPostArtistSignInResponse, IPostArtistSignInRequest>("/auth/member/login", {
    loginId,
    password,
  });
  return response;
};

export const adminSignUp = async ({
  email,
  loginId,
  nickname,
  password,
}: IPostAdminSignUpRequest) => {
  const response = await postRequest<IPostAdminSignUpResponse, IPostAdminSignUpRequest>("/auth/admin/signup", {
    email,
    loginId,
    nickname,
    password,
  });
  return response;
};

export const confirmPassword = async ({
  password,
}: IPostConfirmPasswordRequest) => {
  // 200번 response data 확인 요망
  const response = await postRequest<string, IPostConfirmPasswordRequest>("/auth/member/password/confirm", {
    password,
  });
  return response;
};
