import { getRequest } from "@/services/api/requests/requests.api";
import { IGetRequestAuthorities, IGetPendingRequestAuthority } from "@/services/api/types/notification-contoller";

/* 권한 요청 리스트 */
export const getRequestAuthoritiesList = async () => {
  const response = await getRequest<IGetRequestAuthorities>("/notification/request-authorities");
  return response;
};

/* 권한 요청 알림 유무 확인 */
export const getCheckPendingStatus = async () => {
  const response = await getRequest<IGetPendingRequestAuthority>("/notification/status/pending");
  return response;
};
