import { patchRequest } from "@/services/api/requests/requests.api";

import { IPatchApproveRequestAuthority } from "../../types/notification-contoller";

export const patchApproveRequestAuthority = async (requestAuthorityId: number) => {
  const response = patchRequest<IPatchApproveRequestAuthority>(`notification/request-authorities/${requestAuthorityId}/approve`);
  return response;
};

export const patchRejectRequestAuthority = async (requestAuthorityId: number) => {
  const response = patchRequest<IPatchApproveRequestAuthority>(`notification/request-authorities/${requestAuthorityId}/reject`);
  return response;
};
