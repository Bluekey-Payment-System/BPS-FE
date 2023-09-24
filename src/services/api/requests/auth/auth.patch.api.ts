import { IPatchChangePasswordRequest, IPatchReissuePasswordRequest, IPatchReissuePasswordResponse } from "@/services/api/types/auth";

import { patchRequest } from "../requests.api";

/* 비밀번호 변경 */
export const changePassword = async ({
  password,
}: IPatchChangePasswordRequest) => {
  // 200번 response data 확인 요망
  const response = await patchRequest<string, IPatchChangePasswordRequest>("/auth/member/password", {
    password,
  });
  return response;
};

/* 비밀번호 재발급 */
export const reissuePassword = async ({ memberId }: IPatchReissuePasswordRequest) => {
  const response = await patchRequest<IPatchReissuePasswordResponse, unknown>(`/auth/members/${memberId}/password`, {});
  return response;
};
