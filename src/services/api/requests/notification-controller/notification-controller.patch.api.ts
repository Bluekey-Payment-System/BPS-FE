import { patchRequest } from "@/services/api/requests/requests.api";
import { IPatchAuthorizationRequest, IPatchAuthorizationResponse } from "@/services/api/types/notification-contoller";

export const authorityRequestApprove = async (requestAuthorityId: number) => {
  const response = await patchRequest<IPatchAuthorizationResponse, IPatchAuthorizationRequest>(`/notification/request-authorities/${requestAuthorityId}/approve`, {
    requestAuthorityId,
  });
  return response;
};

export const authorityRequestReject = async (requestAuthorityId: number) => {
  const response = await patchRequest<IPatchAuthorizationResponse, IPatchAuthorizationRequest>(`/notification/request-authorities/${requestAuthorityId}/reject`, {
    requestAuthorityId,
  });
  return response;
};
