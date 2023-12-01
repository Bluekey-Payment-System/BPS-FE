import { IPatchAlbumData, IPatchAlbumResponse } from "../../types/albums";
import { patchRequest } from "../requests.api";

/* 앨범 정보 수정 */
export const patchAlbum = async (
  albumId: number,
  patchData: IPatchAlbumData,
) => {
  const formData = new FormData();
  const dataList: { [key: string]: string | number | null } = {};

  Object.entries(patchData).forEach((item) => {
    const [key, value] = item;
    if (key === "albumImage") {
      formData.append("file", (value ?? "") as File | string);
      return;
    }
    dataList[key] = value as string | number | null;
  });
  formData.append("data", JSON.stringify(dataList));

  const response = await patchRequest<IPatchAlbumResponse, FormData>(`/albums/${albumId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
