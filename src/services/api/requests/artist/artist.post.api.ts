import { IPostArtistResponse } from "../../types/artist";
import { postRequest } from "../requests.api";

export const postArtist = async (
  file: File | null,
  email: string,
  loginId: string,
  name: string,
  enName: string,
  password: string,
  commissionRate: number | null,
) => {
  const formData = new FormData();

  formData.append("file", file ?? "");
  formData.append("data", JSON.stringify({
    email,
    loginId,
    name,
    enName,
    password,
    commissionRate, // null이 들어갈 때 정상 작동 확인 요망
  }));

  const response = await postRequest<IPostArtistResponse, FormData>("/artists", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
