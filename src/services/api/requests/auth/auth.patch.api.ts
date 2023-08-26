import { IPatchChangePasswordRequest } from "../../types/auth";
import { postRequest } from "../requests.api";

export const changePassword = async ({
  password,
}: IPatchChangePasswordRequest) => {
  // 200번 response data 확인 요망
  const response = await postRequest<string, IPatchChangePasswordRequest>("/auth/member/password", {
    password,
  });
  return response;
};
