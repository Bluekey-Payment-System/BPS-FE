import { getRequest } from "@/services/api/requests/requests.api";
import { IGetHasPendingRequestAuthority, IGetRequestAuthorities } from "@/services/api/types/notification-contoller";

/* 권한 요청 목록 조회 */
export const getRequestAuthorities = async () => {
  const response = await getRequest<IGetRequestAuthorities>("/notification/request-authorities");
  return response;
};

export const getHasPendingRequestAuthority = async () => {
  const response = await getRequest<IGetHasPendingRequestAuthority>("notification/status/pending");
  return response;
};
