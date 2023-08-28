import { IPostAlbumResponse } from "../../types/albums";
import { postRequest } from "../requests.api";

export const postAlbum = async (
  name: string,
  enName: string,
  memberId: number | null,
  file: File | null,
) => {
  const formData = new FormData();

  formData.append("file", file ?? "");
  formData.append("data", JSON.stringify({
    name,
    enName,
    memberId, // null이 들어갈 때 정상 작동 확인 요망
  }));

  const response = await postRequest<IPostAlbumResponse, FormData>("/albums", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
