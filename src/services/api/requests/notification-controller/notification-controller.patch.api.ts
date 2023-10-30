import { patchRequest } from "@/services/api/requests/requests.api";
import {
  IPatchAuthorityRequest,
  IPatchAuthorityResponse,
} from "@/services/api/types/notification-contoller";

export const patchApproveAuthorityRequest = async (requestAuthorityId: number) => {
  const response = await patchRequest<IPatchAuthorityResponse, IPatchAuthorityRequest>(`/notification/request-authorities/${requestAuthorityId}/approve`, {
    requestAuthorityId,
  });
  return response;
};

export const patchRejectAuthorityRequest = async (requestAuthorityId: number) => {
  const response = await patchRequest<IPatchAuthorityResponse, IPatchAuthorityRequest>(`/notification/request-authorities/${requestAuthorityId}/reject`, {
    requestAuthorityId,
  });
  return response;
};
