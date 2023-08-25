import { deleteRequest } from "../requests.api";

export const withdrawMember = async (memberId: number) => {
  const response = await deleteRequest<string>(`/auth/members/${memberId}/withdrawal`);
  return response;
};
