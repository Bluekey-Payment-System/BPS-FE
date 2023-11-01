import { postRequest } from "@/services/api/requests/requests.api";

export const postRequestAuthority = async () => {
  const response = await postRequest("notification/request-authorities");
  return response;
};
