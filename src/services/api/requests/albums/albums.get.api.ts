import { IGetAlbumsResponse } from "../../types/albums";
import { getRequest } from "../requests.api";

const getAlbums = async (page: number, size: number, keyword: string | null) => {
  const response = getRequest<IGetAlbumsResponse>(`/albums?page=${page}&size=${size}&keyword=${keyword}`);
  return response;
};

export { getAlbums };
