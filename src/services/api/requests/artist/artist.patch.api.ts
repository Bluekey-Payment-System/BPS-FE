import {
  IPatchArtistProfileData,
  IPatchArtistProfileForAdminRequest,
  IPatchArtistProfileForAdminResponse,
  IPatchArtistProfileResponse,
} from "../../types/artist";
import { patchRequest } from "../requests.api";

/* 어드민이 아티스트 프로필을 수정 */
export const patchArtistProfileForAdmin = async (
  memberId: number,
  patchData: IPatchArtistProfileForAdminRequest,
) => {
  const response = await patchRequest<IPatchArtistProfileForAdminResponse, IPatchArtistProfileForAdminRequest>(`artists/${memberId}/profile`, patchData, {
  });

  return response;
};

/* 아티스트의 본인 프로필 수정 */
export const patchArtistProfile = async (
  patchData: IPatchArtistProfileData,
) => {
  const formData = new FormData();
  const dataList: { [key: string]: string } = {};

  Object.entries(patchData).forEach((item) => {
    const [key, value] = item;
    if (key === "file") {
      formData.append("file", value ?? "");
      return;
    }
    dataList[key] = value as string;
  });
  formData.append("data", JSON.stringify(dataList));

  const response = await patchRequest<IPatchArtistProfileResponse, FormData>("/artists/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
