import { IPatchAlbumData, IPatchAlbumResponse } from "../../types/albums";
import { patchRequest } from "../requests.api";

export const patchAlbum = async (
  albumId: number,
  patchData: IPatchAlbumData,
) => {
  const formData = new FormData();
  const dataList: { [key : string]: string | number | null } = {};

  Object.entries(patchData).forEach((item) => {
    const [key, value] = item;
    if (key === "file") {
      formData.append("file", key);
    }
    dataList[key] = value;
  });
  formData.append("data", JSON.stringify(dataList));

  const response = await patchRequest<IPatchAlbumResponse, FormData>(`/albums/${albumId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
