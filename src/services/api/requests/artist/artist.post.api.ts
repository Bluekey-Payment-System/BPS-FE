import { IPostArtistData, IPostArtistResponse } from "../../types/artist";
import { postRequest } from "../requests.api";

export const postArtist = async (
  postData: IPostArtistData,
) => {
  const formData = new FormData();
  const dataList: { [key : string]: string | number | null } = {};

  Object.entries(postData).forEach((item) => {
    const [key, value] = item;
    if (key === "file") {
      formData.append("file", (value ?? "") as File | string);
    }
    dataList[key] = value as string | number | null;
  });
  formData.append("data", JSON.stringify(dataList)); // commissionRate null 들어갈 때 정상 작동하는지 확인 요망

  const response = await postRequest<IPostArtistResponse, FormData>("/artists", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
