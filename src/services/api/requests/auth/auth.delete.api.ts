import { deleteRequest } from "../requests.api";

/* 계정 탈퇴 */
export const withdrawMember = async (memberId: number) => {
  const response = await deleteRequest<string>(`/auth/members/${memberId}/withdrawal`);
  return response;
};
