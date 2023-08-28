import { IPatchArtistProfileForAdminRequest, IPatchArtistProfileForAdminResponse } from "../../types/artist";
import { patchRequest } from "../requests.api";

/* admin이 아티스트 프로필을 수정하는 api */
export const patchArtistProfileForAdmin = async (
  memberId: number,
  patchData: IPatchArtistProfileForAdminRequest,
) => {
  const response = await patchRequest<IPatchArtistProfileForAdminResponse, IPatchArtistProfileForAdminRequest>(`artists/${memberId}/profile`, patchData, {
  });

  return response;
};
