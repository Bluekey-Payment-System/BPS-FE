import {
  IPatchArtistProfileData,
  IPatchArtistProfileForAdminRequest,
  IPatchArtistProfileForAdminResponse,
  IPatchArtistProfileResponse,
} from "../../types/artist";
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

export const patchArtistProfile = async (
  patchData: IPatchArtistProfileData,
) => {
  const formData = new FormData();
  const dataList: { [key : string]: string } = {};

  Object.entries(patchData).forEach((item) => {
    const [key, value] = item;
    if (key === "file") {
      formData.append("file", value ?? "");
    }
    dataList[key] = value as string;
  });
  formData.append("data", JSON.stringify(dataList));

  const response = await patchRequest<IPatchArtistProfileResponse, FormData>("/artist/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
