import { getRequest } from "@/services/api/requests/requests.api";
import { IGetRequestAuthorities } from "@/services/api/types/notification-contoller";
import { IHasPendingRequestAuthority } from "@/types/dto";

/* 권한 요청 리스트 */
export const requestAuthoritiesList = async () => {
  const response = await getRequest<IGetRequestAuthorities>("/notification/request-authorities");
  return response;
};

/* 권한 요청 알림 유무 확인 */
export const checkPendingStatus = async () => {
  const response = await getRequest<IHasPendingRequestAuthority>("/notification/status/pending");
  return response;
};
