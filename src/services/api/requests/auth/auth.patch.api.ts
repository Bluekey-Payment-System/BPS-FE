import { IPatchChangePasswordRequest } from "../../types/auth";
import { postRequest } from "../requests.api";

/* 비밀번호 변경 */
export const changePassword = async ({
  password,
}: IPatchChangePasswordRequest) => {
  // 200번 response data 확인 요망
  const response = await postRequest<string, IPatchChangePasswordRequest>("/auth/member/password", {
    password,
  });
  return response;
};
