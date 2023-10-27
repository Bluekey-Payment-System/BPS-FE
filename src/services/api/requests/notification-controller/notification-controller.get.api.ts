import { getRequest } from "@/services/api/requests/requests.api";
import { IGetRequestAuthorities, IGetPendingRequestAuthority } from "@/services/api/types/notification-contoller";

/* 권한 요청 리스트 */
export const requestAuthoritiesList = async () => {
  const response = await getRequest<IGetRequestAuthorities>("/notification/request-authorities");
  return response;
};

/* 권한 요청 알림 유무 확인 */
export const checkPendingStatus = async () => {
  const response = await getRequest<IGetPendingRequestAuthority>("/notification/status/pending");
  return response;
};
